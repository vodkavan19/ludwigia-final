import { createSlice } from '@reduxjs/toolkit';

const tempImageSlice = createSlice({
    name: 'tempImageId',
    initialState: {
        editorImages: []
    },
    reducers: {
        setTempEditorImageIds(state, action) {
            state.editorImages.push(action.payload)
        },
        removeAllTempEditorImages(state) {
            state.editorImages = []
        },
    }
})

export const { 
    setTempEditorImageIds,
    removeAllTempEditorImages
} = tempImageSlice.actions

export default tempImageSlice.reducer;