import { Form, Container, Button, Alert } from "react-bootstrap";
import { FaRegPaperPlane } from "react-icons/fa6";
import { MdDelete, MdAddShoppingCart } from "react-icons/md";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addListRecipe.css";

const AddListRecipe = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [quantity, setQuantity] = useState();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recipe, setRecipe] = useState("");
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch("http://localhost:5051/Category");
      const jsonData = await response.json();
      const filteredData = jsonData.map(({ id, category }) => ({
        id,
        category,
      }));

      setCategoryList(filteredData);
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchIngredient = async () => {
      const response = await fetch("http://localhost:5051/Ingredient");
      const jsonData = await response.json();
      const filteredData = jsonData.map(({ id, ingredient }) => ({
        id,
        ingredient,
      }));

      setAllIngredients(filteredData);
    };

    fetchIngredient();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5051/addRecipe", {
        recipe: recipe,
        description: description,
        category: categoryId,
        title: title,
        ingredient: ingredients,
        image: image,
      });
      setMessage("The recipe was added successfully!");
      setRecipe("");
      setDescription("");
      setTitle("");
      setCategory("");
      setIngredients([]);
      setImage("");
    } catch (error) {
      console.error(error);
      setMessage("Error adding recipe.");
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

  const handleChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    const selectedItem = categoryList.find((item) => item.category === selectedCategory);
    setCategoryId(selectedItem ? selectedItem.id : null);
  };

  const handleAddIngredient = () => {
    if (ingredient.trim() && quantity.trim()) {
      setIngredients([...ingredients, { ingredient, quantity }]);
      setIngredient("");
      setQuantity("");
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  return (
    <Container>
      <div className="recipeGeneral">{message && <Alert variant="info">{message}</Alert>}</div>

      <Form onSubmit={handleSubmit} className="recipeFormHead">
        <h1 className="colorTitle">Add a new recipe</h1>
        <div className="formContainer">
          <div className="formRow">
            <div className="spacing">
              <Form.Group className="recipeMb-3">
                <Form.Select
                  className="recipeInputMarka"
                  value={category}
                  onChange={handleChange}
                  required
                >
                  <option className="recipeOption">Category</option>
                  {categoryList.map((item) => (
                    <option key={item.id} value={item.category} className={`recipeOption ${!isActive ? "inactive" : ""}`}>
                      {item.category}
                    </option>
                  ))}
                </Form.Select>
                <Form.Label className="recipeLabel"></Form.Label>
              </Form.Group>
            </div>

            <Form.Group className="recipeMb-3">
              <Form.Control
                className="recipeInput"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Form.Label className="recipeLabel">Title</Form.Label>
            </Form.Group>

            <Form.Group className="recipeMb-3">
              <Form.Control
                className="recipeInput"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <Form.Label className="recipeLabel">Description</Form.Label>
            </Form.Group>

            <Form.Group className="recipeMb-3">
              <Form.Control
                className="recipeInput"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
              <Form.Label className="recipeLabel">Image</Form.Label>
            </Form.Group>

            <Form.Group className="recipeMb-3">
              <Form.Control
                className="recipeInput"
                type="text"
                value={recipe}
                onChange={(e) => setRecipe(e.target.value)}
                required
              />
              <Form.Label className="recipeLabel">Recipe</Form.Label>
            </Form.Group>

            <Form.Group className="recipeMb-3">
              <Form.Select
                className="recipeInputMarka"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
              >
                <option className="recipeOption">Choose an ingredient</option>
                {allIngredients
                  .slice()
                  .sort((a, b) => a.ingredient.localeCompare(b.ingredient))
                  .map((item) => (
                    <option key={item.id} value={item.ingredient} className="recipeOption">
                      {item.ingredient}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="recipeMb-3">
              <Form.Control
                className="recipeInput"
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
              />
            </Form.Group>

            <Button variant="secondary" type="button" onClick={handleAddIngredient}>
              <MdAddShoppingCart size={"20"} />
            </Button>

            <ul>
              {ingredients.map((item, index) => (
                <li key={index}>
                  {item.ingredient} - {item.quantity}{" "}
                  <Button variant="danger" type="button" onClick={() => handleRemoveIngredient(index)}>
                    <MdDelete size={"15"} />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button variant="primary" type="submit" className="recipeButton">
          <span className="recipeSpan">Add <FaRegPaperPlane /></span><i></i>
        </Button>
      </Form>
    </Container>
  );
};

export default AddListRecipe;
