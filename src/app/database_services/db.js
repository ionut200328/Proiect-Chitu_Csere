const sql = require('mssql');

const config = {
    user: 'ionut',
    password: '1q2w3e',
    server: 'KITZU-LAPTOP',
    database: 'dbJobs',
    options: {
        encrypt: false,
        enableArithAbort: true
    },
    port: 1433
};

exports.insertEmployee = async (nume, prenume, email, telefon, functie) => {
    console.log('Inserting employee', { nume, prenume, email, telefon, functie });
    const pool = new sql.ConnectionPool(config);
    try {
        await pool.connect();
        console.log('Connected to database');

        const request = pool.request();
        request.input('nume', sql.NVarChar, nume);
        request.input('prenume', sql.NVarChar, prenume);
        request.input('email', sql.NVarChar, email);
        request.input('telefon', sql.NVarChar, telefon);
        request.input('functie', sql.NVarChar, functie);

        const result = await request.query('INSERT INTO Jobs (nume, prenume, \
            email, telefon, functie) VALUES (@nume, @prenume, @email, @telefon, @functie)');
        console.log(result);
    } catch (err) {
        console.log('Error: ' + err);
    }
};

exports.getEmployees = async () => {
    const pool = new sql.ConnectionPool(config);
    try {
        await pool.connect();
        console.log('Connected to database');

        const request = pool.request();
        const result = await request.query('SELECT id, nume, prenume, email, telefon, functie FROM Jobs');
        return result.recordset;
    } catch (err) {
        console.log('Error: ' + err);
    }
}

exports.updateEmployee = async (id, nume, prenume, email, telefon, functie) => {
    console.log('Updating employee', { id, nume, prenume, email, telefon, functie });
    const pool = new sql.ConnectionPool(config);
    try {
        await pool.connect();
        console.log('Connected to database');

        const request = pool.request();
        request.input('id', sql.Int, id);
        request.input('nume', sql.NVarChar, nume);
        request.input('prenume', sql.NVarChar, prenume);
        request.input('email', sql.NVarChar, email);
        request.input('telefon', sql.NVarChar, telefon);
        request.input('functie', sql.NVarChar, functie);

        const result = await request.query('UPDATE Jobs SET nume = @nume, prenume = @prenume, \
            email = @email, telefon = @telefon, functie = @functie WHERE id = @id');
        console.log(result);
    } catch (err) {
        console.log('Error: ' + err);
    }
}

exports.deleteEmployee = async (id) => {
    console.log('Deleting employee', { id });
    const pool = new sql.ConnectionPool(config);
    try {
        await pool.connect();
        console.log('Connected to database');

        const request = pool.request();
        request.input('id', sql.Int, id);

        const result = await request.query('DELETE FROM Jobs WHERE id = @id');
        console.log(result);
    } catch (err) {
        console.log('Error: ' + err);
    }
}