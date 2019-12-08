import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
	const [ flowers, setFlowers ] = useState({});

	useEffect(async () => {
		let data = await axios.get('/api');
	});
	return (
		<div>
			<h1>test</h1>
		</div>
	);
}

export default App;
