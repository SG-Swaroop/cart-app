import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../redux/action/productAction";
import Cart from "./Cart";

const productDescription=[
    {
        id : 1,
        product_name : 'Bread',
        price : 1.10
    },
    {
        id : 2,
        product_name : 'Milk',
        price : 0.5
    },
    {
        id : 3,
        product_name : 'Cheese',
        price : 0.9
    },
    {
        id : 4,
        product_name : 'Soup',
        price : 0.6
    },
    {
        id : 5,
        product_name : 'Butter',
        price : 1.20
    }
];

function ProductDescription(){
    
    const dispatch = useDispatch();
    const setProductToStore=(id, name, price)=>{
        alert('Product Added to Cart');
        let selectedProduct = {
            id : id,
            product_name : name,
            price : price,
            product_count : 1,
        };
        dispatch(selectProduct(selectedProduct));
    };

    const productDetails = useSelector((state => state.selectedProduct));
    let productMatching = [];
    productDescription?.forEach((element)=>{
        productDetails?.forEach((prod) =>{
            if (prod.product_name === element.product_name) {
                productMatching.push(prod);
              }
        });
    });

    return(
    <div className="flex md:flex-col justify-between lg:flex-row">
    <div className="flex flex-col container bg-blue-200 rounded-md p-3 justify-items-start max-w-sm">
        <h1 className="font-bold mb-3 text-center">PRODUCTS AVAILABLE</h1>
        <hr className="border-1 w-full" />
        <div className="flex flex-row justify-items-start p-3">
            <div className="font-bold w-20">PRODUCT</div>
            <div className="text-center font-bold w-20 px-7">PRICE</div>
            </div>
            <hr className="border-1 w-full" />
        {productDescription.map((product)=>(
        <div key={product.id}>
            <div className="flex flex-row items-center justify-evenly p-3">
            <div className="font-bold w-20">{product.product_name}</div>
            <div className="font-bold w-20">£ {product.price}</div>
            <button className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-full py-2 px-2 my-2 text-sm text-white hover:bg-blue-400 hover:from-blue-500 hover:to-blue-600 flex flex-row justify-center w-28 outline-none"
            disabled={productMatching.find(
                (matchProduct) => matchProduct.id === product.id
            )}
            onClick={() =>
                setProductToStore(
                  product.id,
                  product.product_name,
                  product.price,
                  product.selected
                )
              }style={
                productMatching.find(
                  (matchProduct) => matchProduct.id === product.id
                )
                  ? {color: "gray", background: "rgb(173 212 231", cursor: "not-allowed" }
                  : {}
              }
            >ADD TO CART</button>
            </div>
            <hr className="border-1 w-full" />
        </div>
        ))}
    </div>
    <Cart />
    </div>
    );
}
export default ProductDescription;