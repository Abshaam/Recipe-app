// importing all required modules
import { configureStore } from '@reduxjs/toolkit'
import  recipeReducer  from "./slices/recipeSlice";

// configuring the store
export const store = configureStore({
    reducer : {
        recipe: recipeReducer
    },
});