import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartNumber: 0,
    products: []
}


export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state, action) => {
            state.cartNumber += 1
            let product = state.products.find(
                item => item._id === action.payload._id)
            if (product) {
                let newProducts = state.products.map((item) => {
                    if (action.payload._id === item._id) {
                        return { ...item, cartQuantity: item.cartQuantity + 1 }
                    }
                    return item
                })
                state.products = newProducts

            } else {
                state.products.push(action.payload)
            }
        },
        clearCart: (state) => {
            state.cartNumber = 0
            state.products = []
        },
        removeItem: (state, action) => {
           
            let newProduct = state.products.filter(product=> product._id !==action.payload)
            let totelQuantity = 0
            newProduct.forEach(element=>{
                totelQuantity+= element.cartQuantity
            })
            state.products = newProduct
            state.cartNumber = totelQuantity
        },
        addOneProduct: (state, action) => {

            let newProducts = state.products.map((item) => {
                if (action.payload._id === item._id) {
                    return { ...item, cartQuantity: item.cartQuantity + 1 }
                }
                return item
            })
            state.products = (newProducts)
            state.cartNumber += 1
        },
        removeOneProduct: (state, action) => {
            let newProducts = state.products.map((item) => {
                if (action.payload._id === item._id) {
                    return { ...item, cartQuantity: item.cartQuantity - 1 }
                }
                return item
            })
            
            state.products = (newProducts)
            state.cartNumber -= 1
        }
    }
})

export const { increment, clearCart, removeItem, addOneProduct, removeOneProduct } = counterSlice.actions
export default counterSlice.reducer