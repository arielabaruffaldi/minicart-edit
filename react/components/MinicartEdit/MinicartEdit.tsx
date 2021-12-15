import React, { useEffect, useContext } from 'react';

import { useItemContext } from 'vtex.product-list/ItemContext';
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { addToCart as ADD_TO_CART } from 'vtex.checkout-resources/Mutations'

import getProduct from './../../graphql/getProduct.gql';

import { useLazyQuery, useMutation } from 'react-apollo';
import ColorPicker from '../ColorPicker/ColorPicker';
import { ModalContext } from '../../store/context/ModalContext';
import SizePicker from '../SizePicker/SizePicker';





const MinicartEdit = () => {
    const { item } = useItemContext()
    const { state, dispatch } = useContext(ModalContext)
    const { setOrderForm, orderForm } = useOrderForm()

    const [
        addToCart,
        { data: mutationData, error: mutationError, loading: mutationLoading },
    ] = useMutation(ADD_TO_CART)

    useEffect(() => {
        if (mutationData) console.log("mutationData", mutationData)
        if (mutationError) console.log("mutationError", mutationError)
        if (mutationLoading) console.log("mutationLoading", mutationLoading)
    }, [mutationError, mutationLoading])

    const handleChangeSku = async () => {
        const mutationResult = await addToCart({
            variables: {
                items: [{
                    id: Number(state.selectedSize.itemId),
                    index: 1,
                    quantity: 1,
                    seller: "1",
                    options: []
                }]
            },
        })

        mutationResult.data && setOrderForm(mutationResult.data.addToCart)

        //'{"items":[{"id":2,"index":0,"quantity":1,"seller":"1","options":[]}],"marketingData":{},"allowedOutdatedData":["paymentData"]}'

        //'{"items":{"id":19,"index":1,"quantity":1}}'

        /* 
        id: Number.parseInt(item.skuId),
        index: item.index,
        seller: item.seller,
        quantity: item.quantity,
        options: item.options,
         */
        console.log("mutationResult", mutationResult)
    }

    const [getProductQuery, { data: productData, loading: productLoading, error: productError }] = useLazyQuery(
        getProduct
    )
    console.log("orderForm---", orderForm)

    useEffect(() => {
        if (item) {
            console.log("entro aca")
            dispatch({ type: 'SET_ACTIVE_SKU', payload: item })

            getProductQuery({
                variables: {
                    productId: Number(item.productId)
                }
            })
        }
    }, [item])

    useEffect(() => {
        if (productData) {
            dispatch({ type: 'SET_PRODUCT', payload: productData.productsByIdentifier[0] })
        }
        if (productLoading) console.log("loading", productLoading)
        if (productError) console.log("productError", productError)
    }, [productData, productLoading, productError])

    useEffect(() => {
        console.log("ACA", state.product)
        const colors = state.product?.skuSpecifications?.find((item: any) => item.field.name === 'Color'
        )
        if (colors) dispatch({
            type: 'SET_COLORS', payload: colors.values
        })
    }, [state.product])

    useEffect(() => {
        if (state.selectedColor) {
            console.log("entr aca", state.product?.items)
            const availableSizesPerColor = state.product.items.filter((sku: any) => {
                console.log("sku--", sku)
                const color = sku.variations.find((item: any) => item.name === 'Color')
                console.log("color--", color)
                console.log("state.selectedColor--", state.selectedColor)

                return color.values[0] === state.selectedColor
            })
            dispatch({ type: "SET_AVAILABLES_SKUS_PER_COLOR", payload: availableSizesPerColor })
            console.log("availableSizesPerColor", availableSizesPerColor)
        }
    }, [state.selectedColor])

    console.log("state----", state)
    console.log("item----", item)
    return (
        <>
            <h3>Editar</h3>
            {
                state.activeSku &&
                <>
                    {
                        state.activeSku?.imageUrls &&
                        Object.values(state.activeSku?.imageUrls)?.map((image: any, index: number) => {
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