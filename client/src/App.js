import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
	const [ flowers, setFlowers ] = useState([]);

	useEffect(() => {
		axios.get('/api').then((res) => setFlowers(res.data.data));
	}, []);

	const data = flowers.map((flower, index) => (
		<tr key={index}>
			<td>{flower.COMNAME}</td>
		</tr>
	));
	console.log(flowers);
	return (
		<div>
			<table>
				<tbody>{data}</tbody>
			</table>
		</div>
	);
}

export default App;
