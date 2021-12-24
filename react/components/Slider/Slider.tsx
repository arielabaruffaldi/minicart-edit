import React, { useContext } from 'react';
import SwiperCore, { Thumbs, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useCssHandles } from 'vtex.css-handles'

import { ModalContext } from '../../store/context/ModalContext';
import './swiper.global.css';
import './styles.global.css';

SwiperCore.use([Thumbs, Navigation])

const CSS_HANDLES = ['Slider--container']


const Slider: any = () => {
    const { state } = useContext(ModalContext)
    const handles = useCssHandles(CSS_HANDLES)

    return (
        <Swiper
            spaceBetween={10}
            className={handles['Slider--container']}
            slidesPerView="auto"
            breakpoints={{
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    navigation: false
                }
            }}
        >
            {state.images.map((image: any, index: number) => {
                return (
                    <SwiperSlide>
                        <img key={index} src={image} alt={image} />
                    </SwiperSlide>

                )
            })}
        </Swiper>


        /*      <SliderLayout
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
      */

    )
}

export default Slider;