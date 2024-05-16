import { configureStore } from "@reduxjs/toolkit";
import formReducer from './formSlice';
import userReducer from "./userSlice";
import articleReducer from "./articleSlice";
import userArticleReducer from "./userArticle";
import pageReducer from "./pageSlice";
import articleListReducer from "./articleListSlice";
import articleDetailReducer from "./ArticleDetailSlice";
import detailReducer from "./DetailSlice";
import certificationReducer from "./CertificationSlice";


export const store = configureStore({
    reducer:{
        form: formReducer,
        user: userReducer,
        article: articleReducer,
        userArticle:userArticleReducer,
        page:pageReducer,
        articleList:articleListReducer,
        articleDetail:articleDetailReducer,
        detail:detailReducer,
        certification:certificationReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;