import {configureStore} from "@reduxjs/toolkit";
import { recipeReducer } from "./slices/reduxAction";
export const makeStore = ()=>{
    return configureStore({
        reducer:{
                recipe: recipeReducer
        }
    })
}