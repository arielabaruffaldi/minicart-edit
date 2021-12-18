import React, { useContext } from 'react'
import { ModalContext } from '../../store/context/ModalContext'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

interface ColorPickerProps {
    colors: Color[]
}

interface Color {
    name: string
    values: string[]
}

const CSS_HANDLES = ['color', 'selected']


const ColorPicker: React.FunctionComponent<ColorPickerProps> = ({ colors }) => {
    const { state, dispatch } = useContext(ModalContext)
    const handles = useCssHandles(CSS_HANDLES)

    return (
        <>
            {colors.map((item, index) =>
                <span
                    key={index}
                    className={`${item.name === state.selectedColor ? applyModifiers(handles['selected']) : ''} ${applyModifiers(handles.color, item.name.toLowerCase())}`}
                    onClick={() => dispatch({ type: "SET_SELECTED_COLOR", payload: item.name })}>
                </span>
            )}
        </>
    )
}


export default ColorPicker
