import express from 'express';
import 'dotenv/config'

const app = express()

const port = process.env.PORT|| 3000
app.use(express.json())


let teaData = []

let nextId = 1


//add a new tea
app.post("/teas", (req, res)=>{
    const {name, price} = req.body
    const newTea = {id:nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})


//get the tea by id
app.get('/teas/:id', (req, res)=>{
    const tea = teaData.find(t=>t.id == parseInt(req.params.id))

    if(!tea){
        return res.status(404).send("Tea not found")
    }

    res.status(200).send(tea)
})

//put the data
app.put('/teas/:id', (req, res)=>{
    const tea = teaData.find(t=>t.id == parseInt(req.params.id))

    if(!tea){
        return res.status(404).send("Tea not found")
    }
    const {name, price} = req.body;

    tea.name = name;
    tea.price = price;

    res.status(200).send(tea)


})


//delete the tea with id

app.delete('/teas/:id', (req, res)=>{
    const index = teaData.findIndex(t=>t.id == parseInt(req.params.id))
    

    if(index === -1){

        return res.status(404).send('tea not found')
    }

    teaData.splice(index, 1)
    return res.status(204).send('deleted')
})

//basic routing

app.get("/", (req, res)=>{
  
    res.send("Hello  from hitesh and hies tea")
})


app.get("/ice-tea", (req, res)=>{
    res.send("what ice tea would you prefer")
})


app.get("/twitter", (req, res)=>{
    res.send("jaleel.com")
})

app.listen(port, ()=>{
    console.log(`Server is running at port: ${port}...`)
    
})