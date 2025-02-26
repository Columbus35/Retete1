import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import fire from "./init.js";
import { getFirestore, collection, getDocs, doc, addDoc} from "firebase/firestore";

const port = 5051;
const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.static("files"));
const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename);
const imaginiPath = path.join(__dirname, 'imagini');
app.use('/imagini', express.static(imaginiPath));
app.use(express.json());

const db = getFirestore(fire);

app.get("/Cover", async (req, res) => {
  const listaCover = await getDocs(collection(db, "Cover"));
  let newCover = await listaCover.docs.map((item) => {
    let cover = item.data();
    cover.id = item.id; 
    return cover;
  });
  res.status(200).send(JSON.stringify(newCover));
});

app.get("/Categorie", async (req, res) => {
  const listaCategorie = await getDocs(collection(db, "Categorie"));
  let newCategorie = await listaCategorie.docs.map((item) => {
    let categorie = item.data();
    categorie.id = item.id; 
    return categorie;
  });
  res.status(200).send(JSON.stringify(newCategorie));
});

app.get("/Reteta", async (req, res) => {
  const listaReteta = await getDocs(collection(db, "Reteta"));
  let newReteta = await listaReteta.docs.map((item) => {
    let reteta = item.data();
    reteta.id = item.id; 
    return reteta;
  });
  res.status(200).send(JSON.stringify(newReteta));
});

app.get("/Ingredient", async (req, res) => {
  const listaIngredient = await getDocs(collection(db, "Ingredient"));
  let newIngredient = await listaIngredient.docs.map((item) => {
    let ingredient = item.data();
    ingredient.id = item.id; 
    return ingredient;
  });
  res.status(200).send(JSON.stringify(newIngredient));
});

app.post("/adaugCategorie", async (req, res) => {
  const { categorie, culoare } = req.body;

  try {
    const newCategorie = {
      categorie: categorie,
      culoare: culoare,
    };

    const docRef = await addDoc(collection(db, "Categorie"), newCategorie);

    res.status(201).send({ message: "Datele au fost adaugate cu succes!", id: docRef.id });
  } catch (error) {
    console.error("A aparut o eroare la adaugare:", error);
    res.status(500).send({ message: "A aparut o eroare la adaugare." });
  }
});

app.post("/adaugIngredient", async (req, res) => {
  const { ingredient } = req.body;

  try {
    const newIngredient = {
      ingredient : ingredient
    };

    const docRef = await addDoc(collection(db, "Ingredient"), newIngredient);

    res.status(201).send({ message: "Datele au fost adaugate cu succes!", id: docRef.id });
  } catch (error) {
    console.error("A aparut o eroare la adaugare:", error);
    res.status(500).send({ message: "A aparut o eroare la adaugare." });
  }
});

app.post("/adaugReteta", async (req, res) => {
  const { ingredient, titlu, categorie, descriere, reteta, imagine } = req.body;

  try {
    const newReteta = {
      ingredient : ingredient,
      titlu : titlu,
      categorie : categorie,
      descriere : descriere,
      reteta : reteta,
      imagine: imagine
    };

    const docRef = await addDoc(collection(db, "Reteta"), newReteta);

    res.status(201).send({ message: "Datele au fost adaugate cu succes!", id: docRef.id });
  } catch (error) {
    console.error("A aparut o eroare la adaugare:", error);
    res.status(500).send({ message: "A aparut o eroare la adaugare." });
  }
});


app.listen(port, () => {
  console.log(`Serverul așteaptă comenzi pe portul ${port}`);
});