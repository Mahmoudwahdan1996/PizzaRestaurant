import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import classes from "../../styles/product.module.css";
import { addToCart } from "../../redux/cartSlice";

const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();

  const handlePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    handlePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      handlePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      handlePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addToCart({ ...pizza, price, quantity, extras }));
  };

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.imgContainer}>
          <Image
            src={pizza.img}
            alt={pizza.title}
            objectFit="contain"
            layout="fill"
          />
        </div>
      </div>
      <div className={classes.right}>
        <h1 className={classes.title}>{pizza.title}</h1>
        <span className={classes.price}>${price}</span>
        <p className={classes.desc}>{pizza.desc}</p>
        <h3 className={classes.choose}>Choose the size</h3>
        <div className={classes.sizes}>
          <div className={classes.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="small pizza" />
            <span className={classes.number}>Small</span>
          </div>
          <div className={classes.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="medium pizza" />
            <span className={classes.number}>Medium</span>
          </div>
          <div className={classes.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="large pizza" />
            <span className={classes.number}>Large</span>
          </div>
        </div>
        <h3 className={classes.choose}>Choose additional ingredients</h3>
        <div className={classes.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div className={classes.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={classes.checkBox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="double">{option.text}</label>
            </div>
          ))}
        </div>
        <div className={classes.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            min={1}
            value={quantity}
            className={classes.quantity}
          />
          <button className={classes.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const res = await axios.get(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.URL_DEV
        : process.env.URL_PROD
    }/api/products/${params.id}`
  );
  return {
    props: {
      pizza: res.data,
    },
  };
}

export default Product;
