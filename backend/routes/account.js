const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const mongoose = require('mongoose'); 

const router = express.Router();

router.get('/balance', authMiddleware, async(req, res)=>{
    userId=req.userId;
    const account = await Account.findOne({userId});
    res.status(200).json({
        balance : account.balance,
    }) 
});

router.put('/deposit', authMiddleware, async(req, res)=>{
    const {amount} = req.body;
    const userId = req.userId;
    try{
        
        await Account.updateOne({userId}, {$inc : {balance:amount}})
        res.json({message : `${amount} deposited successfully`})

        const updatedAccount = await Account.findOne({userId});
        console.log(updatedAccount);
    }catch(err){
        console.error("Error depositing amount:", err);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.post('/transfer', authMiddleware, async(req, res)=>{
    //zod not required cause this request will  be entirely handled by the frontend and no info provided by the user
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount, to }= req.body;
    const account = await Account.findOne({userId: req.userId}).session(session);
    if(!account || account.balance < amount){
        await session.abortTransaction();
        res.status(400).json({
            message : 'Insufficient balance'
        });
    }  
    const toAccount = await Account.findOne({userId: to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        res.status(400).json({message : 'Account not found'});
    }

    //perforn the transaction
    await Account.updateOne({userId: req.userId},{$inc:{balance: -amount}}).session(session);
    await Account.updateOne({userId: to},{$inc:{balance: amount}}).session(session);
    
    //commit
    await session.commitTransaction();
    res.status(200).json({
        message : 'Transfer successful'
    });

});
module.exports = router; 