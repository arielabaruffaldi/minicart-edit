import React, { useContext, useEffect } from 'react'
import { ModalContext } from '../../store/context/ModalContext'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

interface ColorPickerProps {
    colors: Color[]
}

interface Color {
    name: string
    values: string[]
}

const CSS_HANDLES = ['colorPicker', 'colorPicker--title', 'color', 'color--selected']
const ColorPicker: React.FunctionComponent<ColorPickerProps> = ({ colors }) => {
    const { state, dispatch } = useContext(ModalContext)
    const handles = useCssHandles(CSS_HANDLES)

    useEffect(() => {
        if (state.activeSku.skuSpecifications) {
            const colorSpecification = state.activeSku.skuSpecifications?.find((item: any) => item.fieldName === "Color")
            const sizeSpecification = state.activeSku.skuSpecifications?.find((item: any) => item.fieldName === "Talle")
            dispatch({ type: "SET_SELECTED_COLOR", payload: colorSpecification.fieldValues[0] })
            dispatch({ type: "SET_SELECTED_SIZE", payload: { itemId: state.activeSku.id, size: sizeSpecification.fieldValues[0] } })
        }
    }, [state.activeSku])

    const onColorChange = (item: any) => {
        dispatch({ type: "SET_SELECTED_COLOR", payload: item.name })
        dispatch({ type: "SET_SELECTED_SIZE", payload: {} })
    }

    return (
        <>
            <h5 className={handles['colorPicker--title']}>Color</h5>
            <div className={handles.colorPicker}>
                {colors.map((item, index) =>
                    <>
                        <div
                            key={index}
                            className={`${item.name === state.selectedColor ? handles['color--selected'] : ''} ${applyModifiers(handles.color, item.name.toLowerCase())}`}
                            onClick={() => onColorChange(item)}>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}


export default ColorPicker
