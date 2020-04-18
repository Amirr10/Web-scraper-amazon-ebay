import React, { Component } from 'react'
import Cart from './Cart'
import Products from './Products/Products'
import Puppeteer from './Scraper/Puppeteer'
import {Route, Link} from 'react-router-dom'

class Navbar extends Component {

    render() {
        return (
            <div className="sub-app">
                <div className="navbar">
                    <ul className="first-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/puppeteer">Web Scraper</Link></li>
                        <li><Link to="/products">Products</Link></li>
                    </ul>

                    <ul className="first-nav-mycart">
                        <li><Link to="/cart">My Cart</Link></li>
                    </ul>
                </div>
                    
                <Route path="/" exact component={Puppeteer} />
                <Route path="/products" exact component={Products} />
                <Route path="/cart" component={Cart} />
                <Route path="/puppeteer" component={Puppeteer} />


                <div className="footer">

                </div>
                
            </div>
        )
    }
}

export default Navbar
