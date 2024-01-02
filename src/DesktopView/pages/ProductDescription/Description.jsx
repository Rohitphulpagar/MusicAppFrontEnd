import React, { useEffect, useState } from "react";
import { productDetail } from "../../../apis/productDesApi";
import { Link, useParams } from "react-router-dom";
import design from "./description.module.css";
import Header from "../../component/header/Header";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../../asset/musiclogo.png";
import { GoStarFill } from "react-icons/go";
import { addTocart } from "../../../apis/postCartApi";
import { useHistory } from "react-router-use-history";
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
    } catch (error) {
      console.log(error);
    }
  };
  const checkout = () => {
    history.push("/buyCheckout", { product: productDesc });
  };
  return (
    <div className={design.descriptionPage}>
      <Header />
      <div className={design.titleSec}>
        <div className={design.titles}>
          <div className={design.titleLogo}>
            <Link className={design.links} to="/">
              {" "}
              <span>
                <img src={logo} alt="logo" />
              </span>
              <span className={design.appName}>Musicart</span>
            </Link>
            <span className={design.homelink}>
              <Link className={design.links} to="/">
                Home
              </Link>
              &nbsp;/ {productDesc.productName}
            </span>
          </div>

          {token ? (
            <div className={design.cartbtn}>
              <Link to="/cart" className={design.link}>
                <span>
                  <FaShoppingCart /> View Cart
                </span>
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Link className={design.link} to="/">
        <div className={design.homebtn}>Back to products</div>
      </Link>
      <div className={design.pdname}>
        <div>{productDesc.productDetails}</div>
      </div>
      <div className={design.sections}>
        <div className={design.descPart}>
          <div className={design.imgSec}>
            <div className={design.pdImg}>
              {" "}
              <img src={productDesc.productImage} alt="img" />
            </div>
            <div className={design.featuredImg}>
              <div className={design.imgFeature}>
                <img src={productDesc.useproductImg} alt="img" />
              </div>
              <div className={design.imgFeature}>
                <img src={productDesc.rightSideView} alt="img" />
              </div>
              <div className={design.imgFeature}>
                <img src={productDesc.leftSideView} alt="img" />
              </div>
            </div>
          </div>
          <div className={design.desc}>
            <div className={design.pdName}>
              <h1>{productDesc.productName}</h1>
            </div>
            <div className={design.ratingSec}>
              <span>
                <GoStarFill className={design.star} />
                <GoStarFill className={design.star} />
                <GoStarFill className={design.star} />
                <GoStarFill className={design.star} />
                <GoStarFill className={design.star} />
              </span>
              <span className={design.rating}>
                ({productDesc.customerReview})
              </span>
            </div>
            <div className={design.price}>
              Price - &#8377; {productDesc.productPrice}
            </div>

            <div className={design.pdColor}>
              <span>
                {productDesc.productColor} | {productDesc.productType}
              </span>
            </div>
            <div className={design.about}>
              <p>About this item</p>
              <ul>
                {productDesc.productSpecification &&
                  productDesc.productSpecification.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
              </ul>
            </div>
            <div className={design.stocks}>
              <span className={design.available}>Available- </span>
              {productDesc.isAvailable ? (
                <span>In Stock</span>
              ) : (
                <span>Out of Stock</span>
              )}
            </div>
            <div className={design.brand}>
              <span className={design.brandName}>Brand - </span>
              <span>{productDesc.companyName}</span>
            </div>
            <br />
            <br />
            <div className={design.btns}>
              {token ? (
                <div>
                  <button
                    onClick={() => addTocarts(productDesc._id)}
                    className={design.addbtn}
                  >
                    Add to cart
                  </button>
                  <br />
                  <br />

                  <button onClick={checkout} className={design.buybtn}>
                    Buy Now
                  </button>
                </div>
              ) : (
                <span className={design.logss}>
                  <Link className={design.links} to="/login">
                    Login
                  </Link>
                  &nbsp; /
                  <Link className={design.links} to="/register">
                    Sign up
                  </Link>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
