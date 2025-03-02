import React from "react";
import { BrowserRouter } from "react-router-dom";
import RecipeList from "./data/recipeList";
import Recipe from "./data/recipe";
import Navbar from "./components/navbar";
import { Carousel } from "./components/carousel";
import { Route, Routes } from "react-router-dom";
import AddRecipe from "./components/addRecipe";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="allComponent">
          <Routes>
            <Route path="/home" element={<Carousel />} />
            <Route path="/add-recipe/*" element={<AddRecipe />} />
            <Route path="/book/*" element={<RecipeList />} />
            <Route path="/book/recipe/:id" element={<Recipe />} />
          </Routes>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
