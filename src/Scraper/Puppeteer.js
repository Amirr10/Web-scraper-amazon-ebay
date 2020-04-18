import React, { Component } from 'react'
import  { connect } from 'react-redux'
import Dynnamic from './Dynnamic'


class Puppeteer extends Component {

    stete = {
       input:"",
       flag: false,
    };

    componentDidMount(){

    }

    scrapeImages = async (url) => {
        const body = {
            url
        }
        const headers = {
            "Content-Type":"application/json"
        }
    
       await fetch(`http://localhost:5000/puppeteer`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
          .then(data => {
            let obj = this.setImages(data)
            this.props.loadImg(obj)

            })
        .catch(err => console.log(err))

    }


    scrapeSearch = async (url) => {
        
        const origin = 'https://www.amazon.com/ref=nav_logo'
        const search = `https://www.amazon.com/s?k=${url}&ref=nb_sb_noss_1`
        const body = {
            url,
            origin,
            search
        }
        const headers = {
            "Content-Type":"application/json"
        }
    
       await fetch(`http://localhost:5000/search`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
          .then(data => {
            let obj = this.setImages(data)
            this.props.loadImg(obj)
            })
        .catch(err => console.log(err))

    }

    
    setImages = (pics) => {
        let imgs = pics
        this.setState({input:''})
        console.log("SetIMAGES", imgs)
        return <Dynnamic image={imgs} /> 
    }


    handleChange = (event) => {
        this.setState({input: event.target.value});
    }


    handleSubmit = (e) => {
        e.preventDefault()
        const url = this.state.input
        console.log(url)
        // this.scrapeImages(url)
        this.scrapeSearch(url)
    }


    render() {        
        console.log(this.props.imgs);

        return (
            <React.Fragment>
             
            <div className="puppet">
                    <h1 className="title">Compare Prices Web Scraper</h1>

                    <div className="puppet-form">
                        <form className="form-input" onSubmit={this.handleSubmit}>
                            <input type="text" className="puppet-input" placeholder="Search for anything" onChange={(e) => this.handleChange(e)} />
                            <input type="submit" className="btn-scrape" value="Search" />
                        </form>
                    </div>
                

                

                {!this.props.prod ? 
                        <div className="dyn-wrap">
                        <Dynnamic images={this.props.imgs} /> 
                        </div>
               : ""}            
           
            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        prod: state.prodred.prod,
        count: state.prodred.counter,
        imgs: state.prodred.images,
        inp: state.prodred.input
    }
}

const mapDispatchToProps = dispatch => {
    return {
        noProd: () => dispatch({type: 'OFF'}),
        onProd: () => dispatch({type: 'ON'}),
        loadImg: (image) => dispatch({type: 'LOAD', payload: image}),
        inputFun: (e) => dispatch({type: 'INPUT', payload:e})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Puppeteer)

