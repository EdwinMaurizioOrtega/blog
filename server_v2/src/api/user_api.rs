use crate::{
    models::user_model::User,
    repository::mongodb_repo::MongoRepo,
    responces::user_respo::FilteredUser,
};
use mongodb::bson::DateTime;
use serde::{Deserialize, Serialize};
use jsonwebtoken::{encode, Algorithm, EncodingKey, Header, TokenData, DecodingKey, Validation, decode};
use std::time::{SystemTime, UNIX_EPOCH};

use serde_json::{json, Value};

use chrono::{prelude::*, Duration};


use actix_web::{
    delete, get, post, put,
    web,
    HttpResponse,
    cookie,
};
use mongodb::bson::oid::ObjectId;

use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};
use crate::models::user_model::{LoginUserSchema, TokenClaims};


#[derive(Serialize)]
struct MyObjMessage {
    message: String,
}

//Crear un usuario
pub async fn signup(db: web::Data<MongoRepo>, new_user: web::Json<User>) -> HttpResponse {
    let query_result = db.get_user_by_email(&new_user.email).await;

    match query_result {
        None => {
            let mut data = User {
                id: None,
                username: new_user.username.to_owned(),
                email: new_user.email.to_owned(),
                password: new_user.password.to_owned(),
                created_at: None,
            };

            // Asignar la fecha y hora actual antes de guardar el documento
            data.created_at = Some(DateTime::now());

            let user_id = db.create_user(data).await;

            match user_id {
                Ok(user) => {
                    //println!("Contenido de data: {:?}", user.inserted_id.as_object_id().unwrap());
                    let id_insertado = user.inserted_id.as_object_id().unwrap().to_hex();
                    println!("Contenido de data: {:?}", id_insertado);

                    //Buscamos el usuario insertado
                    let user_detail = db.get_user(&id_insertado).await;


                    match user_detail {
                        Ok(user_d) => {

                            //Generamos el Token
                            let now = Utc::now();
                            let iat = now.timestamp() as usize;
                            let exp = (now + Duration::minutes(60)).timestamp() as usize;

                            let claims = TokenClaims {
                                _id: user_d.id.unwrap().to_string(),
                                username: user_d.username.to_string(),
                                exp,
                                iat,
                            };

                            let token = encode(
                                &Header::default(),
                                &claims,
                                &EncodingKey::from_secret(",2023;MongoDB".as_ref()),
                            )
                                .unwrap();

                            let user_response = json!({"status": "success", "result": claims, "token": token});
                            return HttpResponse::Ok().json(user_response);
                        }

                        Err(e) => {
                            return HttpResponse::InternalServerError()
                                .json(serde_json::json!({"status": "error","message": format!("{:?}", e)}));
                        }
                    }
                }
                Err(e) => {
                    return HttpResponse::InternalServerError()
                        .json(serde_json::json!({"status": "error","message": format!("{:?}", e)}));
                }
            }
        }
        Some(user) => {
            HttpResponse::NotFound().json(json!({"status": "fail", "message": "El usuario ya existe"}))
        }


        //
        // let salt = SaltString::generate(&mut OsRng);
        // let hashed_password = Argon2::default()
        //     .hash_password(new_user.password.as_bytes(), &salt)
        //     .expect("Error while hashing password")
        //     .to_string();
        //
        //
        //
        // let mut data = User {
        //     id: None,
        //     name: new_user.name.to_owned(),
        //     email: new_user.email.to_owned(),
        //     password: new_user.password.to_owned(),
        //     created_at: None,
        // };
        //
        // // Asignar la fecha y hora actual antes de guardar el documento
        // data.created_at = Some(DateTime::now());
        //
        // let user_detail = db.create_user(data).await;
        //
        // // match user_detail {
        // //     Ok(user) => HttpResponse::Ok().json(user),
        // //     Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
        // // }
        //
        // match user_detail {
        //     Ok(user) => {
        //         let user_response = serde_json::json!({"status": "success","data": serde_json::json!({
        //             "user": filter_user_record(&user)
        //         })});
        //
        //         return HttpResponse::Ok().json(user_response);
        //     }
        //     Err(e) => {
        //         return HttpResponse::InternalServerError()
        //             .json(serde_json::json!({"status": "error","message": format!("{:?}", e)}));
        //     }
        // }
    }
}

