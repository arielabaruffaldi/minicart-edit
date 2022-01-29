import React, { useEffect, useContext, useState } from 'react'
import { ModalContext } from '../../store/context/ModalContext';
import { useCssHandles, applyModifiers } from 'vtex.css-handles';
import { GeneralContext } from '../../store/context/GeneralContext';
import { Swiper, SwiperSlide } from "swiper/react";
import { useRuntime } from 'vtex.render-runtime'

interface SizePickerProps {
    availableSkusPerColor: any[]
}

const CSS_HANDLES = ['sizePicker', 'sizePicker--title', 'size', 'size--selected']


const SizePicker: React.FunctionComponent<SizePickerProps> = ({ availableSkusPerColor }) => {
    const [activeIndex, setActveIndex] = useState(0);
    const { deviceInfo } = useRuntime();
    const slidesPerView = deviceInfo.isMobile ? 15 : 8;
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
    useEffect(() => {
        const arrowNext = document.getElementsByClassName('swiper-button-next')[0];
        if (activeIndex === 1 || flattenSizes.length / slidesPerView < 1) {
            arrowNext.classList.add('hide')
        } else {
            arrowNext.classList.remove('hide')
        }
    }, [activeIndex, flattenSizes])


  

    const handleSizeChange = (item: any) => {
        dispatch({ type: "SET_SELECTED_SIZE", payload: item })
        generalDispatch({ type: "SET_ERROR", payload: { error: false, message: "" } })
    }

    return (
        <>
            <h5 className={handles['sizePicker--title']}>Talle</h5>
            <div className={handles.sizePicker}>
                <Swiper
                    slidesPerView={slidesPerView}
                    breakpoints={{
                        768: {
                            spaceBetween: 10,
                            navigation: false
                        }
                    }}
                    className='size-picker-swiper'
                    centeredSlides={false}
                    navigation
                    onSlideChange={(slide) => {
                        setActveIndex(slide.activeIndex)
                    }}
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
