const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql');

app.use(cors())

app.get('/toys', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'toys_db'
    });

    connection.connect();

    connection.query('SELECT * FROM игрушки', function (error, results, fields) {
        if (error) {
            console.error('Ошибка при выполнении запроса:', error);
            res.status(500).json({ error: 'Ошибка при выполнении запроса' });
        } else {
            res.send({ "data": results, message: "Данные получены!" });
        }
        connection.end(); // Закрываем соединение здесь, после завершения запроса
    });
});

app.get('/clients', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'toys_db'
    });

    connection.connect();

    connection.query('SELECT * FROM клиенты', function (error, results, fields) {
        if (error) {
            console.error('Ошибка при выполнении запроса:', error);
            res.status(500).json({ error: 'Ошибка при выполнении запроса' });
        } else {
            res.send({ "data": results, message: "Данные получены!" });
        }
        connection.end(); // Закрываем соединение здесь, после завершения запроса
    });
});

app.get('/orders', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'toys_db'
    });

    connection.connect();

    connection.query('SELECT * FROM заказы', function (error, results, fields) {
        if (error) {
            console.error('Ошибка при выполнении запроса:', error);
            res.status(500).json({ error: 'Ошибка при выполнении запроса' });
        } else {
            res.send({ "data": results, message: "Данные получены!" });
        }
        connection.end(); // Закрываем соединение здесь, после завершения запроса
    });
});

app.get('/operations', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'toys_db'
    }); 

    connection.connect();

    connection.query('SELECT * FROM операции_на_складе', function (error, results, fields) {
        if (error) {
            console.error('Ошибка при выполнении запроса:', error);
            res.status(500).json({ error: 'Ошибка при выполнении запроса' });
        } else {
            res.send({ "data": results, message: "Данные получены!" });
        }
        connection.end(); // Закрываем соединение здесь, после завершения запроса
    });
});

app.get('/employ', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'toys_db'
    });

    connection.connect();

    connection.query('SELECT * FROM сотрудники', function (error, results, fields) {
        if (error) {
            console.error('Ошибка при выполнении запроса:', error);
            res.status(500).json({ error: 'Ошибка при выполнении запроса' });
        } else {
            res.send({ "data": results, message: "Данные получены!" });
        }
        connection.end(); // Закрываем соединение здесь, после завершения запроса
    });
});


app.get('/update', (req, res) => {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'toys_db'
    });

    const { rowId, oldValue, dataToUpdate, table } = req.query;
    const { columnName, newValue } = dataToUpdate;

    let tableSql = null;

    console.log(req.query);

    switch (table) {
        case "toys":
            tableSql = "игрушки";
            break;
        case "clients":
            tableSql = "клиенты";
            break;
        case "orders":
            tableSql = "заказы";
            break;
        case "operations":
            tableSql = "операции_на_складе";
            break;
        case "employ":
            tableSql = "сотрудники";
            break;
    }

    const sql = `UPDATE ${tableSql}
                SET ${columnName} = ?
                WHERE Идентификатор = ? AND ${columnName} = ?`;

    connection.query(sql, [newValue, rowId, oldValue], (err, result) => {
        if (err) {
            console.error('Ошибка при выполнении запроса:', err);
            res.status(500).json({ error: 'Ошибка при выполнении запроса' });
        } else {
            console.log('Данные успешно обновлены');
            res.status(200).json({ message: 'Данные успешно обновлены' });
        }
    });
});

app.post('/delete', (req, res) => {
    const rowId = req.query.rowId; // Получаем идентификатор строки для удаления
    const table = req.query.table; // Получаем идентификатор строки для удаления

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'toys_db'
    });

    let tableSql = null;

    switch (table) {
        case "toys":
            tableSql = "игрушки";
            break;
        case "clients":
            tableSql = "клиенты";
            break;
        case "orders":
            tableSql = "заказы";
            break;
        case "operations":
            tableSql = "операции_на_складе";
            break;
        case "employ":
            tableSql = "сотрудники";
            break;
    }

    // Проверяем, есть ли связанные записи в других таблицах
    // const checkSQL = `SELECT COUNT(*) AS count FROM операции_на_складе WHERE Идентификатор_игрушки = ?`;
    // connection.query(checkSQL, rowId, (err, results) => {
    //     if (err) {
    //         console.error('Ошибка при проверке связанных записей:', err);
    //         res.status(500).json({ error: 'Ошибка при выполнении запроса' });
    //         return;
    //     }

    //     const count = results[0].count;
    //     if (count > 0) {
    //         res.status(500).json({ error: 'Невозможно удалить игрушку, так как на нее есть ссылки в других таблицах.' });
    //         return;
    //     }

    // Удаление строки из таблицы игрушек
    const deleteSQL = `DELETE FROM ${tableSql} WHERE Идентификатор = ?`;
    connection.query(deleteSQL, rowId, (err, result) => {
        if (err) {
            console.error('Ошибка при удалении записи:', err);
            res.status(500).json({ error: 'Ошибка при удалении записи' });
            return;
        } else {
            console.log('Данные успешно удалены');
            res.status(200).json({ message: 'Данные успешно удалены!' });
            return;
        }
    });
    // });
});

app.get('/add', (req, res) => {
    const table = req.query.table;
    const data = req.query.data;

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'toys_db'
    });

    let tableSql = null;

    switch (table) {
        case "toys":
            tableSql = "игрушки";
            break;
        case "clients":
            tableSql = "клиенты";
            break;
        case "orders":
            tableSql = "заказы";
            break;
        case "operations":
            tableSql = "операции_на_складе";
            break;
        case "employ":
            tableSql = "сотрудники";
            break;
    }

    // Формируем запрос INSERT
    const sql = `INSERT INTO ${tableSql} SET ?`;

    // Выполняем запрос к базе данных
    connection.query(sql, data, (error, results, fields) => {
        if (error) {
            console.error('Ошибка при выполнении запроса:', error);
            res.status(500).json({ error: 'Ошибка при выполнении запроса' });
        } else {
            console.log('Данные успешно добавлены в таблицу', tableSql);
            res.status(200).json({ message: 'Данные успешно добавлены в таблицу' });
        }
    });

    // Закрываем соединение с базой данных
    connection.end();
});


/*
TODO: 1.Добавить логику обработки и отображения других таблиц бд
TODO: 2.Добавить функцию создания отчетов
*/

app.listen(3000)