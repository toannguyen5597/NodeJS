const http = require('http')
// const bodyParser = require('body-parser')
const fs = require('fs')
const port = 3000
const express = require('express')
const app = express()
const Pool = require('pg').Pool

// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'demo',
    password: 'maimai1t',
    port: 5432,
})

app.use(function (req, res, next){
    // console.log('Request: '. req)
    // console.log('Response: ', res)
    next()
})

app.get('/', function(req, res) {
    pool.query('SELECT * FROM sinhvien', (error, results) => {
        if (error) {
            console.log('error roi: ', error)
        }
        res.status(200).json(results.rows)
      })
})

app.post('/add', function(req, res) {
    const { id, name, birthday } = req.body
    pool.query('INSERT INTO sinhvien("ID", "NAME", "BIRTHDAY") VALUES ($1, $2, $3)', [id, name, birthday], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`User added with ID: ${results.insertId}`)
  })
})

app.listen(port, function(error) {
    if(error) {
        console.log('Something when wrong ', error)
    }else{
        console.log('Server listening in port ' + port)
    }
})