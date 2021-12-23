import React, { useContext } from 'react';
import { SliderLayout } from 'vtex.slider-layout'
import { ModalContext } from '../../store/context/ModalContext';


const Slider = () => {
    const { state } = useContext(ModalContext)

    return (
        <SliderLayout
            itemsPerPage={{
                desktop: 2,
                phone: 4,
            }}
            showNavigationArrows="always"
            centerMode="to-the-left"
            centerModeSlidesGap={15}
            showPaginationDots="never"
            fullWidth={false}
            infinite={false}
            blockClass="home-bottom-cats"
        >
            {state.images.map((image: any, index: number) => {
                return (
                    <img key={index} src={image} alt={image} />
                )
            })}
        </SliderLayout>
    )
}

export default Slider;