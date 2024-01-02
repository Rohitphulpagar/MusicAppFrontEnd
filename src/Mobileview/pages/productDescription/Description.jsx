import React, { useEffect, useRef, useState } from "react";
import { productDetail } from "../../../apis/productDesApi";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-use-history";
import { addTocart } from "../../../apis/postCartApi";
import style from "./description.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../../component/header/Header";
import Footer from "../../component/userFooter/UserFooter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slick-custom.css";
import { GoStarFill } from "react-icons/go";
import SwipperBtn from "./SwipperBtn";
function Description() {
  const [productDesc, setProductDesc] = useState([]);
  const { productId } = useParams();
  const history = useHistory();
  useEffect(() => {
    const getDetails = async () => {
      try {
        const data = await productDetail(productId);
        setProductDesc(data);
      } catch (error) {
        console.log("error while fetching data", error);
      }
    };
    getDetails();
  }, [productId]);
  const token = localStorage.getItem("token");
  const addTocarts = async (productId) => {
    try {
      const quantity = 1;
      const responseData = await addTocart(productId, quantity);
      console.log(responseData);
      history.push("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className={style.descPage}>
        <div className={style.descPages}>
          <Link className={style.links} to="/">
            <div className={style.images}>
              <FaArrowLeft className={style.arrowlogo} />
            </div>
          </Link>
          {token ? (
            <div className={style.buy}>
              <button onClick={() => addTocarts(productDesc._id)}>
                Buy Now
              </button>
            </div>
          ) : (
            <div className={style.buy}></div>
          )}

          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            <div className={style.sliderPart}>
              <SwiperSlide>
                <img
                  className={style.sliders}
                  src={productDesc.productImage}
                  alt="Imag"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  className={style.sliders}
                  src={productDesc.useproductImg}
                  alt="productImg"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  className={style.sliders}
                  src={productDesc.leftSideView}
                  alt="view"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  className={style.sliders}
                  src={productDesc.rightSideView}
                  alt="rightview"
                />
              </SwiperSlide>
            </div>

            <SwipperBtn />
          </Swiper>
        </div>
        <div className={style.details}>
          <div className={style.desc}>
            <div className={style.pdName}>
              <h1>{productDesc.productName}</h1>
            </div>
            <div className={style.ratingSec}>
              <span>
                <GoStarFill className={style.star} />
                <GoStarFill className={style.star} />
                <GoStarFill className={style.star} />
                <GoStarFill className={style.star} />
                <GoStarFill className={style.star} />
              </span>
              <span className={style.rating}>
                ({productDesc.customerReview})
              </span>
            </div>
            <div className={style.prodDetails}>
              {productDesc.productDetails}
            </div>

            <div className={style.pdColor}>
              <span>
                {productDesc.productColor} | {productDesc.productType}
              </span>
            </div>
            <div className={style.about}>
              <p>About this item</p>
              <ul>
                {productDesc.productSpecification &&
                  productDesc.productSpecification.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
              </ul>
            </div>
            <div className={style.stocks}>
              <span className={style.available}>Available- </span>
              {productDesc.isAvailable ? (
                <span>In Stock</span>
              ) : (
                <span>Out of Stock</span>
              )}
            </div>
            <div className={style.brand}>
              <span className={style.brandName}>Brand - </span>
              <span>{productDesc.companyName}</span>
            </div>
            <br />
            <br />
            <div className={style.btns}>
              {token ? (
                <div>
                  <button
                    onClick={() => addTocarts(productDesc._id)}
                    className={style.addbtn}
                  >
                    Add to cart
                  </button>
                  <br />
                  <br />

                  <button
                    onClick={() => addTocarts(productDesc._id)}
                    className={style.buybtn}
                  >
                    Buy Now
                  </button>
                </div>
              ) : (
                <span className={style.logss}>
                  <Link className={style.links} to="/login">
                    Login
                  </Link>
                  &nbsp; /&nbsp;
                  <Link className={style.links} to="/register">
                    Sign up
                  </Link>
                </span>
              )}
            </div>
          </div>
        </div>
        <br />

        <br />
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
}

export default Description;
