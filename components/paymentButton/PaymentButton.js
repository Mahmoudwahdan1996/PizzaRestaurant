import { useEffect } from "react";

import { useSelector } from "react-redux";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const ButtonWrapper = ({ currency, showSpinner, createOrder }) => {
  const cart = useSelector((state) => state.cart);
  const style = { layout: "vertical" };

  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const amount = cart.total;

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function (details) {
            const shipping = details.purchase_units[0].shipping;
            createOrder({
              customer: shipping.name.full_name,
              address: shipping.address.address_line_1,
              total: cart.total,
              method: 1,
            });
          });
        }}
      />
    </>
  );
};

export default ButtonWrapper;

// sb-0bqkf15253425@business.example.com

// oQM2@bW(

// sb-vanql15567014@personal.example.com
// P|1f[I4+
