import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ImArrowLeft } from "react-icons/im";
import { Link } from "react-router-dom";
import "./recipe.css";

const Recipe = () => {
  const { id } = useParams(); 
  const [categories, setCategories] = useState([]);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5051/Reteta");
        const jsonData = await response.json();

        const formattedSlides = jsonData.map((item) => ({
          id: item.id || "id",
          title: item.titlu || "title",
          description: item.descriere || "description",
          image: item.imagine ? `http://localhost:5051/imagini/${item.imagine}` : "",
          instructions: item.reteta || "instructions",
          ingredients: Array.isArray(item.ingredient)
            ? item.ingredient.map((ing) => ({
                name: ing.ingredient || "Unknown ingredient",
                amount: ing.cantitate || "No amount specified",
              }))
            : [],
        }));

        setCategories(formattedSlides); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const matchedRecipe = categories.find((item) => item.id === id);
      setRecipe(matchedRecipe || null);
    }
  }, [categories, id]);

  if (!recipe) {
    return <h1>Updating data...</h1>;
  }

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>
      <div className="recipe-img"
       style={{
                    "--background": `url(${recipe.image})`,
                    }}></div>
      <div className="h3-ingre">             
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}: {ingredient.amount}
          </li>
        ))}
      </ul>
      </div> 
      <div className="h3-rete">
      <h3>Preparation:</h3>
      <p>{recipe.instructions}</p>
      </div>
      <Link to='/book'>
                 <div className="button-back">
                  <span className="navIcon-back">
                    <ImArrowLeft size={"30"}/>
                  </span>
                  </div>
      </Link>
    </div>
  );
};

export default Recipe;
