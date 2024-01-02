import React, { useEffect, useState } from "react";
import style from "./productlist.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { useHistory } from "react-router-use-history";
import Footer from "../../component/userFooter/UserFooter";
import { productData } from "../../../apis/productApi";
import { addTocart } from "../../../apis/postCartApi";
import poster from "../../../asset/poster.png";
import { FaChevronDown } from "react-icons/fa";
function ProductList() {
  const token = localStorage.getItem("token");
  const history = useHistory();
  const clickOnCart = () => {
    if (token) {
      history.push("/cart");
    } else {
      history.push("/login");
    }
  };
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    productName: "",
    productType: "",
    productColor: "",
    productPriceMin: "",
    productPriceMax: "",
    sort: "",
  });
  const checkDescription = (productId) => {
    history.push(`/products/${productId}`);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await productData(filter);
        setProducts(data);
      } catch (error) {
        console.error("Error while fetching data", error);
      }
    };
    getData();
  }, [filter]);

  const FilterData = async () => {
    try {
      const data = await productData(filter);
      setProducts(data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };
  const handleFilter = (newFilters) => {
    setFilter(newFilters);
  };
  const addTocarts = async (productId) => {
    try {
      const quantity = 1;
      const responseData = await addTocart(productId, quantity);
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.productPage}>
      <div className={style.headers}>
        <div>
          <input
            placeholder="Q Search Musicart"
            onChange={(e) =>
              setFilter({ ...filter, productName: e.target.value })
            }
          />
        </div>
      </div>
      <div className={style.poster}>
        <div>
          <img src={poster} alt="img" />
        </div>
      </div>
      <div className={style.selectionsec}>
        <div className={style.selections}>
          <div className={style.selectSort}>
            <select
              value={filter.sort || ""}
              onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
            >
              <option value="" disabled hidden>
                Sort by
              </option>
              <option value="">Featured</option>
              <option value="priceLowToHigh">Price: Lowest</option>
              <option value="priceHighToLow">Price: Highest</option>
              <option value="AtoZ">Name:(A-Z)</option>
              <option value="ZtoA">Name:(Z-A)</option>
            </select>
          </div>
          <div className={style.otherSelectSort}>
            <span className={style.selectSect}>
              <span className={style.selectType}>
                <select
                  value={filter.productType || ""}
                  onChange={(e) =>
                    setFilter({ ...filter, productType: e.target.value })
                  }
                >
                  <option className={style.op} value="" disabled hidden>
                    Headphone type
                  </option>
                  <option value="">Featured </option>
                  <option value="In-ear headphone">In-ear headphone</option>
                  <option value="On-ear headphone">On-ear headphone</option>
                  <option value="Over-ear headphone">Over-ear headphone</option>
                </select>
              </span>

              <span className={style.selectName}>
                <select
                  value={filter.productName || ""}
                  onChange={(e) =>
                    setFilter({ ...filter, productName: e.target.value })
                  }
                >
                  <option value="" disabled hidden>
                    Company
                  </option>
                  <option value="">Featured</option>
                  <option value="JBL">JBL</option>
                  <option value="Sony">Sony</option>
                  <option value="Boat">Boat</option>
                  <option value="Zebronics">Zebronics</option>
                  <option value="Marshall">Marshall</option>
                  <option value="Ptron">Ptron</option>
                </select>
              </span>
              <span className={style.selectColor}>
                <select
                  value={filter.productColor || ""}
                  onChange={(e) =>
                    setFilter({ ...filter, productColor: e.target.value })
                  }
                >
                  <option value="" disabled hidden>
                    Color
                  </option>
                  <option value="">Featured</option>
                  <option value="Blue">Blue</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Brown">Brown</option>
                  <option value="Red">Red</option>
                </select>
              </span>
              <span className={style.selectPrice}>
                <select
                  value={`${filter.productPriceMin || ""}-${
                    filter.productPriceMax || ""
                  }`}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split("-");
                    setFilter({
                      ...filter,
                      productPriceMin: min !== "" ? parseInt(min, 10) : 0,
                      productPriceMax: max !== "" ? parseInt(max, 10) : 0,
                    });
                  }}
                >
                  <optgroup disabled hidden>
                    <option value="">Price</option>
                  </optgroup>
                  <option value="">Featured</option>
                  <option value="0-1000">&#x20B9; 100 - 1000</option>
                  <option value="1001-3000">&#x20B9; 1000 - 3000</option>
                  <option value="3001-4000">&#x20B9; 3000 - 4000</option>
                  <option value="4001-8000">&#x20B9; 4000 - 8000</option>
                </select>
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className={style.allProductSection1}>
        <div className={style.allProductSection2}>
          {products.map((product, index) => (
            <div className={style.productDiv} key={index}>
              <div className={style.productImg}>
                <img
                  onClick={() => checkDescription(product._id)}
                  src={product.productImage}
                  alt="img"
                />
                {token ? (
                  <span onClick={() => addTocarts(product)}>
                    <MdAddShoppingCart className={style.addcart} />
                  </span>
                ) : (
                  <div className={style.empty}></div>
                )}
              </div>
              <div className={style.design}>
                <h4>{product.productName}</h4>
                <p>Price - &#x20B9; {product.productPrice}</p>
                <span>
                  <p>
                    {product.productColor} | {product.productType}
                  </p>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default ProductList;
