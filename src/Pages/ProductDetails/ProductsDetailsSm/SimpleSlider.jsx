import React from "react";
import Slider from "react-slick";
import style from "./SimpleSlider.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useProductContext from "../../../Hooks/useProductContext";

export default function SimpleSlider() {
  const { item } = useProductContext();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <div className={style.sliderContainer}>
        <Slider {...settings}>
          <div className={style.imageContainer}>
            <img src={item?.images[0]} />
          </div>
          <div className={style.imageContainer}>
            <img src={item?.images[1]} />
          </div>
          <div className={style.imageContainer}>
            <img src={item?.images[2]} />
          </div>
          <div className={style.imageContainer}>
            <img src={item?.images[3]} />
          </div>
        </Slider>
      </div>
    </div>
  );
}
