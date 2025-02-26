import { Form, Container, Button, Alert, } from "react-bootstrap";
import { FaRegPaperPlane } from "react-icons/fa6";
import { MdDelete, MdAddShoppingCart } from "react-icons/md";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addListReteta.css";

const AddListReteta = () => {
  const [categoriListe, setCategoriListe] = useState([]);
  const [selecAllIngredients, setAllIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [cantitate, setCantitate] = useState();
  const [categorie, setCategorie] = useState("");
  const [titlu, setTitlu] = useState("");
  const [descriere, setDescriere] = useState("");
  const [reteta, setReteta] = useState("");
  const [imagine, setImagine] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [meldung, setMeldung] = useState(null);
  const [categorieId, setCategorieId] = useState(null);
  
   useEffect(() => {
        const fetchCategorie = async () => {
        const response = await fetch("http://localhost:5051/Categorie");
        const jsonData = await response.json();
        const filteredData = jsonData.map(({ id, categorie }) => ({
        id,
        categorie,
      }));

      setCategoriListe(filteredData);
    };

    fetchCategorie();
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
      const response = await axios.post("http://localhost:5051/adaugReteta", {
        reteta: reteta,
        descriere: descriere,
        categorie: categorieId,
        titlu: titlu,
        ingredient: ingredients,
        imagine: imagine,
      });
      setMeldung("Adaugarea s-a realizat cu succes!");
      setReteta("");
      setDescriere("");
      setTitlu("");
      setCategorie("");
      setIngredients([]);
      setImagine("");
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

   const handleChange = (e) => {
    const selectedCategorie = e.target.value;
    setCategorie(selectedCategorie);

    const selectedItem = categoriListe.find((item) => item.categorie === selectedCategorie);
    setCategorieId(selectedItem ? selectedItem.id : null);
  };

  const handleAddIngredient = () => {
    if (ingredient.trim() && cantitate.trim()) {
      setIngredients([...ingredients, { ingredient, cantitate }]);
      setIngredient("");
      setCantitate("");
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  return (
    <Container>
      <div className="retetaGeneral">{meldung && <Alert variant="info">{meldung}</Alert>}</div>

      <Form onSubmit={handleSubmit} className="retetaFormHead">
        <h1 className="culoareTitlu">Adauga o reteta noua</h1>
<div className="formular">
        <div className="celule">
          <div className="spacing">

       <Form.Group className="retetaMb-3">
          <Form.Select
          className="retetaInputMarka"
          value={categorie}
          onChange={handleChange}
          required
          >
          <option className = "retetaOption">Categorie</option>
          {categoriListe.map((item) => (
          <option key={item.id} value={item.categorie} className={`retetaOption ${!isActive ? "inactive" : ""}`}>
          {item.categorie}
         </option>
  ))}
</Form.Select>
          <Form.Label className="retetaLabel"></Form.Label>
          </Form.Group>
         </div>

        <Form.Group className="retetaMb-3">
          <Form.Control className="retetaInput"
            type="text"
            value={titlu}
            onChange={(e) => setTitlu(e.target.value)}
            required ="required"
          />
          <Form.Label className="retetaLabel">Titlu</Form.Label>
        </Form.Group>

        
        <Form.Group className="retetaMb-3">
          <Form.Control className="retetaInput"
            type="text"
            value={descriere}
            onChange={(e) => setDescriere(e.target.value)}
            required ="required"
          />
          <Form.Label className="retetaLabel">Descriere</Form.Label>
        </Form.Group>

          <Form.Group className="retetaMb-3">
          <Form.Control className="retetaInput"
            type="text"
            value={imagine}
            onChange={(e) => setImagine(e.target.value)}
            required ="required"
          />
          <Form.Label className="retetaLabel">Imagine</Form.Label>
        </Form.Group>

        <Form.Group className="retetaMb-3">
          <Form.Control className="retetaInput"
            type="text"
            value={reteta}
            onChange={(e) => setReteta(e.target.value)}
            required ="required"
          />
          <Form.Label className="retetaLabel">Reteta</Form.Label>
        </Form.Group>

      <Form.Group className="retetaMb-3">
      <Form.Select
    className="retetaInputMarka"
    value={ingredient}
    onChange={(e) => setIngredient(e.target.value)}
  >
    <option className="retetaOption">Alege un ingredient</option>
    {selecAllIngredients
      .slice() // Erstellt eine Kopie, um das Originalarray nicht zu verändern
      .sort((a, b) => a.ingredient.localeCompare(b.ingredient)) // Alphabetische Sortierung
      .map((item) => (
        <option key={item.id} value={item.ingredient} className="retetaOption">
          {item.ingredient}
        </option>
      ))}
  </Form.Select>
</Form.Group>

              <Form.Group className="retetaMb-3">
                <Form.Control
                  className="retetaInput"
                  type="text"
                  value={cantitate}
                  onChange={(e) => setCantitate(e.target.value)}
                  placeholder="Cantitate"
                />
              </Form.Group>

              <Button
                variant="secondary"
                type="button"
                onClick={handleAddIngredient}
              >
                <MdAddShoppingCart size={"20"}/>
              </Button>

            <ul>
              {ingredients.map((item, index) => (
                <li key={index}>
                  {item.ingredient} - {item.cantitate}{" "}
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                  >
                    <MdDelete size={"15"}/>
                  </Button>
                </li>
              ))}
            </ul>
            </div>

        </div>
        

        <Button variant="primary" type="submit" className="retetaButon">
          <span className="retetaSpan">Adaugare <FaRegPaperPlane/></span><i></i>
        </Button>
      </Form>
    </Container>
  );
};

export default AddListReteta;