//Iniciar sesión con un correo
pub async fn signin(db: web::Data<MongoRepo>, new_user: web::Json<LoginUserSchema>) -> HttpResponse {
    println!("Contenido de data: {:?}", new_user);

    if new_user.email.is_empty() {
        return HttpResponse::BadRequest().body("invalid Email");
    }

    let query_result = db.get_user_by_email(&new_user.email).await;

    match query_result {
        Some(user) => {
            println!("Contenido de data: {:?}", user);


            // Compare the passwords directly
            let is_valid = new_user.password == user.password;

            if !is_valid {
                return HttpResponse::BadRequest()
                    .json(json!({"status": "fail", "message": "Correo electrónico o contraseña no válidos"}));
            }

            // Generate JWT token and set it in the cookie
            let now = Utc::now();
            let iat = now.timestamp() as usize;
            let exp = (now + Duration::minutes(60)).timestamp() as usize;

            let claims = TokenClaims {
                _id: user.id.unwrap().to_string(),
                username: user.username.to_string(),
                exp,
                iat,
            };

            let secret = ",2023;MongoDB";


            let token = encode(
                &Header::default(),
                &claims,
                &EncodingKey::from_secret(secret.as_ref()),
            )
                .unwrap();

            // Muy importante
            //
            // // Imprimir el token generado
            // println!("Generated Token: {}", token);
            //
            // // Decodificar el token JWT
            // let decoding_key = DecodingKey::from_secret(secret.as_ref());
            //
            // // Imprime el contenido del token antes de intentar decodificarlo
            // println!("Token Content: {}", token);
            //
            // let validation = Validation::default();
            //
            // // Decodifica el token
            // let decoded_token_result = decode::<TokenClaims>(&token, &decoding_key, &validation);
            //
            // match decoded_token_result {
            //     Ok(token_data) => {
            //         // Accede a las reclamaciones directamente y las imprime
            //         println!("Decoded Token: {:?}", token_data);
            //         println!("Decoded Token Claims: {:?}", token_data.claims);
            //
            //         // Accede a las reclamaciones directamente y las imprime
            //         match token_data.claims {
            //             TokenClaims {
            //                 _id,
            //                 username,
            //                 iat,
            //                 exp,
            //             } => {
            //                 println!("_id: {}", _id);
            //                 println!("Username: {}", username);
            //                 println!("iat: {}", iat);
            //                 println!("exp: {}", exp);
            //             }
            //         }
            //     }
            //     Err(err) => {
            //         // Imprime el error directamente
            //         println!("Token decoding error: {:?}", err);
            //     }
            // }

            HttpResponse::Ok()
                .json(json!({"status": "success", "result": claims, "token": token}))
        }
        None => {
            HttpResponse::NotFound().json(json!({"status": "fail", "message": "El usuario no existe"}))
        }
    }
}

#[get("/user/{id}")]
pub async fn get_user(db: web::Data<MongoRepo>, path: web::Path<String>) -> HttpResponse {
    let id = path.into_inner();
    if id.is_empty() {
        return HttpResponse::BadRequest().body("invalid ID");
    }
    let user_detail = db.get_user(&id).await;

    match user_detail {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

// #[put("/user/{id}")]
// pub async fn update_user(
//     db: Data<MongoRepo>,
//     path: Path<String>,
//     new_user: Json<User>,
// ) -> HttpResponse {
//     let id = path.into_inner();
//     if id.is_empty() {
//         return HttpResponse::BadRequest().body("invalid ID");
//     };
//     let data = User {
//         id: Some(ObjectId::parse_str(&id).unwrap()),
//         name: new_user.name.to_owned(),
//         email: new_user.email.to_owned(),
//         password: new_user.password.to_owned(),
//         created_at: Some(DateTime::now()),
//     };
//
//     let update_result = db.update_user(&id, data).await;
//
//     match update_result {
//         Ok(update) => {
//             if update.matched_count == 1 {
//                 let updated_user_info = db.get_user(&id).await;
//
//                 return match updated_user_info {
//                     Ok(user) => HttpResponse::Ok().json(user),
//                     Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
//                 };
//             } else {
//                 return HttpResponse::NotFound().body("No user found with specified ID");
//             }
//         }
//         Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
//     }
// }

#[delete("/user/{id}")]
pub async fn delete_user(db: web::Data<MongoRepo>, path: web::Path<String>) -> HttpResponse {
    let id = path.into_inner();
    if id.is_empty() {
        return HttpResponse::BadRequest().body("invalid ID");
    };
    let result = db.delete_user(&id).await;

    match result {
        Ok(res) => {
            if res.deleted_count == 1 {
                return HttpResponse::Ok().json("User successfully deleted!");
            } else {
                return HttpResponse::NotFound().json("User with specified ID not found!");
            }
        }
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[get("/users")]
pub async fn get_all_users(db: web::Data<MongoRepo>) -> HttpResponse {
    let users = db.get_all_users().await;
    println!("hola hola");
    match users {
        Ok(users) => HttpResponse::Ok().json(users),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}


pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/user")
            // Crear Usuario
            .service(web::resource("/signup").route(web::post().to(signup)))
            // Iniciar sesión
            .service(web::resource("/signin").route(web::post().to(signin)))
    );
}

