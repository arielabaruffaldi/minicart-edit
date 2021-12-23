import React, { useContext } from 'react'
import { ModalContext } from '../../store/context/ModalContext'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['ProductQuantity', 'ProductQuantity--button', 'ProductQuantity--button-add', 'ProductQuantity--button-remove', 'ProductQuantity--quantity']

const ProductQuantity = () => {
    const { state, dispatch } = useContext(ModalContext)
    const handles = useCssHandles(CSS_HANDLES)

    return (
        <div className={handles.ProductQuantity}>
            <button
                className={`${handles['ProductQuantity--button']} ${handles['ProductQuantity--button-remove']}`}
                onClick={() => state.quantity > 1 && dispatch({ type: 'SET_QUANTITY', payload: state.quantity - 1 })
                }> -
            </button>
            <span className={handles['ProductQuantity--quantity']}>{state.quantity}</span>
            <button
                className={`${handles['ProductQuantity--button']} ${handles['ProductQuantity--button-add']}`}
                onClick={() => dispatch({ type: 'SET_QUANTITY', payload: state.quantity + 1 })}
            > +
            </button>
        </div>
    )
}

export default ProductQuantity