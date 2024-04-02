"use client"
import { makeStore } from "./store"
import {Provider} from "react-redux"
const store = makeStore();
export function ReduxProvider({children}){
    return <Provider store={store}>{children}</Provider>
}