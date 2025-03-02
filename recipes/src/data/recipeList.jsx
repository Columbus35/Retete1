import React, { useState, useEffect } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./recipeList.css";

const RecipeList = () => {
  const [slides, setSlides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5051/Reteta");
        const jsonData = await response.json();

        const formattedSlides = jsonData.map((item) => ({
          id: item.id || "id",
          title: item.titlu || "title",
          description: item.descriere || "description",
          category: (categories.find((cat) => cat.id === item.categorie) || {}).categoryLink || "category",
          color: (categories.find((cat) => cat.id === item.categorie) || {}).colorLink || "color",
          image: `http://localhost:5051/imagini/${item.imagine}`,
        }));

        formattedSlides.sort((a, b) => a.category.localeCompare(b.category));
        setSlides(formattedSlides);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRecipes();
  }, [categories]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5051/Categorie");
        const jsonData = await response.json();

        const formattedCategories = jsonData.map((item) => ({
          id: item.id || "id",
          colorLink: item.culoare || "color",
          categoryLink: item.categorie || "category",
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <React.Fragment>
      <section>
        <div className="layout">
          {slides.length > 0 && (
            <React.Fragment>
              <div className="recipeList">
                <div className="recipeCard">
                  <div
                    className="recipeImgBox"
                    style={{
                      "--background-url": `url(${slides[currentSlide].image})`,
                    }}
                  ></div>
                  <div className="recipeContent">
                    <span className="recipeCategory" style={{ "--bkground": slides[currentSlide].color }}>
                      <p className="textCategory">{slides[currentSlide].category}</p>
                    </span>
                    <span className="titleContent">
                      <h1>{slides[currentSlide].title}</h1>
                      <p>{slides[currentSlide].description}</p>
                    </span>
                  </div>
                </div>
              </div>

              <button onClick={prevSlide}>
                <span className="arrow arrow-left">
                  <RiArrowLeftSLine size="40" />
                </span>
              </button>
              <button onClick={nextSlide}>
                <span className="arrow arrow-right">
                  <RiArrowRightSLine size="40" />
                </span>
              </button>
              <div className="buttonRecipe">
                <Link to={`/book/recipe/${slides[currentSlide].id}`}>
                  <div className="button">
                    <span className="navText">Recipe</span>
                    <span className="navIcon">
                      <GiKnifeFork />
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

export default RecipeList;
