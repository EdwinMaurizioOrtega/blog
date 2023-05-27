import React, {useCallback, useEffect, useState} from 'react';
import {Button} from 'primereact/button';
import {useDispatch, useSelector} from "react-redux";
import {deletePost, getPostsByIdCreator} from "../../actions/posts";

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import decode from "jwt-decode";
import * as actionType from "../../constants/actionTypes";
import Form from "./Form";
import {useRouter} from "next/router";

const Anuncio = () => {

    const dispatch = useDispatch();
    const navigate = useRouter();
    const [currentId, setCurrentId] = useState(0);
    const { postsByUser } = useSelector((state) => state.posts);

    const logout = useCallback(() => {
        dispatch({ type: actionType.LOGOUT });
        navigate.push('/');
    }, [dispatch, navigate]);

    useEffect(() => {
        const storedProfile = JSON.parse(localStorage.getItem('profile'));
        const token = storedProfile?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                logout();
            } else {
                dispatch(getPostsByIdCreator(storedProfile.result._id));
            }
        }

    }, [dispatch, logout]);

    const filaPostseleccionado = (rowData) => {
        //console.log(rowData._id);
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                        onClick={() => setCurrentId(rowData._id)}>
                    Editar
                </Button>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2"
                        onClick={() => dispatch(deletePost(rowData._id))}>Borrar</Button>
            </div>
        );
    }

    return (
        <>
            <Form currentId={currentId} setCurrentId={setCurrentId}/>

            <div className="card">
                <DataTable value={postsByUser} responsiveLayout="scroll" dataKey="_id">
                    <Column field="title" header="Título del anuncio"></Column>
                    <Column field="createdAt" header="Fecha de creacion"></Column>
                    <Column field="_id" body={filaPostseleccionado} header="ID"></Column>

                </DataTable>
            </div>


        </>


    )
}
export default Anuncio;