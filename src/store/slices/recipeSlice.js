// importing all the required modules
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

export const fetchRecipes = createAsyncThunk ('recipe/fetchRecipes', async () => {
    const response = await axios.get ('http://localhost:7000/fetch')
    console.log('response', response); 
    return response.data
}) 

export const addingRecipe = createAsyncThunk ('recipe/addRecipe', async (text) => {
    const response = await axios.post('http://localhost:7000/add', { text }) 
    console.log('added', response); 
    return response.data
}) 

export const updatingRecipe = createAsyncThunk ('recipe/updateRecipe', async (id) => {
    const response = await axios.put(`http://localhost:7000/update/${id}`, { id }) 
    console.log('updated', response); 
    return response.data
}) 

export const deletingRecipe = createAsyncThunk ('recipe/deleteRecipe', async (id) => {
    const response = await axios.delete(`http://localhost:7000/delete/${id}`, { id }) 
    console.log('deleted', response); 
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
        builder.addCase(addingRecipe.pending, (state, action) => {
            state.loading = true
        })

        .addCase (addingRecipe.fulfilled, (state, action) => {
            state.recipeList.push(action.payload)
            state.loading = false
        })

        .addCase (addingRecipe.rejected, (state, action) => {
            console.log();
            state.loading = false
            state.error = action.error.message
        })

        .addCase (fetchRecipes.pending, (state, action) => {
            state.loading = true
        })

        .addCase (fetchRecipes.fulfilled, (state, action) => {
            state.loading = false
               state.recipeList = action.payload;
        })

        .addCase (fetchRecipes.rejected, (state, action) => {
            state.loading = false
            state.error = state.error.message
        })

        .addCase (updatingRecipe.pending, (state, action) => {
            state.loading = true
        })

        .addCase (updatingRecipe.fulfilled, (state, action,
            // : PayloadAction<{success: Boolean }>, 
            payload) => {
            // const { success } = action.payload;
            // if(success) {
            //     state.
            // }
            state.loading = false
               state.recipeList.map(recipe => {
                return recipe.id === action.payload ? {...recipe, isCompleted: !recipe.isCompleted} : {...recipe} 
            })
            //    .filter(recipe => recipe.id !== action.payload)
            //    state.recipeList.push(action.payload)
            //    state.recipeList.pop(action.payload)
        })

        .addCase (updatingRecipe.rejected, (state, action) => {
            state.loading = false
            state.error = state.error.message
        })

        
        .addCase (deletingRecipe.pending, (state, action) => {
            state.loading = true
        })

        .addCase (deletingRecipe.fulfilled, (state, action) => {
            state.loading = false
               state.recipeList.filter(recipe => recipe.id !== action.payload)
            //    .map(recipe => {
            //     return recipe.id === action.payload ? {...recipe, isCompleted: !recipe.isCompleted} : {...recipe} 
            // })
        })

        .addCase (deletingRecipe.rejected, (state, action) => {
            state.loading = false
            state.error = state.error.message
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
