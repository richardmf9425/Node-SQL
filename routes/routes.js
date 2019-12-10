const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', async (req, res) => {
	let sql = `SELECT COMNAME, SPECIES, GENUS FROM FLOWERS`;
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

// Add sightings for a flower
router.post('/sightings/add', async (req, res) => {
	let errors = [];
	console.log(req.body);
	if (!req.body.name) errors.push('No name specified');
	if (!req.body.person) errors.push('No person specified');
	if (!req.body.location) errors.push('No location specified');
	if (!req.body.sighted) errors.push('No sighting date specified');
	if (errors.length) {
		res.status(400).json({ error: errors.join(',') });
		return;
	}
	let data = {
		name: req.body.name,
		person: req.body.person,
		location: req.body.location,
		sighted: req.body.sighted
	};
	let sql = `INSERT INTO SIGHTINGS (NAME, PERSON, LOCATION, SIGHTED) VALUES (?,?,?,?)`;
	let params = [ data.name, data.person, data.location, data.sighted ];
	try {
		db.run(sql, params, (err, result) => {
			if (err) {
				res.status(400).json({ error: err.message });
				return;
			}
			res.json({
				message: 'success',
				data: data
			});
		});
	} catch (e) {
		console.error(e.message);
		res.status(500).send('Server error');
	}
});

// Update flower information
router.patch('/flowers/:name', (req, res) => {
	console.log(req.body);
	var data = {
		genus: req.body.genus,
		species: req.body.species,
		comname: req.body.comname
	};

	db.run(
		`UPDATE flowers SET
            GENUS = COALESCE(?, GENUS),
            SPECIES = COALESCE(?, SPECIES),
            COMNAME = COALESCE(?, COMNAME)
			WHERE COMNAME = ?`,
		[ data.genus, data.species, data.comname, req.params.name ],
		function(err, results) {
			if (err) {
				res.status(400).json({ error: err.message });
				return;
			}
			res.json({
				message: 'success',
				data: data,
				changes: this.changes
			});
		}
	);
});

module.exports = router;
