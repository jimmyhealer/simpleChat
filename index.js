const express = require('express')
const app = express()
const port = 8080

const { MongoClient } = require('mongodb')
const url = `mongodb+srv://jimmyhealer:ugLZ60h5V5wyN0qP@cluster0.yrsgmrl.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(url)

let chatArray = []

app.use(express.static('public'));
app.use(express.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/chat', (req, res) => {
  res.json({
    status: 'success',
    data: chatArray
  })
})

app.post('/chat', (req, res) => {
  chatArray.push({
    id: chatArray.length,
    message: req.body.message,
    name: req.body.name,
    time: new Date(),
  })
  res.json({
    status: 'success',
    data: chatArray
  })
})

app.delete('/chat', (req, res) => {
  chatArray = []
  res.json({
    status: 'success',
  });
})

app.get('/get', async (req, res) => {
  try {
    const chatDB = client.db('Chat').collection('chat')
    const chatData = await chatDB.findOne({ name: 'chatDatav0' })

    chatArray = chatData.data
    res.json({
      status: 'success',
      data: chatArray
    })
  } finally {
    // await client.close()
  }
})

app.get('/save', async (req, res) => {
  try {
    const chatDB = client.db('Chat').collection('chat')
    const updateDoc = {
      $set: {
        data: chatArray
      },
    }
    const chatData = await chatDB.updateOne({ name: 'chatDatav0' }, updateDoc)

    res.json({
      status: 'success',
      data: chatArray
    })
  } finally {
    // await client.close()
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
