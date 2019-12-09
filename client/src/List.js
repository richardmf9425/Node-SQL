import React, { useEffect, useState, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
function List({ flowers }) {
	const [ show, setShow ] = useState(false);
	const [ flowerModal, setFlowerModal ] = useState({});
	const [ sightings, setSightings ] = useState([]);
	const handleShow = (flower) => {
		setShow(true);
		axios.get(`/api/sightings/${flower.COMNAME}`).then((res) => setSightings(res.data));
		setFlowerModal(flower);
	};
	const handleClose = () => setShow(false);
	console.log(sightings);
	const flowersList = flowers.map((flower, index) => (
		<tr key={index} onClick={() => handleShow(flower)}>
			<td>{flower.COMNAME}</td>
		</tr>
	));
	console.log(flowers);
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
											<td>Common Name:</td>
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
							<td>Person:</td>
							<td>Location:</td>
							<td>Date :</td>
						</thead>
					</table>
				</Modal.Body>
			</Modal>
		</Fragment>
	);
}

export default List;
