import React, { Component } from 'react'
import Product from './Product'
import data from './product.json'
import { connect } from 'react-redux'

class Products extends Component {


    getGarden = () => {
        const newData = data

        let obj = newData.filter(obj => obj.category === "Garden").map(name => (
            <Product one={name.category} price={name.price} key={name.id} />
        ))
        return obj
    }

    getForks = () => {
        const newData = data

        let obj = newData.filter(obj => obj.category === "Forks").map(name => (
            <Product one={name.category} price={name.price} key={name.id} />
        ))
        return obj
    }

    getTools = () => {
        const newData = data

        let obj = newData.filter(obj => obj.category === "Tools").map(name => (
            <Product one={name.category} price={name.price} key={name.id} />
          ))
        return obj
    }

    loadData = (id) => {
        let pageString = 1
        let page = parseInt(pageString)
        let obj

        if(this.props.prod) { 

        switch(page){
            case 0:
               obj = this.getTools()
                break;
            case 1: 
                obj = this.getForks()
                 break;
            case 2:
                obj = this.getGarden()
                break;
            default:
                pageString = "Error , try again"  
        } 
    } 

        return obj
    }

    render() {
        console.log(this.props.match.params.id)
        let page = this.props.match.params.id
        let p = parseInt(page)
        let products = this.loadData(p)

        return (
            <React.Fragment>
            <div className="grid-prod">
          
              {products}

            </div>

            <div className="toggle-wrap">
                <button className="toggle-btn" onClick={this.props.prod ? this.props.noProd : this.props.onProd}>Toggle</button>
            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        prod: state.prodred.prod
    }
}

const mapDispatchToProps = dispatch => {
    return {
        noProd: () => dispatch({type: 'OFF'}),
        onProd: () => dispatch({type: 'ON'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
