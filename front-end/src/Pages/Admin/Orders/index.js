import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// import css
import "./style.css";

export default function Orders() {
  // bahan
  const [orderDatas, setOrderDatas] = useState([]);
  const token = localStorage.getItem("Authorization");

  // proses get order
  async function getOrder() {
    try {
      const res = await axios.get("http://localhost:5000/transaction", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.message);
        setOrderDatas(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getOrder();
  }, [token]);

  return (
    <div className="orders wrapper">
      <div className="orders-table">
        <table>
          <tr>
            <th>Tgl</th>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Produk</th>
            <th>Gambar</th>
            <th>Harga</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {orderDatas.map((data, index) => (
            <tr key={index}>
              <td>{data.tanggal_transaksi}</td>
              <td>{data.nama_penerima}</td>
              <td>{data.alamat_tujuan}</td>
              <td>{data.nama_produk}</td>
              <td>
                <img src={data.url_gambar} alt={data.gambar} />
              </td>
              <td>{data.harga_produk}</td>
              <td>{data.status}</td>
              <td>
                      <Link style={{ color: "#7f5af0" }} className="link" to={`/orders/edit/${data.id}`}>
                    Edit
                </Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
