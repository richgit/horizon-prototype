const express = require('express')
const next = require('next')

const PORT = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const pronto = require('./pronto')

app.prepare().then(() => {
    const server = express()

    server.get('/test', (req, res) => {
        console.log('server.js:test')
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({a: 1}));
    })

    // Pronto API
    server.use("/pronto", pronto);

    server.get('*', (req, res) => {
        console.log('into nextjs');
        return handle(req, res)
    })

    server.listen(PORT, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${PORT}`)
    })
})