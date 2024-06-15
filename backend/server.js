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
    const pastSearchesCollection=dbObj.collection('pastSearchesCollection')
    app.set('usersCollectionObj',usersCollectionObj)
    app.set('pastSearchesCollection',pastSearchesCollection);
    console.log('DB Connection success')
})
.catch(err=>{
    console.log('DB Connection err',err)
})

app.use((req,res,next)=>{
    usersCollectionObj=req.app.get('usersCollectionObj')
    pastSearchesCollection=req.app.get('pastSearchesCollection')
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


app.post('/add-past',async(req,res)=>{
    const data = req.body;
    await pastSearchesCollection.insertOne(data);
})

app.get('/past-search/:id',async(req,res)=>{
    const id = req.params.id;
    const searches = await pastSearchesCollection.find({user:id}).toArray();
    res.status(200).json(searches);
})



// app.use((req,res,next)=>{
//     res.sendFile(path.join(__dirname,'../client/build/index.html'))
// })

app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})

app.listen(4000,()=>console.log('server running on 4000...'))