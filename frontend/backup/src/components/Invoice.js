import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Invoice = ({ token }) => {
  const { orderId } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:8000/api/invoice/${orderId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setInvoice(data));
    }
  }, [token, orderId]);

  if (!invoice) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice #{invoice.id}</h1>
      <div className="bg-white p-6 rounded shadow">
        <p>Issued: {new Date(invoice.issued_at).toLocaleString()}</p>
        <p>Order #{invoice.order.id}</p>
        <p>Status: {invoice.order.status}</p>
        <h2 className="text-lg font-semibold mt-4">Items</h2>
        <ul>
          {invoice.order.items.map((item) => (
            <li key={item.id}>
              {item.quantity} x {item.menu_item.name} (${item.price})
            </li>
          ))}
        </ul>
        <p className="font-bold mt-4">Total: ${invoice.total_amount}</p>
        <button
          onClick={() => window.print()}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Invoice;