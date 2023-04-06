import React from 'react'
import { Outlet } from "react-router-dom";

// import component
import Header from '../Header';

// import css
import './css/Customer.css'

export default function CustomerLayout() {
  return (
    <div>
      <Header />
      <div className="customer-container">
        <Outlet />
      </div>
    </div>
  )
}
