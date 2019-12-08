const express = require('express');
const db = require('./db/database');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log('server listening on port ' + PORT);
});

app.get('/', (req, res, next) => {
	res.json({ message: 'OK' });
});

app.use((req, res) => res.status(404));
app.use(express.json({ extended: false }));
app.use(cors());
