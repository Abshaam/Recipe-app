import styled, { css } from 'styled-components';
import formStyle from '../css/recipe.module.css'
import Card from 'react-bootstrap/Card';
import pic2 from '../images/calender.avif'
// import axios from 'axios';
import { removeRecipe, updateRecipe } from '../store/slices/recipeSlice';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
// import { useSelector } from "react-redux/es/hooks/useSelector";





const Header = styled.div`
//    justify-content: space-between;
//    border-radius: 8px;
//    box-shadow: 0, 4px, 8px, grey;
   margin: 0, 30rem;
//    position: relative;
   padding: 6px;
    `;



const BtnContainer = styled.div`
   display: flex;
   gap: 1rem;
//    justify-content: space-between
//    position: absolute;
//    rignt: 12px;
//    buttom: 12px;`;

const Button = styled.button`
      padding: 8px;
      border-radius: 8px;
      border: none;
      outline: none;
      cursor: ponter;
      ${(props) =>
        props.completed &&
        css`
        background-color: green;
        color: #fff;
        `}
        ${(props) =>
        props.incompleted &&
        css`
            background-color: purple;
            color: #fff;
            `}
    
        
      ${(props) =>
        props.delete &&
        css`
        background-color: red;
        color: #fff;
        `}
    
      `;





const ListRecipe = ({ recipe }) => {

    // memoization
    // const allRecipes = useSelector((state) => state.recipe.recipeList);

    // console.log(allRecipes);



    const dispatch = useDispatch();


    const updaterecipe = (id) => {
        dispatch(updateRecipe(id))
    }

    const removerecipe = (id) => {
        dispatch(removeRecipe(id))
    }


    // this is an axios request to communicate to the database
    // const getRecipes = async (e) =>{
    //     try{
    //         e.preventDefault();
    //         const res = await axios.get(
    //             "",

    //         );

    //         // assigning a variable to the feedback from the server
    //         const recipe = res;
    //         console.log(recipe);


    //     } catch(error) { 
    //         console.log(error);
    //     }

    // }

    // this is an axios request to communicate to the database
    //   const deleteRecipes = async (e) =>{
    //     try{
    //         if(e) e.preventDefault();
    //         const res = await axios.get(
    //             "/delete/:id",

    //         );

    // assigning a variable to the feedback from the server
    //         const delRecipe = res;
    //         console.log(delRecipe);


    //     } catch(error) { 
    //         console.log(error);
    //     }

    // }


    return (

        <div className={formStyle.wrap}>
            <Header>
                <Card>
                    <Card.Body>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={pic2} alt="" />
                            <Card.Body>
                                <Card.Title>Recipe</Card.Title>
                                <Card>
                                    <Card>
                                        <Card.Body>
                                            {recipe.text}
                                        </Card.Body>
                                    </Card>
                                </Card>
                                <BtnContainer>
                                    {
                                        recipe.isCompleted ? (
                                            <Button completed
                                                onClick={() => updaterecipe(recipe.id)}>
                                                complete
                                            </Button>
                                        ) : (
                                            <Button incompleted onClick={() => updaterecipe(recipe.id)}>
                                                incomplete
                                            </Button>
                                        )}

                                    <Button delete
                                        onClick={() => removerecipe(recipe.id)} >
                                        Delete
                                    </Button>

                                </BtnContainer>

                            </Card.Body>
                        </Card>
                    </Card.Body>
                </Card>

            </Header>
        </div>


    )
}


export default ListRecipe;