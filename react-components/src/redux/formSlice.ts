import { createSlice } from "@reduxjs/toolkit";
import Unknown_person from "..//imgIcon/Unknown_person.jpg"

interface FormValues {
    mailAddress: string;
    password: string;
    confirmPassword: string;
    nickName: string;
    userIconImage: string;
};

interface FormErrors {
    mailAddress: string;
    password: string;
    confirmPassword: string;
    nickName: string;
};

const initialState = {
    formErrors: {},
    formData: { 
        mailAddress: "",
        password: "",
        confirmPassword: "",
        nickName: "",
        userIconImage: "",
    },
    userIconImagesrc: Unknown_person, 
    touched:{},
    imageError:""
};

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFormErrors: (state,action) => {
            state.formErrors = action.payload;
        },
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        setUserIconImage:(state,action) => {
            state.userIconImagesrc = action.payload;
        },
        setTouched:(state,action) => {
            state.touched = action.payload;
        },
        setImageError:(state,action) => {
            state.imageError = action.payload;
        }
    },
});


export const {setFormErrors, setFormData, setUserIconImage,setTouched,setImageError} =formSlice.actions;
export const selectFormErrors = (state: { form: { formErrors: FormErrors; }; }) => state.form.formErrors
export const selectFormData = (state: { form: { formData: FormValues; }; }) => state.form.formData;
export const selectIconImage = (state:{form:{ userIconImagesrc:string; }; }) => state.form.userIconImagesrc
export const selectTouched = (state:{form:{ touched:{ [key: string]: boolean } }; }) => state.form.touched
export const selectImageError = (state:{form:{ imageError:string; }; }) => state.form.imageError
export default formSlice.reducer;