import logo from './logo.svg';
import './App.css';
import {Routes ,Route,Link} from "react-router-dom"
import RecipePage from './pages/RecipePage';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <div className="App">
       <Routes>
      <Route path ="/"element={<RecipePage/>}/>
      <Route path ="/details/:recipeName"element={<RecipeDetails/>}/>
    </Routes>
   
    </div>
  );
}

export default App;
