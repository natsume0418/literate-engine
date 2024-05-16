import { createSlice } from "@reduxjs/toolkit";

interface FormValues {
    content: string;
    title: string;
};

const initialState = {
    formData: { 
        title:"",
        content:"",
    },
};

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.formData = action.payload;

        },
    },
});

export const {setFormData} =articleSlice.actions;
export const selectFormData = (state: { article: { formData: FormValues; }; }) => state.article.formData;
export default articleSlice.reducer;