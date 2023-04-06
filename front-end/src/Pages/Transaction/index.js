import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// import component
import Button from "../../Components/Button";

// import css
import "./style.css";

export default function Transaction() {
  // bahan
  const [receive, setReceive] = useState("");
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState();
  const token = localStorage.getItem("Authorization");
  const { id } = useParams();
  const push = useNavigate();
    
  // proses ambil total harga
  async function totalAmount() {
    try {
      const res = await axios.get(`http://localhost:5000/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPrice(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  // proses payment
  async function payment() {
    try {
      const res = await axios.post(
        `http://localhost:5000/transaksi/${id}`,
        {
          nama_penerima: receive,
          alamat_tujuan: destination,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      // push(`/product/transaction/${id}/success`);
    } catch (err) {
      console.error(err);
    }
  }

  function formatRupiah(angka) {
    let convert = angka.toString().split("").reverse().join("");
    let rp = convert.match(/\d{1,3}/g);
    rp = rp.join(".").split("").reverse().join("");
    return `Rp ${rp}`;
  }

  useEffect(() => {
    totalAmount();
  }, [id, token]);

  return (
    <div>
      <h2 className="order-titles">Order Payment</h2>
      <form className="order-container" onSubmit={payment}>
        <div className="order-customer-name">
          <label for="name">Nama Penerima</label>
          <div className="input-add">
            <input
              type="text"
              name="name-product"
              value={receive}
              onChange={(e) => setReceive(e.target.value)}
            />
          </div>
        </div>
        <div className="order-customer-destination">
          <label for="desc">Alamat Tujuan</label>
          <div className="input-add">
            <input
              type="text"
              name="desc"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>
        {price && (
          <div className="total-payment">
            <h3>Total :</h3>
            <h3>{formatRupiah(price.harga_produk)}</h3>
          </div>
        )}
        <Button className="btn-order" textbtn="Send" accept="submit" />
      </form>
    </div>
  );
}
