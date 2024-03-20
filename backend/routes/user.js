const express = require('express');
const zod = require('zod');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwt_code } =require ('../config');
const { User, Account } = require ('../db');
const { authMiddleware } = require('../middleware');

const router = express.Router();

const saltRounds=5;
//username is the email
const signupSchema=zod.object({
    username : zod.string().email(),
    firstname : zod.string(),
    lastname : zod.string(),
    password : zod.string(),
})

const signinSchema=zod.object({
    username: zod.string().email(),
    password : zod.string(),
})
const updateSchema=zod.object({
    firstname: zod.string().optional(),
    lastname : zod.string().optional(),
    password : zod.string().optional(),
})

//signin and signup can be hit by all users, but we need middlewares to gate the routes only authenticated users can hit
router.post('/signup',async(req,res)=>{
    const {success} = signupSchema.safeParse(req.body);
    if(success){
        const existingUser = await User.findOne({username: req.body.username});
        if(existingUser){
            res.status(411).json({message:"Email already taken"})
        }
        const hashedPassword = await bcrypt.hash(req.body.password,saltRounds);

        const newUser = await User.create({
            username : req.body.username,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            password : hashedPassword
        });
        const userId = newUser._id;

        //allot a random balance to user
        try{
            await Account.create({
                userId,
                balance : Math.floor(Math.random()*10000),
            })
        }catch(e){
            console.log("couldn't create bank account")
            console.error(e.message);
            res.json({
                message: "Couldn't create bank account",
            })
        }
        
        //only encoding the _id of each user
        const token = jwt.sign({userId},jwt_code)
        res.json({
            message: "User created successfully",
            token
        })
    }else{
        res.status(411).json({ 	message: "Incorrect inputs"    })
    }
})

router.post("/signin",async(req,res)=>{
    const{success} = signinSchema.safeParse(req.body);
    if (success){
        const user = await User.findOne({username: req.body.username});
        if(user){
            const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
            if(passwordIsValid){
                const token = jwt.sign({userId : user._id}, jwt_code);
                res.status(200).json({
                    message : "Logged in successfully",
                    token
                })
            }else{
                res.status(411).json({message : "wrong password"})
            }
        }else{
            res.status(411).json({message : "User not found"})
        }

    }else{
        res.status(411).json({ 	message: "Incorrect inputs"    })  
    }
})
//update user info
router.put('/',authMiddleware, async(req,res)=>{
    const {success} =  updateSchema.safeParse(req.body);

    if(success){

        const update ={$set : req.body} 

        await User.updateOne({
            _id: req.userId,
        }, update);
        res.json({message: "User updated successfully"})

    }else{
        res.status(411).json({message : "Error while updating"})
    }
})
//just get the info of user logged in
router.get('/about',authMiddleware, async(req,res)=>{
    try {
        const user = await User.findOne({_id: req.userId});
        const account =  await Account.findOne({userId : req.userId});
        res.json({
            userId : req.userId,
            firstname : user.firstname,
            lastname : user.lastname,
            balance : account.balance,
        });
    } catch(err){
        console.error(err);
        res.status(500).json({message: "Internal Server Error"})
    }
})

router.get('/bulk',authMiddleware, async(req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $and:[
            {
                $or: [
                    { firstname: { $regex: new RegExp(filter, 'i') } }, // creates a "regular Expression" object with the filter and setting it as case insensitive
                    { lastname: { $regex: new RegExp(filter, 'i') } }
                ]
            },
            {
                _id: {$ne: req.userId},
            }
        ]
    });
    res.json({
        users : users.map(user=>({
            username : user.username,
            firstname : user.firstname,
            lastname : user.lastname,
            _id : user._id,
        }))
    })
})
module.exports = router; 