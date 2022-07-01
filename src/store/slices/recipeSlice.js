// importing all the required modules
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipes = createAsyncThunk ('recipe/fetchRecipes', async () => {
    const response = await axios ('http://localhost:7000/fetch')
    console.log('response', response); 
    return response.data
}) 

export const addingRecipe = createAsyncThunk ('recipe/addRecipe', async () => {
    const response = await axios ('http://localhost:7000/add') 
    return response.data
}) 


export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: {
        recipeList : [],
        loading: false,
        error : '',
        // users : []
    },

    reducers: {
        addRecipe: (state, action ) => {

            const newRecipe = {
                id: nanoid(),
                text: action.payload,
                isCompleted: false  
            }
    
            // add the newRecipe to the recipes with the empty array
            state.recipeList.push(newRecipe)
        },

        removeRecipe: (state, action) =>{
            state.recipeList = state.recipeList.filter(recipe => recipe.id !== action.payload)
        },

        updateRecipe: (state, action) => {
            state.recipeList = state.recipeList.map(recipe => {
                return recipe.id === action.payload ? {...recipe, isCompleted: !recipe.isCompleted} : {...recipe} 
            })
        }
    },

    extraReducers: builder => {
        builder.addCase(fetchRecipes.pending, (state, action) => {
            state.loading = true
        })

        .addCase (fetchRecipes.fulfilled, (state, action) => {
            state.recipeList = action.payload;
            state.loading = false
        })

        .addCase (fetchRecipes.rejected, (state, action) => {
            console.log();
            state.loading = false
            state.error = action.error.message
        })

      
        
    }
});

export const { addRecipe, removeRecipe, updateRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;


// [
//      fetchRecipes.pending, (state, action) => {
//      state.loading = true
//      },

//      fetchRecipes.fulfilled, (state, action) => {
//        state.recipeList = action.payload;
//        state.loading = false
//      },

//      fetchRecipes.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.error.message
//      }
// ]
