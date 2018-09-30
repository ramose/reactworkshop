import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import Product from './Product';
import ShoppingCart from './ShoppingCart';

class App extends Component {
  state = {
    cartItems : [],
    products : []
  };

  handleAddItemToCart = product => {
    console.log("handleAddItemToCart:",product);
    let cartItems = this.state.cartItems;

    const alreadyExists = cartItems.some(
      (cartItem) => cartItem.product.id === product.id
    )

    console.log(alreadyExists);

    if(alreadyExists){
      cartItems = cartItems.map(cartItem => {
        if(cartItem.product.id === product.id){
          cartItem.quantity = cartItem.quantity + 1;
        }

        return cartItem;
      })

    } else {
      cartItems.push({
        product:product,
        quantity:1
      });
      
    }

    this.setState({cartItems:cartItems});
    
    console.log(this.state.cartItems)
  }

  handleRemoveItemFromCart = product => {
    
    let cartItems = this.state.cartItems;
    const selectedIndex = cartItems.findIndex(cartItem => {
      return cartItem.product.id === product.id;
    });

    const selectedItem = cartItems[selectedIndex];

    if(selectedItem.quantity > 1){
      selectedItem.quantity--;
    } else {
      cartItems.splice(selectedIndex,1);
    }

    this.setState({cartItems:cartItems});
    
  }

  componentDidMount(){
    fetch('https://product-list.glitch.me/')
    .then(response => response.json())
    .then(products => {
      this.setState(
        {
          products:products
        }
      )
    })
  }

  render() {
    return (
      <div className="container">
        <Navbar/>  
        <div className="columns">
        <div className="column is-two-thirds">  
      <div>
        <h3 className="title">Our Products</h3>
        <div className="columns">

        {this.state.products.map((product, index) => (
          <Product 
          key={index} 
          product={product}
          onAddItemToCart={this.handleAddItemToCart}/>
        ))}

          </div>
        </div>
            
        </div>
        <ShoppingCart cart={this.state.cartItems} onRemoveItemFromCart={this.handleRemoveItemFromCart}/>
      </div>
    </div>

    );
  }
}

export default App;
