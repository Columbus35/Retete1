import { Form, Container, Button, Alert } from "react-bootstrap";
import { FaRegPaperPlane } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addIngredient.css";

const AdaugIngredient = () => {
  const [ingredient, setIngredient] = useState("");
  const [meldung, setMeldung] = useState(null);

    const fetchData = async () => {
        const response = await fetch("http://localhost:5051/Ingredient");
        const jsonData = await response.json();

        const formattedSlides = jsonData.map((item) => ({
          ingredient: item.ingredient || "Ingredient",
        }));

        console.log(jsonData);
        const checkSlides = formattedSlides.some((item) => item.ingredient === ingredient);
      return checkSlides;

    };
    

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await fetchData()) {
      setMeldung("Ingredientul deja exista in baza de date!");
      return;
    }

    try {
     const response = await axios.post("http://localhost:5051/adaugIngredient", {
     ingredient : ingredient,
});
      setMeldung("Adaugarea s-a realizat cu succes!");
      setIngredient("");
    } catch (error) {
      console.error(error);
      setMeldung("Eroare la adaugare.");
    }
  };

    useEffect(() => {
    if (meldung) {
      const timer = setTimeout(() => {
        setMeldung(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [meldung]);
  return (
    <Container>
      <div className="ingredientGeneral">{meldung && <Alert variant="info">{meldung}</Alert>}</div>

      <Form onSubmit={handleSubmit} className="ingredientFormHead">
        <h1 className="ingredientTitlu">Adauga un ingredient nou</h1>
        <Form.Group className="ingredientMb-3">
          <Form.Control className="ingredientInput"
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            required ="required"
          />
          <Form.Label className="ingredientLabel">Ingredient</Form.Label>
        </Form.Group>

        <Button variant="primary" type="submit" className="ingredientButon">
          <span className="ingredientSpan">Adaugare <FaRegPaperPlane/></span><i></i>
        </Button>
      </Form>
    </Container>
  );
};

export default AdaugIngredient;
