import React from 'react'
import styles from "./ingredient.module.css"
import { redirect } from 'next/navigation'
function Ingredient({nameofIngredient}) {
  const deleteOnClick = ()=>{
    let arr = localStorage.getItem("ingredientsArray");
    //console.log("arr: ",JSON.parse(arr));
    const newArr = JSON.parse(arr).filter(el=>el!==nameofIngredient)
    console.log("Novi arr: ",newArr);
    localStorage.setItem("ingredientsArray",JSON.stringify(newArr))
    window.location.reload();
  }
  return (
    <div className={styles.bigger}>
      <div className={styles.container}>
            <p>{nameofIngredient}</p>
            <button onClick={deleteOnClick} className={styles.btn}>Delete</button>
      </div>
    </div>
    
  )
}

export default Ingredient
