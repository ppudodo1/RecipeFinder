"use client"
import React, { useEffect } from 'react'
import styles from "./recipe.module.css"
import Link from "next/link"
import { setRecipeData } from '@/redux/slices/reduxAction'
import { connect } from 'react-redux';
import {Provider} from "react-redux";
import { useRef } from 'react'
import { makeStore } from '@/redux/store'
import {useDispatch} from "react-redux"
import Image from "next/image"
function Recipe({name,desc,steps,image,ing}) {
  const dispatch = useDispatch();
 
  /*const storeRef = useRef();
  if(!storeRef.current){
    storeRef.current = makeStore();
  }*/
  
  const handleClick = ()=>{
    console.log("Ime prije reduxa: ",name)
    dispatch(setRecipeData({name,desc,steps,image,ing}))
  }
  return (
        
        <div className={styles.container}>
          <div className={styles.imageContainer}>
          <Image src={image} fill objectFit='cover'></Image>
          </div>
          <div className={styles.txtContainer}>
            <div>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.desc}>{desc}</p>
            </div>
            <div>
              <Link href={`/recipes/fullrecipe/${name}`}><button onClick={handleClick} className={styles.recipeButton}>See full recipe</button></Link>
            </div>
          </div>
          
      </div>
    
    
  )
}

export default Recipe
