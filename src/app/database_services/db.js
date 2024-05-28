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

exports.insertEmployee = async (nume, prenume) => {
    console.log('Inserting employee', { nume, prenume });
    const pool = new sql.ConnectionPool(config);
    try {
        await pool.connect();
        console.log('Connected to database');

        const request = pool.request();
        request.input('nume', sql.NVarChar, nume);
        request.input('prenume', sql.NVarChar, prenume);

        const result = await request.query('INSERT INTO Jobs (nume, prenume) VALUES (@nume, @prenume)');
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
        const result = await request.query('SELECT id, nume, prenume FROM Jobs');
        return result.recordset;
    } catch (err) {
        console.log('Error: ' + err);
    }
}