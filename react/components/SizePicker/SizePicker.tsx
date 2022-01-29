import React, { useContext } from 'react'
import { ModalContext } from '../../store/context/ModalContext';
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { GeneralContext } from '../../store/context/GeneralContext';
import { Swiper, SwiperSlide } from "swiper/react";

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
        ].sort((a, b) => a.size - b.size)
    }, []);

    const handleSizeChange = (item: any) => {
        dispatch({ type: "SET_SELECTED_SIZE", payload: item })
        generalDispatch({ type: "SET_ERROR", payload: { error: false, message: "" } })
    }

    return (
        <>
            <h5 className={handles['sizePicker--title']}>Talle</h5>
            <div className={handles.sizePicker}>
                <Swiper
                    slidesPerView={15}
                    breakpoints={{
                        768: {
                            spaceBetween: 10,
                            navigation: false,
                            slidesPerView: 6
                        }
                    }}
                    className='size-picker-swiper'
                    centeredSlides={false}
                    navigation
                    scrollbar={{ draggable: true }}
                >
                    {flattenSizes.map((item: any, index: any) =>
                        <SwiperSlide
                            key={index}
                            className={`${state.selectedSize.size == item.size ? handles['size--selected'] : ''} ${applyModifiers(handles.size, item.size.toLowerCase())}`}
                            onClick={() => handleSizeChange(item)}
                        >
                            {item.size}
                        </SwiperSlide>
                    )}
                </Swiper>

            </div>
        </>
    )
}


export default SizePicker
