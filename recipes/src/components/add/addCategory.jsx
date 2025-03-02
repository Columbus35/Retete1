import { Form, Container, Button, Alert } from "react-bootstrap";
import { FaRegPaperPlane } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addCategory.css";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [message, setMessage] = useState(null);

  const checkCategoryExists = async () => {
    try {
      const response = await axios.get("http://localhost:5051/Categorie");
      const existingCategories = response.data.map(item => item.categorie);
      return existingCategories.includes(category);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return false; 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await checkCategoryExists()) {
      setMessage("Category already exists!");
      return;
    }

    try {
      await axios.post("http://localhost:5051/adaugCategorie", {
        categorie: category,
        culoare: color,
      });
      setMessage("Category added successfully!");
      setCategory("");
      setColor("");
    } catch (error) {
      console.error("Error adding category:", error);
      setMessage("Error adding category.");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Container>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit} className="categoryFormHead">
        <h1 className="categoryTitle">Add a New Category</h1>

        <Form.Group className="categoryMb-3">
          <Form.Control
            className="categoryInput"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <Form.Label className="categoryLabel">Category</Form.Label>
        </Form.Group>

        <Form.Group className="categoryMb-3">
          <Form.Control
            className="categoryInput"
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
          <Form.Label className="categoryLabel">Color</Form.Label>
        </Form.Group>

        <Button variant="primary" type="submit" className="categoryButton">
          <span className="categorySpan">Add <FaRegPaperPlane/></span>
        </Button>
      </Form>
    </Container>
  );
};

export default AddCategory;
