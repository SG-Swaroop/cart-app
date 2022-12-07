import React from 'react'

function Offer() {
  return (
    <div className="flex flex-col container bg-blue-200 rounded-md ml-3 mt-1.5 p-1 justify-items-start max-w-sm">
    <h1 className="font-bold text-red-500 mb-3 text-center">Offers for you!!</h1>
    <hr className="border-1 w-full"/>
        <h1 className="font-bold text-green-600 mb-1">1.Discount on Buying two Breads and a Soup Together</h1>
        <h1 className="font-bold text-green-600 mb-1">2.Buy three Cheeses and get one Cheese FREE!!</h1>
        <h1 className="font-bold text-green-600 mb-1">3.Buy four Cheeses and get two Cheeses FREE!!</h1>
        <h1 className="font-bold text-green-600 mb-1">4.Discount on buying a Butter alone or with Milk</h1>
        </div>
  )
}
export default Offer
