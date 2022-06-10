import { useContext,useEffect ,useState} from "react";
import CartContext from '../../Store/cart-context';
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCardButton.module.css';
const HeaderCardButton=(props)=>{
    const [buttonIsHighlighted,setButtonIsHighlighted]=useState(false);
    const cartCtx=useContext(CartContext);
   
    const {items}=cartCtx;
    const numberOfCartItems=items.reduce((curNumber,item)=>{
        return curNumber+item.amount;
    },0);

    const btnClasses=`${classes.button} ${buttonIsHighlighted? classes.bump:''}`;
    useEffect(()=>{
        if(items.length===0){
            return;
        }
     setButtonIsHighlighted(true);
     const timer=setTimeout(()=>{
         setButtonIsHighlighted(false);
     },300)
     return ()=>{
         clearTimeout(timer);
     };
    },[items])
     return(
         <button className={btnClasses} onClick={props.onClick}>
             <span className={classes.icon}>
                   <CartIcon />
             </span>
             <span>YOUR CART</span>
             <span className={classes.badge}>{numberOfCartItems}</span>
         </button>
     );
};

export default HeaderCardButton;