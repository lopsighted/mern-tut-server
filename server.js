const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Keys = require('./Keys/keys');
const items = require('./routes/api/items');
const path = require('path');

const app = express();

//body-parser middle
app.use(bodyParser.json());

const db = Keys.mongoURI;

//connect to mongo

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use('/api/items', items);

// serve static assests
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));
