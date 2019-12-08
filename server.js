const express = require('express');
const db = require('./db/database');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
	res.json({ message: 'OK' });
});

app.use(express.json({ extended: false }));
app.use(cors());

app.use('/api', routes);

app.listen(PORT, () => {
	console.log('server listening on port ' + PORT);
});
