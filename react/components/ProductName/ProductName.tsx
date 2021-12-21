import React from 'react'
import { useCssHandles } from 'vtex.css-handles'


const CSS_HANDLES = ['productName']

interface ProductNameProps {
    name: string
}

const ProductName: React.FunctionComponent<ProductNameProps> = ({ name }) => {
    const handles = useCssHandles(CSS_HANDLES)

    return (
        <h4 className={`heading-6 ${handles.productName}`}>{name}</h4>
    )
}


export default ProductName
