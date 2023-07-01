import { useEffect, useState } from "react";

export default function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    img: "",
    name: "",
    ingredients: "",
    cuisine: "",
    instructions: "",
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedRecipes = localStorage.getItem("recipes");
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);
 

  const handleAddRecipe = () => {
    setRecipes((prevRecipes) => [...prevRecipes, { ...newRecipe }]);
    setNewRecipe({
      img: "",
      name: "",
      ingredients: "",
      cuisine: "",
      instructions: "",
    });
  };

  return (
    <div>
      <h1>All Recipes</h1>
      <button onClick={() => setShowModal(true)}>Add Recipe</button>
      {showModal && (
        <div>
          <input
            onChange={(e) => setNewRecipe({ ...newRecipe, img: e.target.src })}
          />
          <input
            value={newRecipe.name}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, name: e.target.value })
            }
          />
          <input
            value={newRecipe.cuisine}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, cuisine: e.target.value })
            }
          />
          <input
            value={newRecipe.instructions}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, instructions: e.target.value })
            }
          />
          <button onClick={handleAddRecipe}>Save</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li>
            <p>{recipe.name}</p>
            <p>{recipe.cuisine}</p>
            <p>{recipe.instructions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
