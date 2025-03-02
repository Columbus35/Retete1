import { Form, Container, Button, Alert } from "react-bootstrap";
import { FaRegPaperPlane } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addIngredient.css";

const AddIngredient = () => {
  const [ingredient, setIngredient] = useState("");
  const [message, setMessage] = useState(null);

  const checkIngredientExists = async () => {
    try {
      const response = await fetch("http://localhost:5051/Ingredient");
      const jsonData = await response.json();

      const existingIngredients = jsonData.map((item) => item.ingredient);
      return existingIngredients.includes(ingredient);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await checkIngredientExists()) {
      setMessage("The ingredient already exists in the database!");
      return;
    }

    try {
      await axios.post("http://localhost:5051/addIngredient", {
        ingredient: ingredient,
      });
      setMessage("The ingredient was added successfully!");
      setIngredient("");
    } catch (error) {
      console.error("Error adding ingredient:", error);
      setMessage("Error adding ingredient.");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Container>
      <div className="ingredientGeneral">{message && <Alert variant="info">{message}</Alert>}</div>

      <Form onSubmit={handleSubmit} className="ingredientFormHead">
        <h1 className="ingredientTitle">Add a new ingredient</h1>
        <Form.Group className="ingredientMb-3">
          <Form.Control
            className="ingredientInput"
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            required
          />
          <Form.Label className="ingredientLabel">Ingredient</Form.Label>
        </Form.Group>

        <Button variant="primary" type="submit" className="ingredientButton">
          <span className="ingredientSpan">Add <FaRegPaperPlane/></span>
        </Button>
      </Form>
    </Container>
  );
};

export default AddIngredient;
