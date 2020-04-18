const cors = require("cors");
const express = require('express');
const puppeteer = require("puppeteer");
const mongoose = require('mongoose');
const app = express();

require('dotenv').config;
// console.log(process.env.DB_CONNECT)   

const Amazon = require('./models/amazon-schema');


mongoose.connect('mongodb://localhost:27017/users', 
{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
() => console.log("Connected to DB"))

const { v4: uuidv4 } = require('uuid');
uuidv4();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Worked");
});


function amazonToDb(object) {

    const amazon = new Amazon({
        image: object[0],
        description: object[1],
        price: object[2]
    });

    amazon.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));

}


//Scrape from Ebay function
 async function scrapeEbay(url){
    let combine

    let ebayUrl = `https://www.ebay.com/`
    let ebayUrlWithSearch = `https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw=${url}&_sacat=0`

    console.log(ebayUrl, "from ebay img")
    console.log(ebayUrlWithSearch, "from ebay img")


    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(ebayUrl)

    //input field and search button
    await page.type('#gh-ac', `${url}`)
    await page.click('.gh-spr')

    await page.waitFor(2500);
    await page.screenshot({path:'example2.jpg'})

    //get images
    const ebayImg = await page.$$eval('.s-item__image-wrapper' , ebayImg => ebayImg.splice(0,6).map((inr,i) => 
    inr.querySelector('img').getAttribute('src')
    ))
    console.log(ebayImg, "EBAYIMG")

    //get description
    const lineDesc = await page.$$eval('.s-item__title--has-tags' , desc => desc.splice(0,6).map((inr,i) => 
            inr.innerText
    ))
    console.log(lineDesc)

    //get price
    const linePrice = await page.$$eval('.s-item__price' , desc => desc.map((inr,i) => 
        inr.innerText
    ))
    let parsePrice = linePrice.map(el => parseInt(el))
    console.log(linePrice)


    combine = [ebayImg,lineDesc, linePrice]
    browser.close();

    return combine
}


//Scrape from Amazon function
async function scrapeAmazon(origin, url){
    let combine

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(origin)

    //input field and search button
    await page.type('#twotabsearchtextbox', `${url}`)
    await page.click('.nav-input')
    await page.screenshot({path:'example.png'})

    const element = await page.$('.aok-relative.s-image-fixed-height')

    if(element === null){
        console.log("THis is From element")
        
        //get images
        const lineEl = await page.$$eval('.s-image-square-aspect' , innerText => innerText.splice(0,6).map((inr,i) => 
        inr.querySelector('img').getAttribute('src')
        ))
    
        //get description
        const lineDesc = await page.$$eval('.a-size-base-plus.a-color-base.a-text-normal' , desc => desc.splice(0,6).map((inr,i) => 
            inr.innerText
        ))
    
        //get price
        const linePrice = await page.$$eval('.a-price-whole' , desc => desc.map((inr,i) => 
        inr.innerText
        ))
        let parsePrice = linePrice.map(el => parseInt(el))
    
        console.log(parsePrice)
        console.log(lineEl)
        console.log(lineDesc)
    
        const dup = new Set(lineDesc)
        const dupArray = Array.from(dup)
        console.log(dupArray, "first IF");
    
         combine = [lineEl, dupArray, parsePrice]

        //Save in DB
        //amazonToDb(combine)
         
         browser.close();
    
        } else {

         //get images 
        const innerText = await page.$$eval('.aok-relative.s-image-fixed-height' , innerText => innerText.splice(0,6).map((inr,i) => 
            inr.querySelector('img').getAttribute('src')
        ))
        
        //Descriptions pics
        const desc = await page.$$eval('.a-size-medium.a-color-base.a-text-normal' , desc => desc.splice(0,6).map((inr,i) => 
            inr.innerText
        ))
    
        //get price
        const linePrice = await page.$$eval('.a-price-whole' , desc => desc.splice(0,6).map((inr,i) => 
        inr.innerText
        ))

        let parsePrice = await linePrice.map(el => parseInt(el))
        console.log(parsePrice)
    
        const dup = new Set(desc)
        const dupArray = Array.from(dup)
        console.log(dupArray, "Else");
    
         combine = [innerText, dupArray, parsePrice]
        //amazonToDb(combine)
    
         browser.close();
        }

        return combine
}


//route for searching through Amazon/Ebay with web scraping
app.post("/search", async (req,res) => {
    
    const { url, origin, search } = req.body;
    let ebayUrl = `https://www.ebay.com/`
    let ebayUrlWithSearch = `https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw=${url}&_sacat=0`

    console.log(url);
    console.log(origin);
    console.log(search);

    //Call scraping functions from amazon and ebay
    let data = await scrapeAmazon(origin, url)
    let ebayData = await scrapeEbay(url)
    console.log(ebayData)

    // put all returned data and send it to client
    let allData = [data, ebayData]

    res.send(allData);
});


app.listen(5000, () => console.log("Connected"));