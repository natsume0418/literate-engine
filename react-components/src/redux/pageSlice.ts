import { createSlice } from "@reduxjs/toolkit";

interface PageState {
    currentPage: number;
    totalPages: number;
    totalPosts: number; 
}

const initialPageState: PageState ={
    currentPage: 1,
    totalPages: 1, 
    totalPosts: 0,
};

export const pageSlice = createSlice({
    name: 'page',
    initialState: initialPageState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setTotalPages(state, action) {
            state.totalPages = action.payload;
        },
        setTotalPosts(state, action) { // 記事の総数を設定するアクションを追加
            state.totalPosts = action.payload;
        },
        addPost: (state, action) => {
            state.totalPosts += 1;
            localStorage.setItem('totalPosts', String(state.totalPosts));
        },
        initializeTotalPosts(state) {
            const totalPosts = localStorage.getItem('totalPosts');
            state.totalPosts = totalPosts ? Number(totalPosts) : 0;
        },
    },
});

export const { setCurrentPage, setTotalPages, setTotalPosts, addPost,initializeTotalPosts } = pageSlice.actions;
export const selectCurrentPage = (state: { page: { currentPage: number; }; }) => state.page.currentPage;
export const selectTotalPages = (state: { page: { totalPages: number; }; }) => state.page.totalPages;
export const selectTotalPosts = (state: { page: { totalPosts: number; }; }) => state.page.totalPosts; 
export default pageSlice.reducer;
