
const express = require('express');
const app = express();
let fs = require('fs');
let bodyParser = require("body-parser");
app.use(bodyParser.json());

//Accounts from json
let accounts = JSON.parse(fs.readFileSync('accounts.json', 'utf8'))

//Account queue
let queue = [];

app.get('/list', (req, res) => {
    next();
    let data = {
        "accounts": accounts
    };
    res.send(data)
});

app.get('/next',(req,res)=>{
    let user = next();
    let pass = accounts[user];
    
    console.log("Grabbing cookies of "+user+"...");
    const puppeteer = require('puppeteer');
    puppeteer.launch({ headless: true }).then(async browser => {
        const page = await browser.newPage();
        await page.setViewport({ width: 640, height: 400 })
        await page.goto('https://www.instagram.com/accounts/login/?force_classic_login', { waitUntil: 'networkidle2' });

        await page.type('#id_username', user);
        await page.type('#id_password', pass);
        await page.click(".button-green");

        await page.waitForNavigation();
        const cookies = await page.cookies();
        await browser.close();

        let data = {
            "cookies": cookies,
            "account": user
        };
        res.send(data);
    });
});

app.post('/add', (req, res) => {
    let data = {
        "status": "failed"
    };
    if (typeof req.body.username !== "undefined" &&
        typeof req.body.password !== "undefined" &&
        typeof accounts[req.body.username] === "undefined") {
        let user = req.body.username;
        let pass = req.body.password;
        accounts[user] = pass;
        data.status = "success";
        data["accounts"] = accounts;
    }
    res.send(data);
});

app.listen(4000, () => {
    console.log("Listening on port 4000")
});

function initQueue(){
    console.log("Initiating queue...");
    for (const key in accounts) {
        queue.push(key);
    }
}

function next(){
    //Returns next account
    let out = queue.shift();
    queue.push(out);
    return out;
}

initQueue();