const express = require("express");
const fetch = require('node-fetch');
require('dotenv').config()

const app = express();
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

app.get('/api/candle', async (req, res) => {
	await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${req.query.symbol}&resolution=M&from=${Math.floor((Date.now()/1000)-(3600*156))}&to=${Math.floor(Date.now()/1000)}&token=${process.env.FINNHUB_TOKEN_SB}`)
			.then((r) => {
				r.json().then((data) => {
					//This is horrible iteration and i'm ashamed of it
					let dataBuffer=[];
					try{
					for(const[idx, v] of data["c"].entries()){
						dataBuffer.push({
							'x':new Date(Date.UTC('2020','01','01'+idx,'23','31','30')),
							'y':[
							data["o"][idx],
							data["h"][idx],
							data["l"][idx],
							data["c"][idx]]
						}
						);
					};
				} catch {
					dataBuffer=data;
				}
					res.send(dataBuffer);
				});
			})
			.catch(res.send({"s": "BACKEND ERROR"}));
	});

app.listen(3357, () => {
	console.log("Running on port 3357")
});