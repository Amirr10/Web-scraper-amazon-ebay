import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './Navbar'

class App extends Component {

  render() {

    // window.addEventListener("load", () => {
    //   let root = document.querySelector('#root')
    //   let wrapLoader = document.querySelector('.wrap-loader')
    //   setTimeout(() => {
    //     root.removeChild(wrapLoader)
    //   }, 1200);
    // })

    return (
      <Router>
        <React.Fragment>
          {/* <div className="wrap-loader" >
            <div className="loader"></div>
            <div className="loader2"></div>
            <div className="loader3"></div>
          </div> */}

          <div className="App">
           <Navbar />
          </div>
      </React.Fragment>
      </Router>
    )
  }
}

export default App