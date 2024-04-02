"use client"
import Image from "next/image";
import styles from "./page.module.css";
import SearchBar from "@/components/SearchBar/searchBar.jsx";
import { useEffect, useState } from "react";
import Ingredient from "@/components/Ingredient/ingredient";
import { makeStore } from "@/redux/store";
import { Provider } from 'react-redux'; // Import Provider
export default function Home() {
  
  const [ingredients,setIngredients] = useState([]);
  const [extractedFromLocalStorage,setExtractdFromLocalStorage]=useState([])
  let storage = [];
  
  const addIngredient = (ingredientName)=>{
    
    const newIngredients = [...ingredients, ingredientName];
    setIngredients(newIngredients);
    
    storage= JSON.parse(localStorage.getItem("ingredientsArray"));
    storage.push(ingredientName)
    let stringifiedVersion = JSON.stringify(storage);
    localStorage.setItem("ingredientsArray",stringifiedVersion);
    

  }
  useEffect(()=>{
    setExtractdFromLocalStorage(JSON.parse(localStorage.getItem("ingredientsArray")))
    
  },[ingredients])
  


  return (
    <div>
    <SearchBar onAddIngredient={addIngredient}></SearchBar>
    {extractedFromLocalStorage.map((ing, index) => (
      <Ingredient key={index} nameofIngredient={ing}></Ingredient>
    ))}
  </div>
  );
}
