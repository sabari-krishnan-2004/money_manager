const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const Transaction = require('./models/transaction');
const mongoose = require('mongoose'); // Changed import to require

app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) => {
    res.json({ body: 'test1 ok' }); 
});

app.post('/api/transaction', async(req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const { name, desc, datetime, price} = req.body;
    const transaction = await Transaction.create({name,desc,datetime,price})
    res.json(transaction);
});

app.get('/api/transactions',async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions=await Transaction.find({});
    res.json(transactions);
})

app.listen(4000, () => {
    console.log('app listening at port 4000');
});
