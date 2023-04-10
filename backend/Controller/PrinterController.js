"use strict";

// init model
const { Printer } = require("../Model/Printer");

// init other module
const fs = require("fs");
const path = require("path");

class PrinterController {
  // show products
  static async GetProductsController(req, res) {
    try {
      const result = await Printer.GetProductsModel();
      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  // show products by id
  static async ShowProductByIdController(req, res) {
    const { id } = req.params;
    try {
      const result = await Printer.GetProductsByIdModel(+id);
      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  // show product by asc
  static async ShowProductASCController(req, res) {
    try {
      const result = await Printer.ShowProductASCModel();
      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  // show product by asc
  static async ShowProductDESCController(req, res) {
    try {
      const result = await Printer.ShowProductDESCModel();
      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  // add product
  static async AddProductController(req, res) {
    const { nama_produk, harga_produk, stok, deskripsi } = req.body;
    const gambar = req.files.gambar;
    const ext = path.extname(gambar.name);
    const fileGambar = gambar.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/uploads/${fileGambar}`;

    gambar.mv(`./uploads/${fileGambar}`, async () => {
      try {
        const result = await Printer.AddProductModel(
          nama_produk,
          harga_produk,
          stok,
          deskripsi,
          fileGambar,
          url
        );

        if (result) {
          res.status(200).json({ message: result });
        }
      } catch (err) {
        res.status(500).json({ message: err });
      }
    });
  }

  // update product
  static async UpdateProductController(req, res) {
    const { id } = req.params;
    const product = await Printer.GetProductsByIdModel(+id);

    if (!product) return res.status(404).json({ msg: "Data Tidak ditemukan" });

    let fileName = "";
    if (req.files !== null) {
      const gambar = req.files.gambar;
      const ext = path.extname(gambar.name);
      fileName = gambar.md5 + ext;

      //change old file with new file
      const filepath = `./uploads/${product.gambar}`;
      fs.unlinkSync(filepath);

      gambar.mv(`./uploads/${fileName}`, (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      });
    } else {
      fileName = product.gambar;
    }

    const { nama_produk, harga_produk, stok, deskripsi } = req.body;
    const url = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;

    try {
      await Printer.UpdateProductModel(
        nama_produk,
        harga_produk,
        stok,
        deskripsi,
        fileName,
        url,
        +id
      );
      res.status(200).json({ msg: "Produk Berhasil diperbaharui" });
    } catch (error) {
      console.log(error.message);
    }
  }

  // delete product
  static async DeleteProductController(req, res) {
    const { id } = req.params;
    const productResult = await Printer.GetProductsByIdModel(+id);
    console.log(productResult);

    try {
      const fileGambarUrl = `./uploads/${productResult.gambar}`;
      fs.unlinkSync(fileGambarUrl);

      const result = await Printer.DeleteProductModel(+id);

      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  // search
  static async SearchProductController(req, res) {
    const nama_produk = req.query.nama_produk;

    try {
      const result = await Printer.SearchProductModel(nama_produk);

      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  // transaksi
  static async TransactionController(req, res) {
    const { id } = req.params;
    const productData = await Printer.GetProductsByIdModel(+id);

    if (productData == null) {
      console.log("product habis");
    }

    const { userId } = req;
    const { nama_penerima, alamat_tujuan } = req.body;
    const harga = productData.harga_produk;
    const stock = productData.stok;
    try {
      if (stock >= 1) {
        const totalHarga = harga;
        const result = await Printer.TransactionModel(
          +userId,
          +id,
          nama_penerima,
          alamat_tujuan,
          totalHarga
        );

        if (result) {
          res.status(200).json({ message: result });
        }
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = { PrinterController };
