import React from 'react'

const Dynnamic = (props) => {

    //amazon data
    let pics = props.images.props.image[0][0]
    let desc = props.images.props.image[0][1]
    let price = props.images.props.image[0][2]

    console.log(desc, "From TEST!")

    //ebay data
    let epics = props.images.props.image[1][0]
    let edesc = props.images.props.image[1][1]
    let eprice = props.images.props.image[1][2]


    return (
        <React.Fragment>
        <div className="dynPic">
            <h1 className="amazon-title">Amazon</h1>
           { pics.map((pic,i) => 
           <div className="dyn-cover">
               <img key={i} className="imgDynnamic" src={pic} alt=""/>
                 <p className="dynText">{desc[i]}</p>
                 <p className="dynText">{price[i]}$</p>
                 <button className="link-btn">Buy from Amazon</button>
            </div>
           )
           }
        </div>


        <div className="dynPic2">
        <h1 className="amazon-title">Ebay</h1>
          { epics.map((pic,i) => 
           <div className="dyn-cover">
               <img key={i} className="imgDynnamic" src={pic} alt=""/>
                 <p className="dynText">{edesc[i]}</p>
                 <p className="dynText">{eprice[i]}$</p>
                 <button className="link-btn">Buy from Ebay</button>
            </div>
           )
          
           }
        </div>
        </React.Fragment>
    )
}


export default Dynnamic