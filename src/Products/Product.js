import React from 'react'
import { connect } from 'react-redux'

 function Product(props) {

     let newLine = <br /> 
     let space = " "
     let dataSpace = [props.one, space, props.price] 

     return (
        <div className="container-prod">

            <div className="item">
                <div className="pic">Pic</div>
                <div className="details">
                    <p>Price - {props.price}</p>
                    <p>{props.one}</p>
                    <button className="btn" onClick={() => props.addItem(dataSpace, newLine)}>Add To List</button>

                    {props.ct}
                </div>
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
        addItem: (result,price) => dispatch({type:'ADD', payload: result, price: price}),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
