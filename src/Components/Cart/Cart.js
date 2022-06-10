import classes from './Cart.module.css';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import React, { useContext,useState } from 'react';
import CartContext from '../../Store/cart-context';
import Checkout from './Checkout';
const Cart=props=>{
    const [isCheckout,setIsCheckout]=useState(false);
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [didSubmit,setDidSubmit]=useState(false);
    const cartCtx=useContext(CartContext);
    const totalAmount=`Rs.${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems=cartCtx.items.length>0;
    const cartItemRemoveHandler=id=>{ 
        cartCtx.removeItem(id);
    };0
    const cartItemAddHandler=item=>{
        cartCtx.addItem({...item,amount:1});
    };

    const orderHandler=()=>{
       setIsCheckout(true);
    }


    const submitOrderHandler=async(userData)=>{
        setIsSubmitting(true);
        await fetch('https://reactfood-http-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                orderedItems:cartCtx.items
            })
        });
       setIsSubmitting(false);
       setDidSubmit(true);
       cartCtx.clearCart();
    }
    const cartItems=<ul className={classes['cart-items']}>{cartCtx.items.map((item)=><CartItem key={item.id} id={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)}/>)}</ul>;



    const modalActions=<div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>CLOSE</button>
    {hasItems &&<button className={classes.button} onClick={orderHandler}>ORDER</button>}
</div>

const cartModalContent=
<React.Fragment>
          {cartItems}
           <div className={classes.total}>
                <span>TOTAL AMOUNT</span>
                <span>{totalAmount}</span>
           </div>
        {isCheckout &&<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
        {!isCheckout && modalActions}
</React.Fragment>

const isSubmittingModalContent=<p>SENDING ORDER DATA...</p>

const didSubmitModalContent=
<React.Fragment>
<p>SUCCESSFULLY SENT THE ORDER!!!</p>
<div className={classes.actions}>
    <button className={classes.button} onClick={props.onClose}>CLOSE</button>
</div>
</React.Fragment>

   return (
       <Modal onClose={props.onClose}>
           {!isSubmitting && !didSubmit && cartModalContent}
           {isSubmitting && isSubmittingModalContent}
           {!isSubmitting &&didSubmit && didSubmitModalContent}
       </Modal>
   );
};
export default Cart;