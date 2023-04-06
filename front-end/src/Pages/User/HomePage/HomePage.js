import { React, useEffect, useState } from 'react'
import axios from 'axios';
import CardProduct from '../../../Components/CardProduct/CardProduct'

// import css
import './style.css';

export default function HomePage() {
  // bahan
  const [datas, setDatas] = useState([]);
  const token = localStorage.getItem('Authorization');

  // proses ambil data
  async function getProducts() {
    try {
      const res = await axios.get('http://localhost:5000/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data.message);
      setDatas(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProducts();
  }, [token])

  return (
    <div className="container-home">
      {
        datas.map(t => (
          <CardProduct image={t.url_gambar} text={t.nama_produk} price={t.harga_produk} imgAlt={t.gambar} id={t.id_produk} />
        ))
      }
    </div>
  )
}
