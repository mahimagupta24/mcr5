import { useContext } from "react";
import { useParams } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";

export default function RecipeDetails() {
  const { recipeName } = useParams();
  const { recipes } = useContext(RecipeContext);
  const recipe = recipes.find(({ name }) => name === recipeName);
  console.log(recipe);
  return (
    <div>
      <h1> Recipe Details</h1>
      <img src={recipe.img} alt="food" height="200px" width="200px" />
      <p>Name:{recipe.name}</p>
      <p>Cuisine:{recipe.cuisine}</p>
      <p>Instructions:{recipe.instructions}</p>
    </div>
  );
}
