import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";

export default function RecipePage() {
  const { recipes, setRecipes } = useContext(RecipeContext);
  const [searchText, setSearchText] = useState("");
  const [sortCategory, setSortCategory] = useState("name");
  
  const [newRecipe, setNewRecipe] = useState({
    img: "",
    name: "",
    ingredients: "",
    cuisine: "",
    instructions: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleSearchText = (searchText) => {
    setSearchText(searchText);
  };
  
  const searchedProducts = searchText!=="" ?recipes.filter(({ name, cuisine }) => {
    const lowerCaseSearchText = searchText.toLowerCase();
    return (
      name.toLowerCase().includes(lowerCaseSearchText) ||
      cuisine.toLowerCase().includes(lowerCaseSearchText)
    );
  }):recipes
  

  const searchCategoryProducts = [...searchedProducts].sort((a, b) => {
    if (sortCategory === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortCategory === "cuisine") {
      return a.cuisine.localeCompare(b.cuisine);
    }
  });
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

  const handleDeleteRecipe = (recipeName) => {
    setRecipes((recipes) =>
      recipes.filter((recipe) => recipe.name !== recipeName)
    );
  };
  return (
    <div>
      <h1>All Recipes</h1>
      <input type="text" onChange={(e) => handleSearchText(e.target.value)} />
      <input type= "radio"value="name"checked={sortCategory === "name"}onChange={()=>setSortCategory("name")}/><label>Name</label>
      <input
        type="radio"
        value="cuisine"
        checked={sortCategory === "cuisine"}
        onChange={() => setSortCategory("cuisine")}
      />
      <label>Cuisine</label>
      <button onClick={() => setShowModal(true)}>Add Recipe</button>
      {showModal && (
        <div>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const imgUrl = URL.createObjectURL(file);
              setNewRecipe({ ...newRecipe, img: imgUrl });
            }}
          />
          <div>
          <input
            value={newRecipe.name}
            placeholder="name"
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, name: e.target.value })
            }
          />
</div>
<div>
          <input placeholder="cuisine"
            value={newRecipe.cuisine}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, cuisine: e.target.value })
            }
          />
          </div>
          <div>
          <input
          placeholder="instructions"
            value={newRecipe.instructions}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, instructions: e.target.value })
            }
          />
          </div>
          <button onClick={handleAddRecipe}>Save</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
      <h2>Recipes</h2>
      <ul>
        {searchCategoryProducts.map((recipe) => (
          <li key={recipe.name}>
            <img src={recipe.img} alt="food" height="200px" width="200px" />
            <p>Name:{recipe.name}</p>
            <p>Cuisine:{recipe.cuisine}</p>
            <p>
              Instructions:{" "}
              <Link to={`/details/${recipe.name}`}>See recipe</Link>
            </p>
            <button onClick={() => handleDeleteRecipe(recipe.name)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
