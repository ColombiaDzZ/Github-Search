import React from 'react'
import './style.css'

function itemList({title, description}) {
  return ( 
  <div className="item-List">
    <strong>{title}</strong>
    <p>{description}</p>
    <h />
  </div>
  );
}

export default itemList;