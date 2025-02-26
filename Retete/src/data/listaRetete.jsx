import React, { useState, useEffect } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Route, Routes } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { Link } from 'react-router-dom';
import Reteta from "./reteta";
import "./listaRetete.css";

const ListaRetete = () => {
  const [slides, setSlides] = useState([]);
  const [categorieb, setCategorie] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5051/Reteta");
        const jsonData = await response.json();

        const formattedSlides = jsonData.map((item) => ({
          id: item.id || "id",
          titlu: item.titlu || "titlu",
          descriere: item.descriere || "descriere",
          categorie: (categorieb.find((cat) => cat.id === item.categorie) || {}).categorieLink || "categorie",
          culoare : (categorieb.find((cat) => cat.id === item.categorie) || {}).culoareLink || "culoare",
          imagine: `http://localhost:5051/imagini/${item.imagine}`
        }));

        formattedSlides.sort((a, b) => a.categorie.localeCompare(b.categorie));
        setSlides(formattedSlides);
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    };

    fetchData();
  }, [categorieb]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5051/Categorie");
        const jsonData = await response.json();

        const formattedCategorie = jsonData.map((item) => ({
          id: item.id || "id",
          culoareLink: item.culoare || "culoare",
          categorieLink: item.categorie || "categorie",
        }));
        setCategorie(formattedCategorie);
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <section>
        <div className="layout">
          {slides.length > 0 && (
            <React.Fragment>
            <div className="reteteLista">
              <div className="reteteCard">
                <div className="reteteImgBox"
                    style={{
                    '--background-url': `url(${slides[currentSlide].imagine})`,
                    }}>
                </div>
                <div className="reteteContent">
                  <span className="reteteCategorii" style={{ '--bkground': slides[currentSlide].culoare }}>
                    <p className="textCategorii">{slides[currentSlide].categorie}</p>
                  </span>
                  <span className="titleContent">
                      <h1>{slides[currentSlide].titlu}</h1>
                      <p>{slides[currentSlide].descriere}</p>
                  </span>
                </div>
              </div>
           </div>
              
          <button onClick={prevSlide}><span className="arrow arrow-left"><RiArrowLeftSLine size="40"/></span></button>
          <button onClick={nextSlide}><span className="arrow arrow-right"><RiArrowRightSLine size="40"/></span></button>
              <div className="bootenReteta">  
                <Link to={`/carte/reteta/${slides[currentSlide].id}`}>
                 <div className="booten">
                  <span className="navText">Reteta</span>
                  <span className="navIcon">
                    <GiKnifeFork/>
                  </span>
                  </div>
                </Link>
               </div>  
            </React.Fragment>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default ListaRetete;
