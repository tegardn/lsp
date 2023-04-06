import React from "react";

// import css
import "./style.css";

export default function SuccessPayment() {
  return (
    <div className="success-payment">
      <div className="success-payment-container">
        <h2 className="success-payment-titles">Payment success</h2>
        <div className="success-payment-keterangan">
          <h3>Keterangan :</h3>
          <ul>
            <li>1. Krirm Screenshoot bukti pemesanan ke WA</li>
            <li>
              2. Ketika barang sudah sampai bayar uang-nya ke kurir, kemudian
              photo barang-nya ke WA
            </li>
          </ul>
          <p>WhatsApp: 0813-1667-5997</p>
        </div>
      </div>
    </div>
  );
}
