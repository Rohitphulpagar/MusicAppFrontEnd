import React from "react";
import { useSwiper } from "swiper/react";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";
import style from "./description.module.css";
function SwipperBtn() {
  const swiper = useSwiper();
  return (
    <div className={style.navbtns}>
      <div
        onClick={() => {
          swiper.slideNext();
        }}
        className={style.nextbtn}
      >
        <BiLeftArrow className={style.nextbtns} />
      </div>
      <br />
      <div
        onClick={() => {
          swiper.slidePrev();
        }}
        className={style.prevbtn}
      >
        <BiRightArrow className={style.nextbtns} />
      </div>
    </div>
  );
}

export default SwipperBtn;
