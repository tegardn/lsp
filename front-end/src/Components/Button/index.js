import React from "react";

export default function Button({
  textbtn,
  className,
  accept,
}) {

  return (
    <button className={className} type={accept} >
      {textbtn}
    </button>
  );
}
