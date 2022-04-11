import { useState } from "react";
import classes from "../../styles/Add.module.css";
import axios from "axios";

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const changePrice = (e, index) => {
    const currentPrices = [...prices];
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((pre) => [...pre, extra]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pizzaProject");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dqzxpggzr/image/upload",
        data
      );

      const { url } = res.data;

      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await axios.post("http://localhost:3000/api/products", newProduct);
      setClose(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <span className={classes.close} onClick={() => setClose(true)}>
          X
        </span>
        <h1>Add a new Pizza</h1>
        <div className={classes.item}>
          <label className={classes.label}>Choose an image</label>
          <input onChange={(e) => setFile(e.target.files[0])} type="file" />
        </div>
        <div className={classes.item}>
          <label className={classes.label}>Title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className={classes.input}
          />
        </div>

        <div className={classes.item}>
          <label className={classes.label}>Desc</label>
          <textarea
            rows={4}
            type="text"
            className={classes.textarea}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className={classes.item}>
          <label className={classes.label}>Prices</label>
          <div className={classes.priceContainer}>
            <input
              type="number"
              className={`${classes.input} ${classes.inputSm}`}
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />

            <input
              type="number"
              className={`${classes.input} ${classes.inputSm}`}
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />

            <input
              type="number"
              className={`${classes.input} ${classes.inputSm}`}
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>

        <div className={classes.item}>
          <label className={classes.label}>Extra</label>

          <div className={classes.extra}>
            <input
              type="text"
              name="text"
              placeholder="Item"
              className={`${classes.input} ${classes.inputSm}`}
              onChange={handleExtraInput}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className={`${classes.input} ${classes.inputSm}`}
              onChange={handleExtraInput}
            />
            <button className={classes.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={classes.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={classes.extraItem}>
                {option.text}
                {` `}
                {`${option.price}$`}
              </span>
            ))}
          </div>
        </div>
        <button className={classes.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
