import React, { PropsWithChildren } from 'react';
import SwiperCore, { Thumbs, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useCssHandles } from 'vtex.css-handles'

import './swiper.global.css';
import './styles.global.css';

SwiperCore.use([Thumbs, Navigation])

const CSS_HANDLES = ['Slider--container', 'Slider--item']


const Slider: any = ({ children, spaceBetween = 0, className }: PropsWithChildren<any>) => {
    const handles = useCssHandles(CSS_HANDLES)
    return (
        <Swiper
            spaceBetween={spaceBetween}
            className={`${handles['Slider--container']} ${className || ''}`}
            slidesPerView={2}
            breakpoints={{
                768: {
                    slidesPerView: 2,
                    spaceBetween: spaceBetween,
                    navigation: false
                }
            }}
        >
            {children.map((item: any, index: number) => <SwiperSlide className={handles['Slider--item']} key={index}>{item}</SwiperSlide>)}
        </Swiper>
    )
}

export default Slider;