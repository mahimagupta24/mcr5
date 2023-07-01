import {useEffect,useState, createContext } from "react";

export const RecipeContext = createContext();
export default function RecipeProvider({ children }) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const savedRecipes = localStorage.getItem("recipes");
        if (savedRecipes) {
          setRecipes(JSON.parse(savedRecipes));
        }
      }, []);
    
      useEffect(() => {
        localStorage.setItem("recipes", JSON.stringify(recipes));
      }, [recipes]);
     
    
  return <RecipeContext.Provider value={{recipes,setRecipes}}>{children}</RecipeContext.Provider>;
}
