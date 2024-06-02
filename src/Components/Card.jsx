import React, { useEffect, useRef, useState } from "react";
import { UseDispatchcart, Usecart } from "./Contextreducer";

function Card(props) {
  let dispatch = UseDispatchcart();
  let data = Usecart();
  let options = props.options;
  let keyoptions = Object.keys(options[0]);
  let foodItem = props.foodItem;

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef(null);

  async function handleAddToCart() {
    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: options[0][size], // Correct the price field
      img: foodItem.img,
      qty: qty,
      size: size,
    });
    console.log(data);
  }

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[0][size]);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "1000px" }}>
        <img
          src={foodItem.img}
          className="card-img-top"
          alt="hello"
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          <p className="card-text" style={{ textAlign: "center" }}>
            lorem*5
          </p>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {keyoptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="d-inline h-100 fs-5">{finalPrice}/-</div>
          </div>
          <hr />
          <button
            className="btn bg-success justify-center ms-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
