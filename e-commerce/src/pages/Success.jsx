import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { userRequest } from '../requestMethod';

const Success = () => {

  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector(state => state.user.currentUser);

  const [orderId, setOrderId] = useState(null);

  console.log(data);
  console.log(cart);
  console.log(currentUser.user);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post('/orders/create', {
          userId: currentUser.user._id,
          products: cart.products.map((p) => ({
            productId: p._id,
            quantity: p.quantity
          })),
          amount: cart.total,
          address: data.billing_details.address,
        })
        setOrderId(res.data._id);
      } catch (error) {
        console.log(error)
      }
    }
    data && createOrder();
  }, [cart, data, currentUser])


  console.log(location);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >

      {
        orderId
          ? `Order has been created successfully. Your order number is ${orderId}`
          : `Successfull. Your order is being prepared...`}

      <Link to={'/'} style={{ padding: 10, marginTop: 20 }}>Go to Homepage</Link>


    </div>
  )
}

export default Success