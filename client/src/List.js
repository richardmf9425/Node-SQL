import React, { useEffect, useState, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
function List({ flowers }) {
	const [ show, setShow ] = useState(false);
	const [ flowerModal, setFlowerModal ] = useState({});
	const [ sightings, setSightings ] = useState([]);
	const [ formInfo, setFormInfo ] = useState({
		person: '',
		location: '',
		date: ''
	});
	const handleShow = async (flower) => {
		setShow(true);
		await axios.get(`/api/sightings/${flower.COMNAME}`).then((res) => setSightings(res.data.data));
		setFlowerModal(flower);
	};
	const handleClose = () => setShow(false);

	const flowersList = flowers.map((flower, index) => (
		<tr key={index} onClick={() => handleShow(flower)}>
			<td>{flower.COMNAME}</td>
		</tr>
	));

	const sightingsList = sightings.map((sighting, index) => {
		return (
			<tr key={index}>
				<td>{sighting.PERSON}</td>
				<col />
				<td>{sighting.LOCATION}</td>
				<col />
				<td>{sighting.SIGHTED}</td>
			</tr>
		);
	});
	const { person, location, date } = formInfo;
	const onChange = (e) => setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.post('/api/sightings/add', { name: flowerModal.COMNAME, person, location, sighted: date });
		setFormInfo({
			person: '',
			location: '',
			date: ''
		});
	};
	return (
		<Fragment>
			<div className="landing-section">
				<div className="flowers-table">
					<div className="table-headers">
						<div className="row">
							<div className="card shadow">
								<div className="tableWrapper">
									<h1>Flowers</h1>
									<table className="table table-striped">
										<thead>
											<tr>
												<th>Common Name:</th>
											</tr>
										</thead>
										<tbody>{flowersList}</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Flower: {flowerModal.COMNAME}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<table>
						<thead>
							<tr>
								<th>Person:</th>
								<col />
								<th>Location:</th>
								<col />
								<th>Date :</th>
							</tr>
						</thead>
						<tbody>{sightingsList}</tbody>
					</table>
				</Modal.Body>
				<Modal.Footer>
					<form onSubmit={(e) => onSubmit(e)}>
						<input
							type="text"
							name="person"
							value={person}
							placeholder="Person"
							required
							onChange={(e) => onChange(e)}
						/>
						<input
							type="text"
							name="location"
							value={location}
							placeholder="Location"
							required
							onChange={(e) => onChange(e)}
						/>
						<input
							type="text"
							required
							name="date"
							value={date}
							placeholder="Date"
							onChange={(e) => onChange(e)}
						/>
						<button type="submit">Add</button>
					</form>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}

export default List;
