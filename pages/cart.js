import { useState } from "react";
import Image from "next/image";
import classes from "../styles/cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ButtonWrapper from "./../components/paymentButton/PaymentButton";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail/OrderDetail";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const currency = "USD";

  const createOrder = async (data) => {
    try {
      const res = await axios.post(`/api/orders`, data);
      res.status === 200 && router.push("/order/" + res.data._id);
      dispatch(reset());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <table className={classes.table}>
          <thead>
            <tr className={classes.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((product) => (
              <tr className={classes.tr} key={product._id}>
                <td>
                  <div className={classes.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={classes.name}>{product.title}</span>
                </td>
                <td>
                  <span className={classes.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={classes.price}>${product.price}</span>
                </td>
                <td>
                  <span className={classes.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={classes.total}>
                    ${product.quantity * product.price}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={classes.right}>
        <div className={classes.wrapper}>
          <h2 className={classes.title}>CART TOTAL</h2>
          <div className={classes.totalText}>
            <b className={classes.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={classes.totalText}>
            <b className={classes.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={classes.totalText}>
            <b className={classes.totalTextTitle}>Total:</b>${cart.total}
          </div>
          {open ? (
            <div className={classes.paymentMethods}>
              <button
                className={classes.payButton}
                onClick={() => setCash(true)}
              >
                CASH on DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AY1Qc1apM6aOcTArUId_0VhneiMauFxy5TNSBFvuIFB6JpOG8Cg1DK2T2Qc9JJXuB7RG3GTXPWS1lb9H",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper
                  currency={currency}
                  showSpinner={false}
                  createOrder={createOrder}
                />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={classes.button}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;
