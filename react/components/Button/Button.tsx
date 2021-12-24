import React, { useEffect, useContext } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { addToCart as ADD_TO_CART, updateItems as UPDATE_ITEMS } from 'vtex.checkout-resources/Mutations'

import { useMutation } from 'react-apollo';
import { ModalContext } from '../../store/context/ModalContext';
import { GeneralContext } from '../../store/context/GeneralContext';

const CSS_HANDLES = ['Button', 'Button--disabled']

interface ButtonProps {
}

const Button: React.FunctionComponent<ButtonProps> = ({ ...props }) => {
    const { setOrderForm, orderForm } = useOrderForm()
    const handles = useCssHandles(CSS_HANDLES)

    const { state } = useContext(ModalContext)
    const { dispatch: generalDispatch } = useContext(GeneralContext)

    const [
        addToCart,
        { error: addToCartError, loading: addToCartLoading },
    ] = useMutation(ADD_TO_CART)

    const [
        updateItems,
        { error: updateItemsError, loading: updateItemsLoading },
    ] = useMutation(UPDATE_ITEMS)


    useEffect(() => {
        if (addToCartError) {
            generalDispatch({ type: 'SET_LOADING', payload: false })
            generalDispatch({ type: "SET_ERROR", payload: { error: true, message: 'Ocurrió un error, inténtelo nuevamente' } })
        }
        if (addToCartLoading) generalDispatch({ type: "SET_LOADING", payload: true })
    }, [addToCartError, addToCartLoading])


    useEffect(() => {
        if (updateItemsError) generalDispatch({ type: "SET_ERROR", payload: { error: true, message: 'Ocurrió un error, inténtelo nuevamente' } })
        if (updateItemsLoading) generalDispatch({ type: 'SET_LOADING', payload: true })
    }, [updateItemsError, updateItemsLoading])

    const handleChangeSku = async () => {
        generalDispatch({ type: "SET_LOADING", payload: true })
        const itemToDelete = orderForm.items.find((orderItem: any) => {
            return orderItem.id === state.activeSku.id
        })

        if (state.selectedSize.itemId === state.activeSku.id && state.activeSku.quantity === state.quantity) {
            generalDispatch({
                type: "SET_ERROR", payload: {
                    error: true,
                    message: "Ya tenes este ítem en el carrito"
                }
            })
            return
        }

        if (state.selectedSize.itemId === state.activeSku.id) {
            //TODO: ver por qué no actualiza el quantity en el orderForm
            const updateItem = await updateItems({
                variables: {
                    orderItems: [
                        {
                            uniqueId: itemToDelete.uniqueId,
                            quantity: state.quantity
                        }
                    ]
                }
            })
            setOrderForm(updateItem.data.updateItems)
            return
        }

        await addToCart({
            variables: {
                items: [
                    {
                        id: Number(state.selectedSize.itemId),
                        index: 1,
                        quantity: state.quantity,
                        seller: "1",
                        options: []
                    }
                ]
            },
        })

        //item to delete
        const deleteItem = await updateItems({
            variables: {
                orderItems: [
                    {
                        uniqueId: itemToDelete.uniqueId,
                        quantity: 0
                    }
                ]
            }
        })

        if (deleteItem.data) {
            setOrderForm(deleteItem.data.updateItems)
            // generalDispatch({ type: 'SET_LOADING', payload: false })
        }
    }

    const isValid = () => {
        return !state.selectedSize.itemId || state.selectedSize.itemId === state.activeSku.id && state.activeSku.quantity === state.quantity
    }

    return (
        <>
            <button
                className={`heading-6 ${handles.Button} ${isValid () ? handles['Button--disabled']: ''}`}
                onClick={handleChangeSku}
                {...props}
                disabled={isValid()}
            >
                guardar
            </button>
        </>
    )
}


export default Button
