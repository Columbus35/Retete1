import { Form, Container, Button, Alert } from "react-bootstrap";
import { FaRegPaperPlane } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addCategorie.css";

const AdaugCategorie = () => {
  const [categorie, setCategorie] = useState("");
  const [culoare, setCuloare] = useState("");
  const [meldung, setMeldung] = useState(null);

    const fetchData = async () => {
        const response = await fetch("http://localhost:5051/Categorie");
        const jsonData = await response.json();

        const formattedSlides = jsonData.map((item) => ({
          categorie: item.categorie || "Categorie",
        }));

        console.log(jsonData);
        const checkSlides = formattedSlides.some((item) => item.categorie === categorie);
      return checkSlides;

    };
    

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await fetchData()) {
      setMeldung("Categoria deja exista in baza de date!");
      return;
    }

    try {
     const response = await axios.post("http://localhost:5051/adaugCategorie", {
  categorie: categorie,
  culoare: culoare,
});
      setMeldung("Adaugarea s-a realizat cu succes!");
      setCategorie("");
      setCuloare("");
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
      <div className="categorieGeneral">{meldung && <Alert variant="info">{meldung}</Alert>}</div>

      <Form onSubmit={handleSubmit} className="categorieFormHead">
        <h1 className="categorieTitlu">Adauga o categorie noua</h1>
        <Form.Group className="categorieMb-3">
          <Form.Control className="categorieInput"
            type="text"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            required ="required"
          />
          <Form.Label className="categorieLabel">Categoria</Form.Label>
        </Form.Group>

        <Form.Group className="categorieMb-3">
          <Form.Control className="categorieInput" required ="required"
            type="text"
            value={culoare}
            onChange={(e) => setCuloare(e.target.value)}

          />
          <Form.Label className="categorieLabel">Culoare</Form.Label>
        </Form.Group>

        <Button variant="primary" type="submit" className="categorieButon">
          <span className="categorieSpan">Adaugare <FaRegPaperPlane/></span><i></i>
        </Button>
      </Form>
    </Container>
  );
};

export default AdaugCategorie;
