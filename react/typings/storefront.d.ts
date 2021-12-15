import { FunctionComponent } from 'react'

declare global {
  interface ModalContext {
    product: any,
    activeSku: any,
    colors: any[],
    selectedColor: string,
    availableSkusPerColor: any[],
    selectedSize: any
  }
  interface CartContext {
    cartItems: any[];
  }
}
