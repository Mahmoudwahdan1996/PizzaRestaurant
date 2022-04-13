import classes from "../../styles/Admin.module.css";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";

const Admin = ({ oreders, products }) => {
  const [prductsList, setProductsList] = useState(products);
  const [ordersList, setOrdersList] = useState(oreders);
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/products/${id}`);
      setProductsList(prductsList.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (id) => {
    const item = ordersList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    try {
      const res = await axios.put(`/api/orders/${id}`, {
        status: currentStatus + 1,
      });
      setOrdersList([
        res.data,
        ...ordersList.filter((order) => order._id !== id),
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.item}>
        <h1 className={classes.title}>Products</h1>
        <table className={classes.tabel}>
          <thead>
            <tr className={classes.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {prductsList.map((product) => (
              <tr className={classes.trTitle} key={product._id}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt={product.title}
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>{product.prices[0]}</td>
                <td>
                  <button className={classes.button}>Edit</button>
                  <button
                    className={classes.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={classes.item}>
        <h1 className={classes.title}>Orders</h1>
        <table className={classes.tabel}>
          <thead>
            <tr className={classes.trTitle}>
              <th>Id</th>
              <th>Cusomer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map((order) => (
              <tr className={classes.trTitle} key={order._id}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>{order.total}</td>
                <td>
                  {order.method === 0 ? <span>Cash</span> : <span>Paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  const productsRes = await axios.get(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.URL_DEV
        : process.env.URL_PROD
    }/api/products`
  );
  const ordersRes = await axios.get(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.URL_DEV
        : process.env.URL_PROD
    }/api/orders`
  );

  return {
    props: {
      oreders: ordersRes.data,
      products: productsRes.data,
    },
  };
}

export default Admin;
