import { React, useEffect, useState } from "react";
import axios from "axios";

// import component
import CardProduct from "../../../Components/CardProduct/CardProduct";
import Search from "../../../Components/Seacrh";

// import css
import "./style.css";
import { faSortAmountAsc } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  // bahan
  const [datas, setDatas] = useState([]);
  const [sortDatas, setSortDatas] = useState([]);
  const [searchP, setSearchP] = useState("");
  const [sort, setSort] = useState("random");
  const token = localStorage.getItem("Authorization");

  // proses ambil data
  async function getProducts() {
    try {
      const res = await axios.get("http://localhost:5000/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDatas(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  //search product result
  async function searchProductResult(value) {
    try {
      const res = await axios.get(
        `http://localhost:5000/search?nama_produk=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setDatas(res.data.message);
      setSortDatas(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  // proses sort
  async function sortProduct() {
    let res;
    try {
      if (sort === "random") {
        setSortDatas(datas);
      } else if (sort === 'az') {
        res = await axios.get("http://localhost:5000/productasc", {
          headers: {
            Authorization: `bearer ${token}`
          }
        });
        setSortDatas(res.data.message);
      } else {
        res = await axios.get("http://localhost:5000/productdesc", {
          headers: {
            Authorization: `bearer ${token}`
          }
        });
        setSortDatas(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProducts();
    sortProduct();
  }, [token, datas, sort]);

  useEffect(() => {
    setSearchP(searchP);
  }, [searchP]);
  
  return (
    <div>
      <div className="tools wrapper">
        <Search
          resultSearch={searchP}
          inputSearch={(e) => setSearchP(e.target.value)}
          formulaResult={searchProductResult(searchP)}
        />
        <div className="sort-filter">
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="random">Sort</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
          </select>
        </div>
      </div>
      <div className="homepage wrapper">
        {sortDatas.map((t) => (
          <CardProduct
            image={t.url_gambar}
            text={t.nama_produk}
            price={t.harga_produk}
            imgAlt={t.gambar}
            id={t.id_produk}
          />
        ))}
      </div>
    </div>
  );
}
