import React, { useContext } from 'react';
// import { SliderLayout } from 'vtex.slider-layout'
// import { ModalContext } from '../../store/context/ModalContext';
// import { Slider } from 'vtex.store-components'

import SwiperCore, { Thumbs, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ModalContext } from '../../store/context/ModalContext';

SwiperCore.use([Thumbs, Navigation, Pagination])


const Slider: any = () => {
    const { state } = useContext(ModalContext)

    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {state.images.map((image: any, index: number) =>
                <SwiperSlide
                    key={`slider-${index}`}
                >
                    <img src={image} alt={image} />
                </SwiperSlide>

            )}

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