import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ImArrowLeft } from "react-icons/im";
import { Link } from 'react-router-dom';
import './reteta.css';

const Reteta = () => {
  const { id } = useParams(); 
  const [categorie, setCategorie] = useState([]);
  const [reteta, setReteta] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5051/Reteta");
        const jsonData = await response.json();

        const formattedSlides = jsonData.map((item) => ({
          id: item.id || "id",
          titlu: item.titlu || "titlu",
          descriere: item.descriere || "descriere",
          imagine: item.imagine ? `http://localhost:5051/imagini/${item.imagine}` : "",
          reteta: item.reteta || "reteta",
          ingrediente: Array.isArray(item.ingredient)
            ? item.ingredient.map((ing) => ({
                name: ing.ingredient || "Unbekannte Zutat",
                menge: ing.cantitate || "Keine Menge angegeben",
              }))
            : [],
        }));

        setCategorie(formattedSlides); 
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (categorie.length > 0) {
      const matchedReteta = categorie.find((item) => item.id === id);
      setReteta(matchedReteta || null);
    }
  }, [categorie, id]);

  if (!reteta) {
    return <h1>Datele se actualizeaza...</h1>;
  }

  return (
    <div className="reteta-details">
      <h1>{reteta.titlu}</h1>
      <div className="reteta-img"
       style={{
                    '--background': `url(${reteta.imagine})`,
                    }}></div>
      <div className="h3-ingre">             
      <h3>Ingrediente:</h3>
      <ul>
        {reteta.ingrediente.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}: {ingredient.menge}
          </li>
        ))}
      </ul>
      </div> 
      <div className="h3-rete">
      <h3>Modul de preparare:</h3>
      <p>{reteta.reteta}</p>
      </div>
      <Link to='/carte'>
                 <div className="booten-back">
                  <span className="navIcon-back">
                    <ImArrowLeft size={"30"}/>
                  </span>
                  </div>
      </Link>
    </div>

  );
};

export default Reteta;
