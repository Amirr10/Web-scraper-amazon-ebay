const initialState = {
    cart: [],
    price:0
}

const cartReducer = (state = initialState, action) => {

    switch(action.type){
        case 'ADD':
            return {
                ...state,
                cart: state.cart.concat(action.payload, action.price)
            }
            
            default:
                break;
    }
    return state;
}

export default cartReducer
