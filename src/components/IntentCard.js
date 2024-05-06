import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const IntentCard = ({ intent }) => {
  const baseUrl = "http://localhost:5000/orders";
  const reviewsUrl = "http://localhost:5000/reviews";
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    alert(`You have entered: ${inputValue}`);
  };

  const [orders, setOrders] = useState([]);

  // Cancel_order: change orderStatus to cancel
  // change_order: change orderStatus to change ,point changed variable to new order number
  // place_order: new order object
  // payment_issue: display paymentStatus refundStatus orderStatus if payment issue flag payment status as issue
  // track_refund:display refundstatus refundEta TotalAmount
  // FEEDBACK: complaint, review {add complaint reivew}
  // check_invoice:Dislay invoice number

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const cancelOrder = async (orderNumber) => {
    try {
      const order = await axios.get(`${baseUrl}/${orderNumber}`);
      order.data.orderStatus = "cancelled";
      await axios.put(`${baseUrl}/${orderNumber}`, order.data);
      alert("Order cancelled successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  const changeOrder = async (orderNumber) => {
    try {
      const order = await axios.get(`${baseUrl}/${orderNumber}`);
      order.data.orderStatus = "changed";
      await axios.put(`${baseUrl}/${orderNumber}`, order.data);
      alert("Order changed successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error changing order:", error);
    }
  };

  const placeOrder = async (order) => {
    try {
      await axios.post(baseUrl, order);
      alert("Order placed successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const paymentIssue = async (transactionId) => {
    try {
      const order = await axios.get(`${baseUrl}/${transactionId}`);
      if (order.data.paymentStatus === "issue") {
        alert(`Payment issue: ${order.data.paymentStatus}`);
      } else {
        alert(`Payment status: ${order.data.paymentStatus}`);
      }
      alert(`Payment status: ${order.data.paymentStatus}`);
      window.location.reload();
    } catch (error) {
      console.error("Error getting payment status:", error);
    }
  };

  const trackRefund = async (orderNumber) => {
    try {
      const order = await axios.get(`${baseUrl}/${orderNumber}`);
      alert(`Refund status: ${order.data.refundStatus}`);
      alert(`Refund ETA: ${order.data.refundETA}`);
      alert(`Total amount: ${order.data.totalAmount}`);
    } catch (error) {
      console.error("Error tracking refund:", error);
    }
  };

  const feedback = async (orderId, review) => {
    try {
      await axios.post(`${reviewsUrl}`, {
        orderId,
        review,
      });
      alert("Feedback added successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  const checkInvoice = async (orderNumber) => {
    try {
      const order = await axios.get(`${baseUrl}/${orderNumber}`);
      alert(`Invoice number: ${order.data.invoiceNumber}`);
      window.location.reload();
    } catch (error) {
      console.error("Error checking invoice:", error);
    }
  };

  return (
    <div className="flex justify-end mb-4 cursor-pointer">
      <div className="flex flex-col max-w-96 bg-indigo-500 text-white p-3 gap-3 rounded-lg">
        <div className="flex items-center justify-center ml-2 bg-indigo-400 rounded-lg">
          <h3>{intent.name}</h3>
        </div>
        <p>{intent.message}</p>
        <div>
          {intent === "cancel_order" && (
            <>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Give me Order ID."
                className="p-2 rounded-md border border-gray-400 focus:outline-none text-black focus:border-blue-500"
              />
              <button
                onClick={() => cancelOrder(inputValue)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2"
              >
                Send
              </button>
            </>
          )}
          {(intent === "change_order" || intent === 'place_order' )&& (
            <>
              <a
                href="/ecommerce"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2"
              >
                Buy Items
              </a>
            </>
          )}
          {(intent === "payment_issue" ||
            intent === "check_payment_methods") && (
            <>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Give me Transaction ID."
                className="p-2 rounded-md border border-gray-400 focus:outline-none text-black focus:border-blue-500"
              />
              <button
                onClick={() => paymentIssue(inputValue)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2"
              >
                Send
              </button>
            </>
          )}
          {intent === "Shipment" && (
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Give me shipment ID."
              className="p-2 rounded-md border border-gray-400 focus:outline-none text-black focus:border-blue-500"
            />
          )}
          {(intent === "check_refund_policy" || intent === "track_refund") && (
            <>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Give me Order ID."
                className="p-2 rounded-md border border-gray-400 focus:outline-none text-black focus:border-blue-500"
              />
              <button
                onClick={() => trackRefund(inputValue)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2"
              >
                Send
              </button>
            </>
          )}
          {(intent === "check_invoice") && (
            <>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Give me Order ID."
                className="p-2 rounded-md border border-gray-400 focus:outline-none text-black focus:border-blue-500"
              />
              <button
                onClick={() => checkInvoice(inputValue)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2"
              >
                Send
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntentCard;
