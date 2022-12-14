import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Bill from './Bill';
import{
    removeProduct,
    incrementProductCount,
    decrementProductCount
} from '../redux/action/productAction'


function Cart() {
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.selectedProduct)

    let savings = 0;
    let subTotal = 0;
    let totalAmount = 0;
    let breadSavings = 0;
    let butterSavings = 0;
    let cheeseSavings = 0;
    let milkSavings = 0;
    let freeCheeseCount = 0;
    let isCheeseFree = false;
    
    const bread = productDetails.find(
        (product) => product.product_name.toUpperCase() === 'BREAD'
    );

    const milk = productDetails.find(
        (product) => product.product_name.toUpperCase() === 'MILK'
    );

    const cheese = productDetails.find(
        (product) => product.product_name.toUpperCase() === 'CHEESE'
    );

    const soup = productDetails.find(
        (product) => product.product_name.toUpperCase() === 'SOUP'
    );

    const butter = productDetails.find(
        (product) => product.product_name.toUpperCase() === 'BUTTER'
    );
  
  if(soup?.product_count >= 1 && bread?.product_count >= 2){
        breadSavings = (bread.price * bread?.product_count) / 2;
    savings += breadSavings;
    }

    if(cheese?.product_count === 3){
    isCheeseFree = true;
    cheeseSavings = cheese?.price;
    freeCheeseCount = 1;
    savings += cheeseSavings;
    }
    else 
        if(cheese?.product_count >= 4){
        isCheeseFree = true;
        cheeseSavings = cheese?.price*2;
        freeCheeseCount = 2;
        savings += cheeseSavings;
        }

    if(butter?.product_count === 1){
        butterSavings = 0.2;
        savings += butterSavings;
    }

    if(butter?.product_count >= 2 && milk?.product_count >= 1){
        milkSavings = 0.2;
        savings += milkSavings;
    }
    
    //for billling
    productDetails?.forEach((element)=>{
        subTotal += element?.price * element?.product_count;
    });
    
    totalAmount = subTotal - savings;

    // for increment product count
  const incrementCount = (id) => {
    dispatch(incrementProductCount(id));
  };

  // For decrement product count
  const decrementCount = (id) => {
    dispatch(decrementProductCount(id));
  };

  // for remove product from basket
  const removeProductFromCart = (id) => {
    dispatch(removeProduct(id));
  };
    
  return (
    <div className='flex flex-col container bg-blue-200 rounded-md p-3 ml-4 mr-3 md:w-full'>
    <h1 className='font-bold text-center mb-3'>Your Cart</h1>
    <hr className='border-1 w-full'/>
    {productDetails.map((product)=>(
        <div key={product.id}>
            <div className='flex flex-row items-center justify-between p-3'>
            <div>{product.product_name}</div>
            <div>?? {product.price}</div>
            <div className='flex flex-row justify-between items-center'>
            <button
            onClick={() => decrementCount(product.id)}
            disabled={product.product_count === 1}
            className='bg-gradient-to-r from-blue-900 to-blue-400 rounded-full py-1 px-1 my-1 text-lg text-black hover:bg-blue-400 hover:from-blue-500 hover:to-blue-600 flex flex-row justify-center w-12 outline-none'
            style={
              product.product_count === 1
                ? { background: '#8080809e', cursor: 'not-allowed' }
                : {}
            }
            >
                -
            </button>
            <p className='mr-4 ml-4'>{product.product_count}</p>
            <button onClick={() => incrementCount(product.id)}
                className='bg-gradient-to-r from-blue-900 to-blue-400 rounded-full py-2 px-2 my-2 text-sm text-black hover:bg-blue-400 hover:from-blue-500 hover:to-blue-600 flex flex-row justify-center w-12 outline-none'
            >
                +
            </button>
            <div className='ml-4 cursor-pointer'
            onClick={() => removeProductFromCart(product.id)}
            >
            <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
            >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
            </svg>
          </div>
        </div>
      </div>
      <hr className='border-1 w-full'/>
      <div className='flex flex-row-reverse font-bold text-black-600'>
      Item price ?? {product.price.toFixed(2)} * {product.product_count} = ??{' '}
            {(product.price * product.product_count).toFixed(2)}
      </div>
      
      <hr className='border-1 w-full' />
          <div className='flex flex-row-reverse font-bold text-black-600'>
            Item cost ??{' '}
            {(
              product.price * product.product_count -
              (product.product_name.toUpperCase() === 'BREAD' && breadSavings
                ? breadSavings
                : product.product_name.toUpperCase() === 'BUTTER' &&
                  butterSavings
                ? butterSavings
                : product.product_name.toUpperCase() === 'CHEESE' &&
                  isCheeseFree
                ? cheeseSavings
                : 0)
            ).toFixed(2)}
      </div>
      <hr className='border-1 w-full'/>
      <div>
          <div className='flex flex-row-reverse font-bold text-red-500'>
          {product.product_name.toUpperCase() === 'BREAD' && breadSavings
                ? 'Discount ' + breadSavings
                : product.product_name.toUpperCase() === 'BUTTER' &&
                butterSavings
                ? 'Discount ' +
                butterSavings 
                : product.product_name.toUpperCase() === 'CHEESE' &&
                  isCheeseFree
                ? 'Free Cheese Qty ' +
                  freeCheeseCount +
                  ' piece & Discount ' +
                  cheeseSavings
                : null}
          </div>
          <hr className='border-1 w-full'/>
      </div>
    </div>
            ))}
    {productDetails.length !== 0 ?
    (<Bill {...{subTotal, savings, totalAmount}}
    />
    ) : null}
    </div>
  );
}

export default Cart;
