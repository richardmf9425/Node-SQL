import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from './List';

function App() {
	const [ flowers, setFlowers ] = useState([]);

	useEffect(() => {
		axios.get('/api').then((res) => setFlowers(res.data.data));
	}, []);

	return <List flowers={flowers} />;
}

export default App;
