import React from 'react'
import { connect } from 'react-redux'
// import data from './product.json'

function Cart(props) {
    const cartData = props.ct 
    
    return (
            <div className="cart-container" >
                
            <p>My List</p>
             <br />
             
            <div className="cart-items">
                {cartData}
                <br />

            </div>
            
        </div>
        )
}

const mapStateToProps = state => {
    return {
        ct: state.cred.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addItem: (result) => dispatch({type:'ADD', payload: result}),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
