import React, { useContext } from 'react'
import { ModalContext } from '../../store/context/ModalContext';
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { GeneralContext } from '../../store/context/GeneralContext';

interface SizePickerProps {
    availableSkusPerColor: any[]
}

const CSS_HANDLES = ['sizePicker', 'sizePicker--title', 'size', 'size--selected']


const SizePicker: React.FunctionComponent<SizePickerProps> = ({ availableSkusPerColor }) => {
    const { state, dispatch } = useContext(ModalContext)
    const { dispatch: generalDispatch } = useContext(GeneralContext)
    const handles = useCssHandles(CSS_HANDLES)

    const flattenSizes = availableSkusPerColor.reduce((accumulated, current): any => {
        return [
            ...accumulated,
            (accumulated = {
                itemId: current.itemId,
                size: current.variations.find((item: any) => item.name === 'Talle').values[0],
            }),
        ];
    }, []);

    const handleSizeChange = (item: any) => {
        dispatch({ type: "SET_SELECTED_SIZE", payload: item })
        generalDispatch({ type: "SET_ERROR", payload: { error: false, message: "" } })
    }

    return (
        <>
            <h5 className={handles['sizePicker--title']}>Talle</h5>
            <div className={handles.sizePicker}>
                {flattenSizes.map((item: any, index: any) =>
                    <span
                        key={index}
                        className={`${state.selectedSize.size == item.size ? handles['size--selected'] : ''} ${applyModifiers(handles.size, item.size.toLowerCase())}`}
                        onClick={() => handleSizeChange(item)}
                    >
                        {item.size}
                    </span>
                )}
            </div>
        </>
    )
}


export default SizePicker
