"use client"
import React, { useState } from 'react'
import styles from "./searchBar.module.css"
import axios from "axios"
import Link from "next/link"
function SearchBar({ onAddIngredient }) {
    const [input,setInput] = useState();
    const gettingDataFromDatabase = async()=>{
      /*const ingNames = localStorage.getItem("ingredientsArray")
      
      const data = await fetch("http://localhost:3000/getIds", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingFromFrontend: JSON.parse(ingNames) })
      });
        const recipes = await data.json();
        console.log(recipes)
      const sendDataback = await fetch("http://localhost:3000/compareData",{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({ frontendIds: recipes })
          
      });*/
    }
    const buttonClick = ()=>{
        //gettingDataFromDatabase();
        if(input!=null && input!=""){
          onAddIngredient(input);
        }

        setInput('')
    }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <input type="text" placeholder='Add ingredient' 
      value={input}
      onChange={(e)=>setInput(e.target.value)}
        className={styles.inputBar}
      />
      <button className={styles.addButton} onClick={buttonClick}>+</button>
      </div>
      
      <br />
      <Link href="/recipes" className={styles.searchButton} onClick={gettingDataFromDatabase}>Search</Link>
    </div>
  )
}

export default SearchBar
