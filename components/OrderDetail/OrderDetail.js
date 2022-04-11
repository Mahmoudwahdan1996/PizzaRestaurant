import classes from "./OrserDetail.module.css";
import { useState } from "react";
const OrderDetail = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = () => {
    createOrder({ customer, address, method: 0, total });
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1 className={classes.title}>you will pay 12$ after delivery.</h1>
        <div className={classes.item}>
          <label className={classes.label}>Name sureName</label>
          <input
            type="text"
            placeholder="Mahmoud Wahdan"
            className={classes.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={classes.item}>
          <label className={classes.label}>Phone Number</label>
          <input
            type="text"
            placeholder="+1 234 567 89"
            className={classes.input}
          />
        </div>
        <div className={classes.item}>
          <label className={classes.label}>Address</label>
          <textarea
            rows={5}
            placeholder="Dumitta St. 505 NY"
            type="text"
            className={classes.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={classes.button} onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
