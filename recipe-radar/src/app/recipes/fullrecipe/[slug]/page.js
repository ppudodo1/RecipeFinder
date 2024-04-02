"use client"
import React from 'react'
import {useSelector} from "react-redux"
import Image from "next/image"
import styles from "./fullrecipe.module.css"
function page() {
  const {name,desc,steps,image,ing} = useSelector(state=>state.recipe);
  console.log("steps: ",steps)
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
      <Image
      src={image}
      fill
      objectFit='cover'
     />
      </div>
      <div className={styles.txtContainer}>
        <h1>
        {name}
        </h1>
        <p>
        {desc}
        </p>
        <p>
          Steps:
          {steps}
        </p>
        Ingredients:
        {
        ing.map((e)=>(
          <p>{e}</p>
        ))
      }


      </div>
      
      
    
      
    </div>
  )
}

export default page
