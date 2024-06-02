import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()
const reducer = (state,action)=>{
switch(action.type){
    case "ADD":
        return [...state,{id:action.id,name:action.name,price:action.price,img:action.img,qty:action.qty,size:action.size}]
    default:
        console.log("error in reducer")
}
}
export const CartProvider = ({children})=>{
    const [state,dispatch] = useReducer(reducer,[])
    return(
            <CartDispatchContext.Provider value={dispatch}>
                <CartStateContext.Provider value={state}>
                    {children}
                </CartStateContext.Provider>
            </CartDispatchContext.Provider>
    )
}
export const Usecart = () =>useContext(CartStateContext)
export const UseDispatchcart = () =>useContext(CartDispatchContext)