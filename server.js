const express = require('express');
const dbOperation = require('./dbfiles/dboperation.js');
const cors = require('cors');

const API_PORT = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route to get all persons
app.get('/api/getPerson', async (req, res) => {
    try {
        const result = await dbOperation.getAllPerson();
        res.json(result.recordset);
    } catch (error) {
        console.error('Error in /api/getPerson:', error);
        res.status(500).send({ success: false, message: 'Failed to fetch persons', error });
    }
});

// Route to create a person
app.post('/api/createPerson', async (req, res) => {
    console.log('Request Body:', req.body); // Debug incoming data
    try {
        const result = await dbOperation.createPerson(req.body);
        console.log(result.recordset);
        
        res.status(201).send({ success: true, message: 'Person created successfully', result });
    } catch (error) {
        console.error('Error in /api/createPerson:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error', error });
    }
});

// Route to delete a person
app.post('/api/deletePerson', async (req, res) => {
    try {
        if (!req.body.ID) {
            return res.status(400).send({ success: false, message: 'ID is required to delete a person' });
        }
        const result = await dbOperation.deletePerson(req.body.ID);
        res.status(200).send({ success: true, message: 'Person deleted successfully', result });
    } catch (error) {
        console.error('Error in /api/deletePerson:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error', error });
    }
});

//'update person
app.post('/api/updatePerson', async (req, res) => {
    const result =await dbOperation.updatePerson(req.body);
    res.json({ message: 'Update successfully' });  
    
});

// Start the server
app.listen(API_PORT, () => console.log(`Listening on port http://localhost:${API_PORT}`));
