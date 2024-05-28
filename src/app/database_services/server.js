const { insertEmployee } = require('./db.js');
const { getEmployees } = require('./db.js');

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());

app.post('/insertEmployee', async (req, res) => {
    const { nume, prenume } = req.body;
    console.log('Received request to insert employee', { nume, prenume });
    insertEmployee(nume, prenume);
    res.status(200).json({ message: 'Employee inserted' });
});

app.get('/getEmployees', async (req, res) => {
    const employees = await getEmployees();
    res.status(200).json(employees);
    return employees;
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
