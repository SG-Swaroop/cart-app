import React from 'react'


function Bill({subTotal, savings, totalAmount}) {
  return (
    <div className="flex flex-col">
        <div className="flex flex-row justify-between">
        <span>Sub Total</span>
        <span>£ {subTotal.toFixed(2)}</span>
        </div>

        <div className="flex flex-row justify-between">
        <span className="font-bold text-black-600">Discount</span>
        <span className="font-bold text-black-600">£ {savings.toFixed(2)}</span>
        </div>

        <div className="flex flex-row justify-between">
        <span>Total Amount</span>
        <span>£ {totalAmount.toFixed(2)}</span>
        </div>
    </div>
  );
}
export default Bill;

