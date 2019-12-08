const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const DBSOURCE = path.resolve(__dirname, './flowers2019.db');

let db = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to the flowers database.');
});

let sql = 'SELECT SPECIES FROM FLOWERS';

db.all(sql, [], (err, rows) => {
	if (err) {
		throw err;
	}
	rows.forEach((row) => {
		console.log(row.SPECIES);
	});
});

// close the database connection
// db.close();

module.exports = db;
