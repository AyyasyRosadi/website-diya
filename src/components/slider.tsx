import React, { ReactNode } from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "./slick.css"


function Slide({ children }: { children: ReactNode }) {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        dotsClass: "button__bar",
        arrows: false,
    }
    return (
        <div className='w-full h-full'>
            <Slider {...settings} className="mx-auto">
                {children}
            </Slider>
        </div>
    )
}

export default Slide