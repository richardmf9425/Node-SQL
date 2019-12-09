const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', async (req, res) => {
	let sql = `SELECT COMNAME FROM FLOWERS`;
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

// Get 10 most recent sightings for a flower by common name
router.get('/sightings/:name', async (req, res) => {
	let sql = `SELECT PERSON, LOCATION, SIGHTED FROM SIGHTINGS WHERE NAME = ? ORDER BY SIGHTED DESC LIMIT 10`;
	let params = req.params.name;

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
