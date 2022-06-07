const express = require('express');
const async = require('hbs/lib/async');
const path= require('path');
const { findOneAndUpdate, findByIdAndUpdate } = require('../toggle/models/toddle');
const Toddle = require("../toggle/models/toddle");
require("../toggle/connection/conn");

const port = process.env.PORT || 8000;
const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:false}))

const staticPath = path.join(__dirname, '/public')
app.use(express.static(staticPath))
// console.log(staticPath);
app.set("view engine", "ejs")

app.get('/toddle', async(req,res)=>{
    try {
        await Toddle.find((err, docs)=>{
            res.render('index', {
                data : docs
            })
        })
        
    } catch (error) {
        console.log(error)
    }
        
})
app.get('/edit/:id',async(req,res)=>{
    // const _id = req.params.id
    await Toddle.findOneAndUpdate({_id : req.params.id},req.body,{new:true}, (err, data)=>{
        if (err) {
            console.log('Error handelling');
        }else{
            res.render('edit', {Toddle:data})

        }
    })
})

    
    
    app.post('/toddle', async(req,res)=>{
        try {
            // console.log(req.body.name)
            const toddleData = new Toddle({
                name: req.body.name,
                profession: req.body.profession,
                age: req.body.age
            })
            const data = await toddleData.save()
            res.redirect('/toddle')
            
        } catch (error) {
            console.log(`${error}`);
            
        }
    })
    
    
    app.post('/edit/:id', async(req,res)=>{
        const _id = req.params.id
        await Toddle.findByIdAndUpdate(_id, req.body, {new: true}, (err,data)=>{
            if (err){
                console.log("Error in updating data");
            }else {
                res.redirect('/toddle')
            }
        })
        })

    app.get('/delete/:id', async(req,res)=>{
            const _id = req.params.id
        await Toddle.findByIdAndDelete({_id}, (err,data)=>{
            if (err){
                console.log("Error in deleting data");
            }else {
                res.redirect('/toddle')
            }
        })
    })
    
    
    app.listen(port, ()=>{
    console.log(`Listening to the port ${port}`);
})