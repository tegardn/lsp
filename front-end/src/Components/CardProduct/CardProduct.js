import React from "react";
import { Link } from "react-router-dom";

// import css
import "./style.css";

export default function CardProduct({ image, text, price, imgAlt,id }) {
  // convert to rupiah
  function formatRupiah(angka) {
    let convert = angka.toString().split("").reverse().join("");
    let rp = convert.match(/\d{1,3}/g);
    rp = rp.join(".").split("").reverse().join("");
    return `Rp ${rp}`;
  }

  return (
    <div className="card-product">
      <Link className="link" to={`/product/${id}`}>
        <img src={image} alt={imgAlt} />
        <div className="container-title-product">
          <h3>{text}</h3>
          <h5>{formatRupiah(price)}</h5>
        </div>
      </Link>
    </div>
  );
}
