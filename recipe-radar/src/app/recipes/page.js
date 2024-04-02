"use client"
import Recipe from '@/components/Recipe/recipe';
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css";
function page() {
    const [dataForBrowser,setDataForBrowser] = useState(null);
    const gettingDataFromDatabase = async()=>{
        const ingNames = localStorage.getItem("ingredientsArray")
      
        const data = await fetch("http://localhost:3000/getIds", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ingFromFrontend: JSON.parse(ingNames) })
        });
          const recipes = await data.json();
          //console.log(recipes)
        const sendDataback = await fetch("http://localhost:3000/compareData",{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({ frontendIds: recipes })
            
        });
        const finalData = await sendDataback.json();
        //console.log("Data:", finalData)
        const recipeData = await fetch("http://localhost:3000/returningRecipesData",{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({ recipeIds: finalData })
        })
        const givenRecipe =await recipeData.json();
        //setDataForBrowser(givenRecipe);
        console.log("Given recipe: ",givenRecipe);
        const ingData = await fetch("http://localhost:3000/returningIngredientData",{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({ ingDataIds: givenRecipe })
        })
        const finalDataAndIng = await ingData.json();
        setDataForBrowser(finalDataAndIng)
        console.log("Recept sa sastojcima: ", finalDataAndIng)
    }
    useEffect(()=>{
        gettingDataFromDatabase();
    },[])
    // Ovo jos rewriteati na bolji nacin ali neka zasada bude rijesnje
    if(dataForBrowser==undefined){
      console.log(dataForBrowser)
      if(dataForBrowser==null){
        //console.log("We haven't found any recipes that match your needs.")
        return <div>We haven't found any recipes that match your needs.</div>
      }
      return <div>Loading...</div>
    }
   

  return (
    <div className={styles.bigContainer}>
      {
        dataForBrowser.map((dat,index)=>(
          <Recipe name = {dat.recipeName} desc ={dat.desc} steps={dat.steps} ing={dat.ingredientName} image = {dat.image} key={index}></Recipe>
        ))
      }
    </div>
  )
}

export default page
