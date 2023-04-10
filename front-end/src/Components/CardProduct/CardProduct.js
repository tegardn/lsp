import React from "react";
import { Link } from "react-router-dom";

// import helper
import { ConvertRupiah } from "../../Helper/ConvertRupiah";

// import css
import "./style.css";

export default function CardProduct({ image, text, price, imgAlt,id }) {
  return (
    <div className="card-product">
      <Link className="link" to={`/product/${id}`}>
        <img src={image} alt={imgAlt} />
        <div className="container-title-product">
          <h3>{text}</h3>
          <h5>{ConvertRupiah(price)}</h5>
        </div>
      </Link>
    </div>
  );
}
