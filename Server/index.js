import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import firebaseApp from "./init.js";
import { getFirestore, collection, getDocs, doc, addDoc } from "firebase/firestore";

const port = 5051;
const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.static("files"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesPath = path.join(__dirname, 'images');
app.use('/images', express.static(imagesPath));
app.use(express.json());

const db = getFirestore(firebaseApp);

app.get("/covers", async (req, res) => {
  const coverList = await getDocs(collection(db, "Cover"));
  let formattedCovers = coverList.docs.map((item) => {
    let cover = item.data();
    cover.id = item.id;
    return cover;
  });
  res.status(200).json(formattedCovers);
});

app.get("/categories", async (req, res) => {
  const categoryList = await getDocs(collection(db, "Categorie"));
  let formattedCategories = categoryList.docs.map((item) => {
    let category = item.data();
    category.id = item.id;
    return category;
  });
  res.status(200).json(formattedCategories);
});

app.get("/recipes", async (req, res) => {
  const recipeList = await getDocs(collection(db, "Reteta"));
  let formattedRecipes = recipeList.docs.map((item) => {
    let recipe = item.data();
    recipe.id = item.id;
    return recipe;
  });
  res.status(200).json(formattedRecipes);
});

app.get("/ingredients", async (req, res) => {
  const ingredientList = await getDocs(collection(db, "Ingredient"));
  let formattedIngredients = ingredientList.docs.map((item) => {
    let ingredient = item.data();
    ingredient.id = item.id;
    return ingredient;
  });
  res.status(200).json(formattedIngredients);
});

app.post("/add-category", async (req, res) => {
  const { category, color } = req.body;

  try {
    const newCategory = {
      category: category,
      color: color,
    };

    const docRef = await addDoc(collection(db, "Categorie"), newCategory);

    res.status(201).json({ message: "Data added successfully!", id: docRef.id });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ message: "An error occurred while adding data." });
  }
});

app.post("/add-ingredient", async (req, res) => {
  const { ingredient } = req.body;

  try {
    const newIngredient = { ingredient: ingredient };
    const docRef = await addDoc(collection(db, "Ingredient"), newIngredient);

    res.status(201).json({ message: "Data added successfully!", id: docRef.id });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ message: "An error occurred while adding data." });
  }
});

app.post("/add-recipe", async (req, res) => {
  const { ingredient, title, category, description, recipe, image } = req.body;

  try {
    const newRecipe = {
      ingredient: ingredient,
      title: title,
      category: category,
      description: description,
      recipe: recipe,
      image: image,
    };

    const docRef = await addDoc(collection(db, "Reteta"), newRecipe);

    res.status(201).json({ message: "Data added successfully!", id: docRef.id });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ message: "An error occurred while adding data." });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
