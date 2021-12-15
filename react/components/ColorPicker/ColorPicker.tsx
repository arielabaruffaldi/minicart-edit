import React, { useContext } from 'react'
import { ModalContext } from '../../store/context/ModalContext'

interface ColorPickerProps {
    colors: Color[]
}

interface Color {
    name: string
    values: string[]
}

const ColorPicker: React.FunctionComponent<ColorPickerProps> = ({ colors }) => {
    const { state, dispatch } = useContext(ModalContext)
    
    return (
        <>
            {colors.map((item, index) =>
                <span
                    key={index}
                    className={item.name === state.selectedColor ? 'selected' : ''}
                    onClick={() => dispatch({ type: "SET_SELECTED_COLOR", payload: item.name })}>{item.name}</span>
            )}
        </>
    )
}


export default ColorPicker
