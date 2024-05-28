const { insertEmployee } = require('./db.js');
const { getEmployees } = require('./db.js');
const { updateEmployee } = require('./db.js');
const { deleteEmployee } = require('./db.js');

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());

app.post('/insertEmployee', async (req, res) => {
    const { nume, prenume, email, telefon, functie } = req.body;
    console.log('Received request to insert employee', { nume, prenume, email, telefon, functie });
    insertEmployee(nume, prenume, email, telefon, functie);
    res.status(200).json({ message: 'Employee inserted' });
});

app.get('/getEmployees', async (req, res) => {
    const employees = await getEmployees();
    res.status(200).json(employees);
    return employees;
});

app.put('/updateEmployee', async (req, res) => {
    const { id, nume, prenume, email, telefon, functie } = req.body;
    console.log('Received request to update employee', { id, nume, prenume, email, telefon, functie });
    updateEmployee(id, nume, prenume, email, telefon, functie);
    res.status(200).json({ message: 'Employee updated' });
});

app.delete('/deleteEmployee', async (req, res) => {
    const { id } = req.body;
    console.log('Received request to delete employee', { id });
    deleteEmployee(id);
    res.status(200).json({ message: 'Employee deleted' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
