import React, { useEffect, useContext } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { addToCart as ADD_TO_CART, updateItems as UPDATE_ITEMS } from 'vtex.checkout-resources/Mutations'

import { useMutation } from 'react-apollo';
import { ModalContext } from '../../store/context/ModalContext';
import { GeneralContext } from '../../store/context/GeneralContext';

const CSS_HANDLES = ['Button']

interface ButtonProps {
}

const Button: React.FunctionComponent<ButtonProps> = ({ ...props }) => {
    const { setOrderForm, orderForm } = useOrderForm()
    const handles = useCssHandles(CSS_HANDLES)

    const { state } = useContext(ModalContext)
    const { state: generalState, dispatch: generalDispatch } = useContext(GeneralContext)

    const [
        addToCart,
        { error: addToCartError, loading: addToCartLoading },
    ] = useMutation(ADD_TO_CART)

    const [
        updateItems,
        { error: updateItemsError, loading: updateItemsLoading },
    ] = useMutation(UPDATE_ITEMS)


    useEffect(() => {
        if (addToCartError) generalDispatch({ type: "SET_ERROR", payload: { error: true, message: 'Ocurrió un error, inténtelo nuevamente' } })
        if (addToCartLoading) generalDispatch({ type: "SET_LOADING", payload: true })

    }, [addToCartError, addToCartLoading])


    useEffect(() => {
        if (updateItemsError) console.log("updateItemsError", updateItemsError)
        if (updateItemsLoading) console.log("updateItemsLoading", updateItemsLoading)
    }, [updateItemsError, updateItemsLoading])

    const handleChangeSku = async () => {
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
            console.log("ENTRO ACA PERON")
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
            console.log("updateItem", updateItem)
            return
        }

        console.log("state.quantity", state.quantity)

        const addToCartRes = await addToCart({
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

        console.log("addToCartRes", addToCartRes)

        

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

        deleteItem.data && setOrderForm(deleteItem.data.updateItems)
    }


    return (
        <>
            {generalState.error.error &&
                <p>{generalState.error.message}</p>
            }
            <button
                className={`heading-6 ${handles.Button}`}
                onClick={handleChangeSku}
                {...props}
            >
                guardar
            </button>
        </>
    )
}


export default Button
