//------------IMPORTS-----------
//imports express to the project
const fs = require('fs')
const express = require('express');

//assigns all express methods to the app variable starts the server.
const app = express();

//makes middleware available
//This middleware allows us to modify incoming request data. 
app.use(express.json());


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//Route Handlers
//-------------------------- GET -------------------------------

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});

//notice the : in the url this specifys to use this name in the params, when this is done it
//allows you to specify id's or any type of description you want to then pull data and respond 
//with it. Also note that the ? after a name will make it optional. Meaning the url will return as much of the name as it can but not the optional if its not availale. 

app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1; //<-- req.params is important!!!
    const tour = tours.find(el => el.id === id)

    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        })
    }

    
    
    res.status(200).json({
       status: 'success',
       data: {
           tour
       }
    });
});

//--------------------------- POST's ------------------------------

app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
})

//----------------------------PATCH'S------------------------------

app.patch('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
})

//----------------------------DELETE------------------------------

app.delete('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
})

//Assigns our port to the app for listening.
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
})

