const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', async (req, res) => {
	let sql = `SELECT SPECIES FROM FLOWERS`;
	let params = [];
	try {
		db.all(sql, params, (err, rows) => {
			if (err) {
				res.status(400).send(err.message);
				return;
			}
			res.json({
				message: 'success',
				data: rows
			});
		});
	} catch (e) {
		console.error(e.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
