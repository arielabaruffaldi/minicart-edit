import React, { useEffect, useContext } from 'react';

import { useItemContext } from 'vtex.product-list/ItemContext';
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { addToCart as ADD_TO_CART, updateItems as UPDATE_ITEMS } from 'vtex.checkout-resources/Mutations'

import getProduct from './../../graphql/getProduct.gql';

import { useLazyQuery, useMutation } from 'react-apollo';
import ColorPicker from '../ColorPicker/ColorPicker';
import { ModalContext } from '../../store/context/ModalContext';
import SizePicker from '../SizePicker/SizePicker';


const MinicartEdit = () => {
    const { item } = useItemContext()
    const { state, dispatch } = useContext(ModalContext)
    const { setOrderForm, orderForm } = useOrderForm()

    console.log("item---", item)

    const [
        addToCart,
        { error: mutationError, loading: mutationLoading },
    ] = useMutation(ADD_TO_CART)

    const [
        updateItems,
        { error: updateItemsError, loading: updateItemsLoading },
    ] = useMutation(UPDATE_ITEMS)

    useEffect(() => {
        if (mutationError) console.log("mutationError", mutationError)
        if (mutationLoading) console.log("mutationLoading", mutationLoading)
    }, [mutationError, mutationLoading])

    useEffect(() => {
        if (updateItemsError) console.log("updateItemsError", updateItemsError)
        if (updateItemsLoading) console.log("updateItemsLoading", updateItemsLoading)
    }, [updateItemsError, updateItemsLoading])

    const handleChangeSku = async () => {
        const itemToDelete = orderForm.items.find((orderItem: any) => {
            return orderItem.id === state.activeSku.id
        })


        await addToCart({
            variables: {
                items: [
                    {
                        id: Number(state.selectedSize.itemId),
                        index: 1,
                        quantity: 1,
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

        deleteItem.data && setOrderForm(deleteItem.data.updateItems)
    }

    const [getProductQuery, { data: productData, loading: productLoading, error: productError }] = useLazyQuery(
        getProduct
    )

    useEffect(() => {
        if (item) {
            dispatch({ type: 'SET_ACTIVE_SKU', payload: item })
            const images = Object.values(item.imageUrls)

            dispatch({ type: "SET_IMAGES", payload: images })

            getProductQuery({
                variables: {
                    productId: Number(item.productId)
                }
            })
        }
    }, [item])

    console.log("State", state)

    useEffect(() => {
        if (productData) {
            console.log("productData", productData)
            console.log("active item.id", item.id)
            dispatch({ type: 'SET_PRODUCT', payload: productData.productsByIdentifier[0] })
            
            const product = productData.productsByIdentifier[0].items.find((product: any)=>product.itemId === item.id)

            const images = product.images.reduce((accumulated: any, current: any) => [
                ...accumulated,
                accumulated = current.imageUrl
            ], [])
            dispatch({ type: 'SET_IMAGES', payload: images })

        }
        if (productLoading) console.log("loading", productLoading)
        if (productError) console.log("productError", productError)
    }, [productData, productLoading, productError])

    useEffect(() => {
        const colors = state.product?.skuSpecifications?.find((item: any) => item.field.name === 'Color'
        )
        if (colors) dispatch({
            type: 'SET_COLORS', payload: colors.values
        })
    }, [state.product])

    useEffect(() => {
        if (state.selectedColor) {
            const availableSizesPerColor = state.product.items.filter((sku: any) => {
                const color = sku.variations.find((item: any) => item.name === 'Color')
                return color.values[0] === state.selectedColor
            })

            const images = availableSizesPerColor[0].images.reduce((accumulated: any, current: any) => [
                ...accumulated,
                accumulated = current.imageUrl
            ], [])

            images.length && dispatch({ type: "SET_IMAGES", payload: images })

            dispatch({ type: "SET_AVAILABLES_SKUS_PER_COLOR", payload: availableSizesPerColor })
        }
    }, [state.selectedColor])


    return (
        <>
            <h3>Editar</h3>
            {
                state.activeSku &&
                <>
                    {
                        state.images &&
                        state.images.map((image: any, index: number) => {
                            if (index === state.activeSku?.imageUrls.length - 1) return
                            return <img key={index} src={image} alt={image} />
                        })
                    }
                    {
                        //TODO: usar el list-price de vtex-apps
                        <h3>{state.activeSku.price}</h3>
                    }
                    <ColorPicker colors={state.colors} />
                    <SizePicker availableSkusPerColor={state.availableSkusPerColor} />
                    <button onClick={() => handleChangeSku()} />
                </>
            }

        </>
    )
}

export default MinicartEdit;