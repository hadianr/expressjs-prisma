const express = require('express');
const { PrismaClient } = require('@prisma/client')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const prisma = new PrismaClient()

app.use(bodyParser.json())

function LoggerMiddleware(req, res, next){
    console.log(`Request api received at: ${new Date()}`)
    next();
}


app.get('/', (req, res) => {
    res.send('Hello World');
})

// endpoint get all customers
app.get('/customers', async (req, res) => {
    const { keyword, search } = req.query;

    const result = await prisma.players.findMany();

    res.json({
        message: 'Get list all data players is succesfully',
        data: result
    })
})

app.use(LoggerMiddleware);


// endpoint get detail customers by id
app.get('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    res.json({
        message: `Get detail data customers by id ${customerId} is succesfully`,
        data: {
            id: customerId,
            name: 'Hadian Rahmat',
            email: 'hadian.rahmat@gmail.com',
            role: 'jungler'
        }
    })
})

// endpoint post customers
app.post('/customers', async (req, res) => {
    const { name, email, role, bio } = req.body

    const result = await prisma.players.create({
        data:{
            name,
            email,
            role,
            bio
        }
    })

    res.json({
        message: 'Create data players is successfully',
        data: result
    })
})

// endpoint update customers by id
app.put('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    res.json({
        message: `update data customer by id ${customerId} is successfully`,
        data:
            {
                id: customerId,
                name: 'Hadian Garnacho',
                email: 'hadian.garnacho@gmail.com',
                role: 'Winger',
                created_at: '2023/11/27 20:30:00',
                updated_at: '2023/11/27 20:41:00'
            }
    })
})

// endpoint delete customers by id
app.delete('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    res.json({
        message: `delete data customer by id ${customerId} is successfully`,
        data: {}
    })
})

app.listen(port, () => {
    console.log(`example app listing on port http://localhost:${port}`);
})