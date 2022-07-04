import formStyle from '../css/recipe.module.css'
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
// import axios from 'axios';
import { useDispatch } from 'react-redux/es/exports';
// import { addRecipe } from '../store/slices/recipeSlice';
import { addingRecipe } from '../store/slices/recipeSlice';
// import { fetchRecipes } from '../store/slices/recipeSlice';


export default function RecipeForm() {
    const [text, setText] = useState('');

    const dispatch = useDispatch()


    // this is an axios request to communicate to the database
    // const addRecipes = async (e) =>{
    //     try{
    //         e.preventDefault();
    //         const res = await axios.post(
    //         'http://localhost:7000/add',{
    //             text
    //         },

    //         );

    // assigning a variable to the feedback from the server
    // const {data} = res;
    // console.log(data);
    // setText(' ');


    //     } catch(error) { 
    //         console.log(error);
    //     }

    // }

    // const addrecipe = (e) => {

    //     e.preventDefault();
    //     dispatch(addRecipe(text))
    //     setText(' ')
    // };

    const addrecipe = (e) => {
        e.preventDefault();
        dispatch(addingRecipe(text))
        setText(' ')
    }


    // dispatch(fetchRecipes())


    return (

        <>

            <Container
                className='mt-5'
                fluid='lg'

            >
                <Row>
                    <Col>
                        <form onSubmit={addrecipe}>
                            <input className={formStyle.recipe_input}
                                type="text"
                                placeholder=" Type a recipe"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />



                            {/* button */}
                            <button
                                className={formStyle.recipe_button}

                                type='submit'

                            > Add Recipe
                            </button>

                        </form>

                    </Col>
                </Row>
            </Container>


        </>
    )
}



