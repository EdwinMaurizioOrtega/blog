import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createPost, updatePost} from '../../actions/posts';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {useRouter} from "next/router";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Controller, useForm} from "react-hook-form";
import {classNames} from 'primereact/utils';
import {InputNumber} from "primereact/inputnumber";
import {FileUpload} from "primereact/fileupload";

const FormPublication = ({currentId, setCurrentId}) => {
        const toast = useRef(null);
        const [postData, setPostData] = useState({
            category: '',
            city: '',
            title: '',
            message: '',
            cellphone: '',
            tags: [],
            selectedFile: []
        });

        const [uploadedImages, setUploadedImages] = useState([]); // Estado para almacenar las imágenes cargadas

        const defaultValues = {
            category: '',
            city: '',
            title: '',
            message: '',
            cellphone: null

        };

        const {
            control,
            formState: {errors},
            handleSubmit,
            setValue,
            getValues,
            reset
        } = useForm({defaultValues});

        console.log("Post: " + currentId);
        const post = useSelector((state) => (currentId ? state.posts.postsByUser.find((message) => message._id === currentId) : null));
        const dispatch = useDispatch();
        const [user, setUser] = useState(null);

        const history = useRouter();

        const [selectedCountry, setSelectedCountry] = useState(null);

        const [isLoading, setIsLoading] = useState(false);


        useEffect(() => {
            const data = JSON.parse(localStorage.getItem('profile'));
            setUser(data);
        }, []);


        const clear = () => {
            setCurrentId(0);
            //setPostData({category: '', city: '', title: '', message: '', cellphone: '', tags: [], selectedFile: []});
        };

        function refreshPage() {
            history.reload();
        }

        useEffect(() => {
            if (!post?.title) clear();
            if (post) {

                console.log("post: " + JSON.stringify(post))
                setValue('title', post.title); // Establece el valor del campo 'value'
                setValue('message', post.message); // Establece el valor del campo 'value'
                setValue('cellphone', post.cellphone); // Establece el valor del campo 'value'
                setValue('category', categories.find((category) => category.code === post.category)); // Establece el valor del campo 'value'
                setValue('city', cities.find((city) => city.code === post.city)); // Establece el valor del campo 'value'

                // setPostData(post)
            }
            ;
        }, [post, setValue]);

        const onSubmit = async (data) => {
            console.log(data.category.code);
            console.log(data.city.code);
            console.log(data.title);
            console.log(data.message);
            console.log(data.cellphone);

            setIsLoading(true);

            try {
                if (currentId === 0) {
                    // Nuevo

                    console.log("uploadedImages: "+ uploadedImages);
                    // Verificar si se han seleccionado imágenes
                    if (!uploadedImages || uploadedImages.length === 0) {
                        console.error('No se han seleccionado imágenes.');
                        return;
                    }

                    // Crear un array para almacenar las imágenes comprimidas
                    const compressedImages = [];

                    // Iterar sobre las imágenes seleccionadas y comprimirlas
                    const compressPromises = uploadedImages.map(async (image) => {
                        const compressedBlob = await compressToJpeg(image.data, 500);
                        compressedImages.push(compressedBlob);
                    });

                    // Esperar a que se completen todas las tareas de compresión
                    await Promise.all(compressPromises);

                    // Ahora 'compressedImages' contiene las imágenes comprimidas como Blobs
                    console.log('Imágenes comprimidas:', compressedImages);

                    // Resto del código de manejo del formulario, como el envío de datos al servidor

                    const formData = new FormData();
                    formData.append('title', data.title);
                    formData.append('category', data.category.code);
                    formData.append('message', data.message);
                    formData.append('cellphone', data.cellphone);
                    formData.append('city', data.city.code);

                    for (let i = 0; i < compressedImages.length; i++) {
                        formData.append('selectedFile', compressedImages[i], `image_${i}.jpg`);
                    }

                    await dispatch(createPost(formData, history));

                    clear();

                } else {

                    post['category'] = data.category.code;
                    post['city'] = data.city.code;
                    post['title'] = data.title;
                    post['message'] = data.message;
                    post['cellphone'] = data.cellphone;

                    if (postData.selectedFile.length === 0) {
                        // La lista selectedFile está vacía
                        console.log("selectedFile está vacío");
                    } else {
                        // La lista selectedFile no está vacía
                        console.log("selectedFile no está vacío");

                        post['selectedFile'] = postData.selectedFile
                    }

                    console.log("updatedPostData: " + JSON.stringify(post));

                    // Actualizar
                    await dispatch(updatePost(currentId, {...post, name: user?.result?.username}));

                    if (toast.current) {
                        toast.current.show({
                            severity: 'success',
                            summary: 'Felicidades',
                            detail: 'El anuncio se ha actualizado.',
                            life: 3000
                        });
                    }

                    clear();
                    refreshPage();
                }
            } catch (error) {
                if (currentId === 0) {
                    console.log('Error al crear el post:', error.response.data);
                } else {
                    console.log('Error al actualizar el post:', error.response.data);
                }
            } finally {
                setIsLoading(false);
                reset();
            }
        };


        // Función para comprimir una imagen a JPEG
        const compressToJpeg = (base64, maxWidth) => {
            return new Promise((resolve) => {
                const img = new Image();

                img.onload = () => {
                    const aspectRatio = img.width / img.height;
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    canvas.width = maxWidth;
                    canvas.height = maxWidth / aspectRatio;

                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    const quality = 0.7;
                    canvas.toBlob((blob) => {
                        resolve(blob);
                    }, 'image/jpeg', quality);
                };

                img.src = base64;
            });
        };


        const handleAddImage = async (event) => {

            // Manejar la carga de imágenes aquí
            const newImages = event.files.map((file) => {
                return {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: URL.createObjectURL(file), // URL temporal para la imagen
                };
            });

            // Agregar las nuevas imágenes al estado
            setUploadedImages([...uploadedImages, ...newImages]);

            //console.log("uploadedImages: "+uploadedImages)

        };

        const getFormErrorMessage = (name) => {
            return errors[name] ? <small className="p-error">{errors[name].message}</small> :
                <small className="p-error">&nbsp;</small>;
        };

        //En el caso de que se pierda la sesión
        if (!user?.result?.username) {
            return <h3>Inicie sesión para crear sus propios recuerdos y darle me gusta a los recuerdos de otros.</h3>;
        }
        return (
            <div className="card">
                <span className="block text-900 font-bold text-xl mb-4">¡Publica gratis siguiendo unos pocos pasos!</span>
                <div className="grid">
                    <div className="col-12 lg:col-12">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-column p-fluid">
                                <div className="mb-4">
                                    <h6>{currentId ? `Editando "${post?.title}"` : 'Crear anuncio'}</h6>
                                </div>
                                <div className="mb-4">
                                    <Controller
                                        name="category"
                                        control={control}
                                        rules={{required: 'La categoria es obligatoria.'}}
                                        render={({field, fieldState}) => (
                                            <Dropdown
                                                id={field.name}
                                                value={field.value}
                                                optionLabel="name"
                                                placeholder="Seleccionar categoría"
                                                options={categories}
                                                focusInputRef={field.ref}
                                                onChange={(e) => field.onChange(e.value)}
                                                className={classNames({'p-invalid': fieldState.error})}
                                            />
                                        )}
                                    />
                                    {getFormErrorMessage('category')}
                                </div>
                                <div className="mb-4">
                                    <Controller
                                        name="city"
                                        control={control}
                                        rules={{required: 'La ciudad es obligatoria.'}}
                                        render={({field, fieldState}) => (
                                            <Dropdown
                                                id={field.name}
                                                value={field.value}
                                                optionLabel="name"
                                                placeholder="Seleccionar ciudad"
                                                options={cities}
                                                focusInputRef={field.ref}
                                                onChange={(e) => field.onChange(e.value)}
                                                className={classNames({'p-invalid': fieldState.error})}
                                            />
                                        )}
                                    />
                                    {getFormErrorMessage('city')}
                                </div>

                                <div className="mb-4">
                                    <Controller
                                        name="title"
                                        control={control}
                                        rules={{required: 'El título es obligatorio.'}}
                                        render={({field, fieldState}) => (
                                            <>
                                                <label htmlFor={field.name}
                                                       className={classNames({'p-error': errors.value})}></label>
                                                <span className="p-float-label">
                                <InputText id={field.name} value={field.value}
                                           className={classNames({'p-invalid': fieldState.error})}
                                           onChange={(e) => field.onChange(e.target.value)}/>
                                <label htmlFor={field.name}>Título</label>
                            </span>
                                                {getFormErrorMessage(field.name)}
                                            </>
                                        )}
                                    />
                                </div>

                                <div className="mb-4">
                                    <Controller
                                        name="message"
                                        control={control}
                                        rules={{required: 'El contenido es obligatorio.'}}
                                        render={({field, fieldState}) => (
                                            <>
                                                <label htmlFor={field.name}>Contenido</label>
                                                <InputTextarea id={field.name} {...field} rows={6} cols={30}
                                                               className={classNames({'p-invalid': fieldState.error})}/>
                                                {getFormErrorMessage(field.name)}
                                            </>
                                        )}
                                    />


                                </div>
                                <div className="mb-4">
                                    <Controller
                                        name="cellphone"
                                        control={control}
                                        rules={{
                                            required: 'Introduzca un número de celular válido.',
                                        }}
                                        render={({field, fieldState}) => (
                                            <>
                                                <label htmlFor={field.name}>WhastApp.</label>
                                                <InputNumber id={field.name} inputRef={field.ref} value={field.value}
                                                             onBlur={field.onBlur} onValueChange={(e) => field.onChange(e)}
                                                             useGrouping={false}
                                                             inputClassName={classNames({'p-invalid': fieldState.error})}/>
                                                {getFormErrorMessage(field.name)}
                                            </>
                                        )}
                                    />
                                </div>

                                <div className="mb-4">
                                    <h6>Debes subir al menos una imagen: </h6>
                                    {/*<FileBase*/}
                                    {/*    type="file"*/}
                                    {/*    multiple={true}*/}
                                    {/*    onDone={(base64) => handleAddImage(base64)}*/}
                                    {/*/>*/}

                                    <FileUpload chooseLabel="Elegir"
                                                cancelLabel="Cancelar"
                                                uploadLabel="Subir"
                                                name="filesAux"
                                                multiple
                                                accept="image/*"
                                                url="/api/fake-upload"
                                                maxFileSize={2000000}
                                                emptyTemplate={<p className="m-0">Arrastre y suelte los archivos aquí
                                                    para cargarlos.</p>}
                                                onUpload={handleAddImage} // Set the onUpload attribute to the handleAddImage function


                                    />

                                </div>
                            </div>
                            <div className="flex justify-content-between gap-3">
                                {/*<Button className="p-button-danger flex-1 p-button-outlined" label="Descartar"*/}
                                {/*        icon="pi pi-fw pi-trash" onClick={clear}></Button>*/}

                                {isLoading ?
                                    <img src={`../../../layout/images/5db61a9d71fa2c97ffff30c83dcaa6e5.gif`} style={{
                                        height: '100%',
                                        display: "block",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        width: "10%"
                                    }} alt="Cargando..."/> :

                                    <Button type="submit" className="p-button-primary flex-1" label="Publicar"
                                            icon="pi pi-fw pi-check" disabled={isLoading}>
                                    </Button>

                                }

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
;

export default FormPublication;

const categories = [
    {name: 'Escorts', code: 'escorts'},
    {name: 'Trans Y Travestis', code: 'travestis'},
    {name: 'Escorts Masculinos', code: 'escorts-masculinos'},
    {name: 'Encuentros Casuales', code: 'encuentros'}
];

const cities = [
    {name: 'Quito', code: 'quito'},
    {name: 'Guayaquil', code: 'guayaquil'},
    {name: 'Cuenca', code: 'cuenca'},
    {name: 'Ambato', code: 'ambato'},
    {name: 'Durán', code: 'duran'},
    {name: 'Esmeraldas', code: 'esmeraldas'},
    {name: 'Ibarra', code: 'ibarra'},
    {name: 'Latacunga', code: 'latacunga'},
    {name: 'Loja', code: 'loja'},
    {name: 'Machala', code: 'machala'},
    {name: 'Manta', code: 'manta'},
    {name: 'Portoviejo', code: 'portoviejo'},
    {name: 'Quevedo', code: 'quevedo'},
    {name: 'Riobamba', code: 'riobamba'},
    {name: 'Salinas', code: 'salinas'},
    {name: 'Sangolqui', code: 'sangolqui'},
    {name: 'Santo Domingo', code: 'santo-domingo'},
];
