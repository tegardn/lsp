"use stric";

// init db
const { db, connectSql } = require("../Config/db");

class TransactionModel {
  constructor(
    id,
    namaPenerima,
    alamatTujuan,
    namaProduk,
    harga,
    gambar,
    urlGambar,
    status
  ) {
    this.id = id;
    this.namaPenerima = namaPenerima;
    this.alamatTujuan = alamatTujuan;
    this.namaProduk = namaProduk;
    this.harga = harga;
    this.gambar = gambar;
    this.urlGambar = urlGambar;
    this.status = status;
  }

  // tampilkan semua transaction
  static async ShowAllTransactionModel() {
    const sqlQuery =
      "SELECT transaksi.nama_penerima, transaksi.alamat_tujuan, printer.nama_produk, printer.harga_produk, printer.gambar, printer.url_gambar FROM transaksi INNER JOIN printer ON transaksi.id_produk = printer.id_produk INNER JOIN person ON transaksi.id_user = person.id";

    try {
      const response = await connectSql(sqlQuery);
      let datas = [];
      let data;

      response.forEach((i) => {
        data = new TransactionModel(
          i.id,
          i.namaPenerima,
          i.alamatTujuan,
          i.namaProduk,
          i.harga,
          i.gambar,
          i.url_gambar,
          i.status
        );
        datas.push(data);
      });

      return datas;
    } catch (err) {
      throw new Error(err);
    }
  }

  // update status
  static async UpdateStatusTransactionModel(status, id) {
    const sqlQuery = "UPDATE transaksi SET status = ? WHERE id = ?";

    try {
      const response = await connectSql(sqlQuery, [status, id]);

      if (response) {
        return "barang sudah sampai tujuan";
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { TransactionModel };
