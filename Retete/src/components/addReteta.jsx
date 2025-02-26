import React from "react";
import AddCategorie from "./adaugare/addCategorie";
import AddNavbar from "../data/addNavbar";
import AddIngredient from "./adaugare/addIngredient";
import AddListReteta from "./adaugare/addListReteta";
import { Route, Routes } from "react-router-dom";
import "./addReteta.css";

function AddReteta() {
  return (
    <React.Fragment>
      <div>
        <AddNavbar />
      </div>
      <div className="adaugare">
        <Routes>
          <Route path="categorie" element={<AddCategorie />} />
          <Route path="ingredient" element={<AddIngredient />} />
          <Route path="reteta" element={<AddListReteta />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default AddReteta;
