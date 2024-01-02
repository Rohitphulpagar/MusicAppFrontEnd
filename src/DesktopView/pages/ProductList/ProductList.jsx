import React from "react";
import { productData } from "../../../apis/productApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../component/header/Header";
import { useHistory } from "react-router-use-history";
import productDesign from "./productlist.module.css";
import poster from "../../../asset/poster.png";
import logo from "../../../asset/musiclogo.png";
import { FaShoppingCart } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import { addTocart } from "../../../apis/postCartApi";
function ProductList() {
  const history = useHistory();
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
  const token = localStorage.getItem("token");
  const [viewMode, setViewMode] = useState("grid");
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
    <div className={productDesign.homePage}>
      <Header />
      <div className={productDesign.cartSection}>
        <div className={productDesign.cartSection1}>
          <span className={productDesign.titleSect}>
            <span className={productDesign.logoSect}>
              <img src={logo} alt="logo" />
            </span>
            <span className={productDesign.apptitle}>
              <Link className={productDesign.links} to="/">
                Musicart
              </Link>
            </span>
            <span className={productDesign.homeLink}>
              <Link className={productDesign.links1} to="/">
                Home
              </Link>
            </span>
          </span>
          {token ? (
            <span className={productDesign.cartItem}>
              <Link className={productDesign.cartlinks} to="/cart">
                <span className={productDesign.cartItem1}>
                  <FaShoppingCart />
                </span>
                <span> View Cart</span>
              </Link>
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={productDesign.posterSec}>
        <div className={productDesign.posterImg}>
          <img src={poster} alt="poster" />
        </div>
      </div>
      <div className={productDesign.inpSect}>
        <div>
          <input
            placeholder="Q Search Product"
            onChange={(e) =>
              setFilter({ ...filter, productName: e.target.value })
            }
          />
        </div>
      </div>
      <div className={productDesign.filterSect}>
        <div className={productDesign.filterSect1}>
          <div className={productDesign.filterDiv}>
            <span
              className={productDesign.gridLogo}
              onClick={() => setViewMode("grid")}
            >
              <IoGrid
                style={{
                  fill: viewMode === "grid" ? "black" : "gray",
                }}
              />
            </span>
            <span
              className={productDesign.viewLogo}
              onClick={() => setViewMode("list")}
            >
              <FaThList
                style={{
                  fill: viewMode === "list" ? "black" : "gray",
                }}
              />
            </span>
            <span className={productDesign.selectSect}>
              <span className={productDesign.selectType}>
                <select
                  value={filter.productType || ""}
                  onChange={(e) =>
                    setFilter({ ...filter, productType: e.target.value })
                  }
                >
                  <option value="" disabled hidden>
                    Headphone type
                  </option>
                  <option value="">Featured </option>
                  <option value="In-ear headphone">In-ear headphone</option>
                  <option value="On-ear headphone">On-ear headphone</option>
                  <option value="Over-ear headphone">Over-ear headphone</option>
                </select>
              </span>

              <span className={productDesign.selectName}>
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
              <span className={productDesign.selectColor}>
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
              <span className={productDesign.selectPrice}>
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
          <div className={productDesign.selectSort}>
            <select
              value={filter.sort || ""}
              onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
            >
              <option value="" disabled hidden>
                Sort by:Featured
              </option>{" "}
              <option value="">Featured</option>
              <option value="priceLowToHigh">Price: Lowest</option>
              <option value="priceHighToLow">Price: Highest</option>
              <option value="AtoZ">Name:(A-Z)</option>
              <option value="ZtoA">Name:(Z-A)</option>
            </select>
          </div>
        </div>
      </div>
      <br />
      <div className={productDesign.allProductSection}>
        {viewMode === "grid" ? (
          <div className={productDesign.allProductSection1}>
            <div className={productDesign.allProductSection2}>
              {products.map((product, index) => (
                <div className={productDesign.productDiv} key={index}>
                  <div className={productDesign.productImg}>
                    <img
                      onClick={() => checkDescription(product._id)}
                      src={product.productImage}
                      alt="img"
                    />
                    {token ? (
                      <span onClick={() => addTocarts(product)}>
                        <MdAddShoppingCart className={productDesign.addcart} />
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <h4>{product.productName}</h4>
                  <p>Price - &#x20B9; {product.productPrice}</p>
                  <span>
                    <p>
                      {product.productColor} | {product.productType}
                    </p>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={productDesign.viewModes}>
            {products.map((product, index) => (
              <div className={productDesign.views} key={index}>
                <div className={productDesign.cartView}>
                  <img src={product.productImage} alt="img" />
                  {token ? (
                    <span
                      className={productDesign.cartSpan}
                      onClick={() => addTocarts(product._id)}
                    >
                      <MdAddShoppingCart className={productDesign.addcarts} />
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                <div className={productDesign.alldetails}>
                  <h1>{product.productName}</h1>
                  <p>Price - &#x20B9; {product.productPrice}</p>
                  <span>
                    <p>
                      {product.productColor} | {product.productType}
                    </p>
                  </span>
                  <p>{product.productDetails}</p>
                  <button onClick={() => checkDescription(product._id)}>
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default ProductList;
