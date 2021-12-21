import React, { useEffect, useContext } from 'react';

import { useItemContext } from 'vtex.product-list/ItemContext';

import getProduct from './../../graphql/getProduct.gql';

import { useLazyQuery } from 'react-apollo';
import ColorPicker from '../ColorPicker/ColorPicker';
import { ModalContext } from '../../store/context/ModalContext';
import SizePicker from '../SizePicker/SizePicker';
import Slider from '../Slider/Slider';

import ProductPrice from 'vtex.store-components/ProductPrice'
import ProductName from '../ProductName/ProductName';
import Button from '../Button/Button';
import { useCssHandles } from 'vtex.css-handles'
import ProductQuantity from '../ProductQuantity/ProductQuantity';

const CSS_HANDLES = ['container']

const MinicartEdit = () => {
    const { item } = useItemContext()
    const { state, dispatch } = useContext(ModalContext)
    const handles = useCssHandles(CSS_HANDLES)

    const [getProductQuery, { data: productData, loading: productLoading, error: productError }] = useLazyQuery(
        getProduct
    )

    useEffect(() => {
        if (item) {
            dispatch({ type: 'SET_ACTIVE_SKU', payload: item })
            dispatch({ type: 'SET_QUANTITY', payload: item.quantity })
            console.log("item----", item)
            getProductQuery({
                variables: {
                    productId: Number(item.productId)
                }
            })
        }
    }, [item])

    useEffect(() => {
        if (productData) {
            console.log("productData", productData)
            dispatch({ type: 'SET_PRODUCT', payload: productData.productsByIdentifier[0] })

            const product = productData.productsByIdentifier[0].items.find((product: any) => product.itemId === item.id)

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
        if (state.selectedColor && state.product.items) {
            const availableSizesPerColor = state.product.items?.filter((sku: any) => {
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
    }, [state.selectedColor, state.product])

    console.log("state", state)

    return (
        <>
            {
                state.activeSku &&
                <>
                    <Slider />
                    <div className={handles.container}>
                        <ProductPrice sellingPriceClass="c-on-base t-heading-6" sellingPrice={state.activeSku?.sellingPrice / 100} showListPrice={false} showLabels={false} />
                        <ProductName name={state.product.productName} />
                        <ColorPicker colors={state.colors} />
                        <SizePicker availableSkusPerColor={state.availableSkusPerColor} />
                        <ProductQuantity />
                        <Button />
                    </div>
                </>
            }

        </>
    )
}

export default MinicartEdit;