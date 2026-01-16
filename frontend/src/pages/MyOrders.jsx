import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const MyOrders = () => {
  const { user, products } = useContext(ShopContext); // logged-in user + product list
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper: get product details by productId
  const getProductDetails = (productId) => {
    return products?.find((product) => product._id === productId) || null;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?.name) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const res = await API.get(`/orders/user/${user.name}`);
        setOrders(res.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, products]);

  return (
    <div className="bg-[#f6fcf0] m-14 mt-8">
      <div className="max-padd-container py-10">
        <Title title1="MyOrder" title2="List" />

        {loading ? (
          <p className="text-xl text-gray-500">Loading orders...</p>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8"
            >
              <h3 className="text-lg font-semibold mb-2">
                Order ID: {order.orderId}
              </h3>
              <p className="text-gray-600 mb-2">Total: ₹{order.totalAmount}</p>
              <p className="text-gray-600 mb-4">Payment: {order.modeOfPayment}</p>

              <h4 className="text-md font-medium mb-2">Order Items:</h4>
              <ul>
                {order.items?.map((item) => {
                  const product = getProductDetails(item.productId); // <-- Corrected
                  return (
                    <li
                      key={item.id} // <-- Corrected
                      className="flex items-center mb-4 border-b pb-4"
                    >
                      {product?.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 mr-4 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">
                          {product?.name || `Product ID: ${item.productId}`}
                        </p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-xl text-gray-500">No orders found</p>
        )}
      </div>

      {/* Footer */}
      <div className="max-padd-container bg-[#a5fc48d0] py-6 mt-12 rounded-lg text-center">
        <p className="text-gray-600">
          © 2024 GlamLumina. All rights reserved. Designed by Nandita Nilajagi.
        </p>
      </div>
    </div>
  );
};

export default MyOrders;
