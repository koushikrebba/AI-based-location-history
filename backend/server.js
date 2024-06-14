const exp=require('express')
const app=exp()
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const mc=require('mongodb').MongoClient
const path=require('path')
const cors = require('cors')
app.use(cors())

mc.connect('mongodb+srv://srimanikantaBattu:XeoXcx5n7a0r9Qtu@srimanikanta-cluster.pvapart.mongodb.net/writespot?retryWrites=true&w=majority&appName=srimanikanta-cluster')
.then(client=>{
    const dbObj=client.db('geochronicle')
    const usersCollectionObj=dbObj.collection('usersCollection')
    app.set('usersCollectionObj',usersCollectionObj)
    console.log('DB Connection success')
})
.catch(err=>{
    console.log('DB Connection err',err)
})

app.use((req,res,next)=>{
    usersCollectionObj=req.app.get('usersCollectionObj')
    next()
})

app.use(exp.json())

app.post('/new-user',async(req,res)=>{
    const newUser=req.body
    const dbres= await usersCollectionObj.findOne({email:newUser.email})
    if(dbres!==null){
        res.send({message:'user existed'})
    }else{
        const hashedPassword=await bcryptjs.hash(newUser.password,6)
        newUser.password=hashedPassword
        const dbres1=await usersCollectionObj.insertOne(newUser)
        if(dbres1.acknowledged===true){
            res.send({message:'user created'})
        }else{
            res.send({message:'try again, user not created'})
        }
    }
})

app.post('/login',async(req,res)=>{
    const userCredObj=req.body;
    const dbUser= await usersCollectionObj.findOne({email:userCredObj.email})
    if(dbUser===null){
        res.send({message:'invalid email'})
    }else{
        const status=await bcryptjs.compare(userCredObj.password,dbUser.password)
        if(status){
            const signedToken=jwt.sign({user:dbUser},'abcdefgh',{expiresIn:'1d'})
            res.send({message:'login success',token:signedToken,user:dbUser})
        }
        else
        {
            res.send({message:'invalid password'})
        }
    }
})



// app.use((req,res,next)=>{
//     res.sendFile(path.join(__dirname,'../client/build/index.html'))
// })

app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})

app.listen(4000,()=>console.log('server running on 4000...'))