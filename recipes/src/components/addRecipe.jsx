import React from "react";
import AddCategory from "./addition/addCategory";
import AddNavbar from "../data/addNavbar";
import AddIngredient from "./addition/addIngredient";
import AddRecipeList from "./addition/addRecipeList";
import { Route, Routes } from "react-router-dom";
import "./addRecipe.css";

function AddRecipe() {
  return (
    <React.Fragment>
      <div>
        <AddNavbar />
      </div>
      <div className="addition">
        <Routes>
          <Route path="category" element={<AddCategory />} />
          <Route path="ingredient" element={<AddIngredient />} />
          <Route path="recipe" element={<AddRecipeList />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default AddRecipe;
