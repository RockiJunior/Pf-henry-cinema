import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { decrementCartStorage, clearCart, incrementCartStorage } from '../../redux/carts/cartsActions';

import { cinemaSelect, screeningSelect } from '../../redux/carts/cartsActions';

import './CartItem.css'



export default function CartItem  ({image, price, title, id, quantity, fillState}) {
//  const {cart} = useSelector(state => state.cartReducer)
   const history = useHistory()
   // const [stateCart, setStateCart] = React.useState([])
   const {cinemas} = useSelector(state => state.cartReducer) 
   const {screening} = useSelector(state => state.cartReducer) 

   const dispatch = useDispatch()

   function handleCinema(e) {
      e.preventDefault();
      dispatch(cinemaSelect(e.target.value));
   }

   function handleScreening(e) {
      e.preventDefault();
      dispatch(screeningSelect(e.target.value));
   }
 
   function handleIncrement(){
dispatch(incrementCartStorage(id))
// const {cart} = (state => state.cartReducer)
// console.log("entro tomi",cart)

   } 

   function handleDecrement(){

      dispatch(decrementCartStorage(id))
   } 

   function handleClearCart(){
      dispatch(clearCart())
      localStorage.removeItem('id');
      history.push('/')
      window.location.replace('')
   }
   
   function round(num) {
      var m = Number((Math.abs(num) * 100).toPrecision(15));
      return Math.round(m) / 100 * Math.sign(num);
  }
    
   return (
   <div>
      <div className="CartItemContainer">

         <div className="CartItemImage">
            <img src={image} alt="imagen no encontrada" height='250'/>
         </div>

         <div className="CartItemInfo">

            <div>
               <h2>{title}</h2>
            </div>

            <div className="CartItemSelect">
               <div className="ContainerSelect">
                  <select className="Select" onChange={(e) => handleCinema(e)}>
                     <option value="All">Cinemas</option>
                     {cinemas &&
                     cinemas.map((cinema, index) => {
                        return (
                           <option key={index} value={cinema.id}>
                           {cinema.name}
                           </option>
                        );
                     })}
                  </select>
               </div>
            </div>

            <div className="CartItemSelect">
               <div className="ContainerSelect">
                  <select className="Select" onChange={(e) => handleScreening(e)}>
                     <option value="All">Funciones</option>
                     {screening &&
                     screening.map((screen, index) => {
                        return (
                           <option key={index} value={screen.id}>
                           {screen.time}
                           </option>
                        );
                     })}
                  </select>
               </div>
            </div>


         </div>

         <div className="CartPrice">

            <div className="Price">
               <h3> Precio: $ {price} </h3>
            </div>
      
            <div className="Tickets">
               <div style={{width: 250, margin: '0 auto', textAlign: 'center'}}>
                  <h3>Cantidad de boletos:</h3> 
                
                  <button onClick={handleIncrement} className="CartItemButton" >+</button>
                  <button onClick={handleDecrement} className="CartItemButton">-</button>
                  <div className="Quantity">{quantity}</div>
               </div>
               <div className="Total">
                  <h2>TOTAL: ${ round(price*quantity) }</h2>
               </div>
            </div>

         </div>

      </div>
      <div className="CartItemDeleteContainer">
         <button onClick={handleClearCart} className="CartItemDelete">Vaciar Carrito</button> 
      </div>
   </div>
   )
}