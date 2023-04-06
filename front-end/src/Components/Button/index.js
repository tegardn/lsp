import React from "react";
import { useNavigate } from "react-router-dom";


export default function Button({
  textbtn,
  className,
  accept,
  event
}) {
  const push = useNavigate();

  function routerClick() {
    push(`${ event }`);
  }

  return (
    <button className={className} type={accept} onClick={routerClick}>
      {textbtn}
    </button>
  );
}
