import React, { useContext } from 'react'
import { ModalContext } from '../../store/context/ModalContext'

const ProductQuantity = () => {
    const { state, dispatch } = useContext(ModalContext)

    return (
        <>
            <button onClick={()=> state.quantity > 1 && dispatch({type: 'SET_QUANTITY', payload: state.quantity - 1})}> - </button>
            <span>{state.quantity}</span>
            <button onClick={()=>dispatch({type: 'SET_QUANTITY', payload: state.quantity + 1})}> + </button>

        </>
    )
}

export default ProductQuantity