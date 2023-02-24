import {AUTH} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {

    try {
        const {data} = await api.signIn(formData);
        console.log("los datos estan llegando: " + data)
        dispatch({type: AUTH, data});
        router('/');
    } catch (data) {
        console.log(data);
        //Muy importante para consumir desde el Frontend -_-
        dispatch({type: AUTH, data});
    }
};

export const signup = (formData, router) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData);

        dispatch({type: AUTH, data});

        router('/');
    } catch (error) {
        console.log(error);
    }
};
