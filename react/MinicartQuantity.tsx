import React from 'react';
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['minicart-title']

const MinicartQuantity = () => {
    const { orderForm } = useOrderForm()
    const handles = useCssHandles(CSS_HANDLES)

    return (
        <h3 className={`t-heading-5 b ma0 ph6-l ${handles['minicart-title']}`}>Mi carrito ({orderForm.items?.length})</h3>
    )
}

export default MinicartQuantity;