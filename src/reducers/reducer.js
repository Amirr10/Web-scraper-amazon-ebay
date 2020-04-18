const initialState = {
    prod:true,
    counter: 0,
    images:[],
    input:''
}

const reducer = (state = initialState, action) => {
    if(action.type === 'OFF'){
       return {
           ...state,
           prod: false,
           counter: state.counter + 1           
       } 
    } else if (action.type === 'ON'){
        return {
            ...state,
            prod: true,
            counter: state.counter + 1
        }  
    } else if (action.type === 'LOAD'){
        console.log(action.payload, "From Load")
        return {
            ...state,
            prod: false,
            images: action.payload
        } 
    }
    return state;
}

export default reducer;
