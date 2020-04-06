const PouchDB = require('pouchdb')
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const m = require('./lib/main')
const opn = require('opn')

//========================================================================//
//========================================================================//

app.use(
  '/db',
  require('express-pouchdb')(PouchDB, {
    configPath: './db/config.json',
  }),
)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/:name', (req, res) => {
  var name = req.params.name
  const bundleFolder = __dirname + '/public/'
  res.sendFile(bundleFolder + name)
})

app.get('/build/:name', (req, res) => {
  var name = req.params.name
  const bundleFolder = __dirname + '/public/build/'
  res.sendFile(bundleFolder + name)
})

//========================================================================//
//========================================================================//

io.on('connection', function(socket) {
  const Main = new m(socket)
})

http.listen(35426, function() {
  console.log('listening on http://localhost:35426')
  //opn('http://0.0.0.0:35426')
})
