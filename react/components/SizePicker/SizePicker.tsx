import React, { useContext } from 'react'
import { ModalContext } from '../../store/context/ModalContext';

interface SizePickerProps {
    availableSkusPerColor: any[]
}


const SizePicker: React.FunctionComponent<SizePickerProps> = ({ availableSkusPerColor }) => {
    const { state, dispatch } = useContext(ModalContext)

    const flattenSizes = availableSkusPerColor.reduce((accumulated, current): any => {
        return [
            ...accumulated,
            (accumulated = {
                itemId: current.itemId,
                size: current.variations.find((item: any) => item.name === 'Talle').values[0],
            }),
        ];
    }, []);
    console.log("flattenSizes", flattenSizes)
    console.log("availableSkusPerColor", availableSkusPerColor)
    return (
        <>
            {flattenSizes.map((item: any, index: any) =>
                <span
                    key={index}
                    className={index + 1 === state.selectedSize ? 'selected' : ''}
                    onClick={() => dispatch({ type: "SET_SELECTED_SIZE", payload: item })}
                >
                    {item.size}
                </span>
            )}
        </>
    )
}


export default SizePicker
