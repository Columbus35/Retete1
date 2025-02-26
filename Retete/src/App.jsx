import React from "react";
import {BrowserRouter} from "react-router-dom";
import ListaRetete from "./data/listaRetete";
import Reteta from "./data/reteta";
import Navbar from "./components/navbar";
import {Carousel} from "./components/carousel";
import { Route, Routes } from "react-router-dom";
import AddReteta from "./components/addReteta";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
    <div className="navbar">
      <Navbar/>
    </div>  
    <div className="allComponent">
      <Routes>
        <Route path="/home" element= {<Carousel/>}/>
        <Route path="/add-reteta/*" element= {<AddReteta/>}/>
        <Route path="/carte/*" element= {<ListaRetete/>}/>
        <Route path="/carte/reteta/:id" element={<Reteta />}/>
      </Routes>
    </div>
    </BrowserRouter>
   </React.Fragment>
  );
}

export default App;