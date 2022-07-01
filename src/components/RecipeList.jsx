import RecipeForm from "./RecipeForm";
import ListRecipe from "./ListRecipe";
import NavScrollExample from "./Navbar";
import styleup from '../css/recipe.module.css';
import formStyle from '../css/recipe.module.css';
import  {useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import { fetchRecipes } from '../store/slices/recipeSlice';
import { useEffect } from "react";


export default function RecipeList () {
  
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(fetchRecipes())
  }, [dispatch])
 
 

    
      // memoization
 const allRecipes = useSelector( (state) => state.recipe.recipeList);

 console.log(allRecipes);


// useEffect(() => {   
// this is an axios request to communicate to the database
// const getRecipes = async (e) =>{
//     try{
//         e.preventDefault(e);
//         const res = await axios.get(
//             'http://localhost:7000/fetch', {recipes} 
//         );

        // assigning a variable to the feedback from the server
//         const { data } = res;
//         console.log(data);

//         setRecipes([data])
        
//     } catch(error) { 
//         console.log(error);
//     }

// }

    //  getRecipes()

    // }, [recipes])

    

    
    return (
       
        <div className = {styleup.back}>
        <NavScrollExample/>
        <div className="list-wrapper">
            
            {/* input form to add a todo */}
            <RecipeForm />

            <div className= {formStyle.wrap}>
            
           
                    {
                      allRecipes.map((recipe, key) => (
                   
                      <ListRecipe  recipe = {recipe} key = { key }  />
               
                    ))
                   
                      }
            
            </div>

        </div>
        </div>
      
    );
}




