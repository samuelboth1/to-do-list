const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 5000;

const Schema = mongoose.Schema;
const app = express();

var schemaName = new Schema({
    value: String,
    id: Number
}, {
    collection: 'tasks'
});

var Model = mongoose.model('Model', schemaName);
mongoose.connect('mongodb://localhost:27017/toDoListdb');


app.get('/api/tasks', cors(), (req, res) => {
    
    Model.find((err, result) => {
        if(err) throw err;
        if(result){
            res.json(result);
        } else{
            res.send(JSON.stringify({
                error : 'Error'
            }));
        }
    });
});
// get submitted value
app.post('/save/task', cors(), (req, res) => {

    var save = new Model({
        "value":  req.body.value,
        "id":  req.body.id
    }).save((err, result) => {
        if(err) throw err;

        if(result){
            res.json(result);
        }
    }); 

});



app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});