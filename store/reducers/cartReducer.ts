import { createSlice } from "@reduxjs/toolkit";
import { ProductDataTypes } from "../../components/ProductList/ProductList.types";

export type CartType = {
    cartItems: ProductDataTypes[]
    paymentMethod: string | null,
    totalItems: number
    shippingAddress: any
}

export type InitialStateType = {
    cart: CartType
}

export interface ReducerActionProps {
    type: string
    payload: any
}

const initialState: CartType = {
    cartItems: [],
    paymentMethod: null,
    totalItems: 0,
    shippingAddress: null
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        storeInLocalStorage(state, action) {
            state = action.payload
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existedItem: any = state?.cartItems?.find(c => c._id === newItem._id);

            if (existedItem && (existedItem.countInStock > 0)) {
                existedItem.quantity += 1
                existedItem.countInStock -= 1
            } else {
                state.cartItems.push(newItem)
            }
            state.totalItems += 1
        },
        removeItemFromCart(state, action) {
            state.cartItems = state.cartItems?.filter(item => item._id !== action.payload.id)
            state.totalItems -= 1
        },
        updateQuantity(state, action) {
            const existedItem: any = state?.cartItems?.find(c => c._id === action.payload.id);
            existedItem.quantity += action.payload.quantity
            state.totalItems += action.payload.quantity
        },
        savePaymentMethod(state, action) {
            state.paymentMethod = action.payload
        },
        clearCart(state) {
            state.cartItems = []
            state.totalItems = 0
            state.paymentMethod = null
        },
        resetInitialState(state) {
            state.cartItems = []
            state.totalItems = 0
            state.paymentMethod = null
            state.shippingAddress = null
        },
        saveShippingAddress(state, action) {
            state.shippingAddress = action.payload
        }
    }
})

const cartReducer = cartSlice.reducer;

export const selectCart = (state: InitialStateType) => state.cart;
export const { addItemToCart, removeItemFromCart, updateQuantity, savePaymentMethod, clearCart, saveShippingAddress, storeInLocalStorage, resetInitialState } = cartSlice.actions

export default cartReducer;