const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const db = require('./public/db/db')
const bodyParser = require('body-parser');

/* inicializar o express */
const app = express()

/* enabling cors */
const cors = require('cors');
const morgan = require('morgan');
// const allowList = ['http://localhost:8081', 'http://localhost:3000']
// const corsOption = function(req, callback){
//     let corsOption;
//     corsOption = allowList.indexOf(req.header('Origin')) >= 0 ? { origin: true } : { origin: false }
//     console.log(corsOption)
//     callback(null, corsOption)
// }
app.use(morgan("dev"))
app.use(express.json())
app.use(bodyParser.json())
app.use((req, res, next)=> {

    res.header({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Method': 'GET, POST',
    })
    app.use(cors())
    next()
})

const port = normalizePort(process.env.PORT || 8080)
app.set('port', port)

app.get('/', (req, res)=>{
    res.send(`<h3>Server runing at ${app.get('port')}</h3>`)
})

app.get('/get_encartes', (req, res) => {
    const table = 'sazonalidade'
    
    db.getTable('sazonalidade')
        .then(response => res.status(200).send({response}))
        .catch(error => res.status(500).send({error}))
    
})

app.post('/get_list_produtos', (req, res) => {
    const filter = `AND nomeSazonalidade = '${req.body.sazonalName}'`
    const table = 'listaDeProdutos'
    db.getTable(table, filter)
        .then(response => res.status(200).send({response}))
        .catch(error => res.status(500).send({error}))
    
})
app.post('/update_table_sazonal', (req, res) => {
    const table = req.body.table
    db.deleteTable('sazonalidade')
    table.map(item => {
        const filds = []
        const values = []
        Object.keys(item).forEach(key => {
            filds.push(key)
            values.push(`'${item[key]}'`)
        })
        // console.log(`(${filds.join(',')})`)
        // console.log(`(${values.join(',')})`)
        db.updateTable('sazonalidade', filds, values)
    })
    res.status(200).send(table)
    // db.getTable(table, filter)
    //     .then(response => res.status(200).send({response}))
    //     .catch(error => res.status(500).send({error}))
    
})


/* criar um servidor http com as funções do express */
const server = http.createServer(app)

server.listen(port, () => {
    console.log(`Server running at: ${app.get('port')}`)

    db.connection()
        .then(console.info)
        .catch(console.info)
})

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}