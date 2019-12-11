import React, { useEffect, useState, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
function List() {
	const [ flowers, setFlowers ] = useState([]);
	const [ update, setUpdate ] = useState({
		comname: '',
		species: '',
		genus: ''
	});

	const [ show, setShow ] = useState(false);
	const [ flowerModal, setFlowerModal ] = useState({});
	const [ sightings, setSightings ] = useState([]);
	const [ formInfo, setFormInfo ] = useState({
		person: '',
		location: '',
		date: ''
	});
	useEffect(() => {
		axios.get('/api').then((res) => setFlowers(res.data.data));
	}, []);

	const handleShow = async (flower) => {
		setShow(true);
		await axios.get(`/api/sightings/${flower.COMNAME}`).then((res) => setSightings(res.data.data));
		console.log(flowers);
		await setFlowerModal(flower);
		setUpdate({ ...update, comname: flower.COMNAME, species: flower.SPECIES, genus: flower.GENUS });
	};
	const handleClose = () => setShow(false);

	let flowersList = flowers.map((flower, index) => (
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
		toast.info('Sighting was successfully added.', {
			bodyClassName: 'toast-background',
			position: 'top-center',
			autoClose: 3000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true
		});
		handleClose();
	};
	const { comname, species, genus } = update;
	const onUpdateChange = (e) => setUpdate({ ...update, [e.target.name]: e.target.value });
	const handleUpdate = async (e) => {
		e.preventDefault();
		if (comname === flowerModal.COMNAME && species === flowerModal.SPECIES && genus === flowerModal.GENUS) {
			return toast.error('Fields are the same! Please make a change to update', {
				bodyClassName: 'toast-background',
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true
			});
		}

		axios.patch(`/api/flowers/${flowerModal.COMNAME}`, { comname, species, genus });
		toast.info('Flower information succesfully changed.', {
			bodyClassName: 'toast-background',
			position: 'top-center',
			autoClose: 3000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true
		});
		await axios.get('/api').then((res) => setFlowers(res.data.data));
		handleClose();
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
					<Modal.Title>
						{' '}
						<form onSubmit={(e) => handleUpdate(e)} className="update-form">
							<strong>Common Name:</strong> {' '}
							<input
								className="update-input"
								value={comname}
								name="comname"
								onChange={(e) => onUpdateChange(e)}
							/>
							<strong>Species:</strong> {' '}
							<input
								className="update-input"
								value={species}
								name="species"
								onChange={(e) => onUpdateChange(e)}
							/>
							<strong>Genus:</strong>
							<input
								className="update-input"
								value={genus}
								name="genus"
								onChange={(e) => onUpdateChange(e)}
							/>
							<button className="add-button" type="submit">
								Update
							</button>
						</form>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<table className="table table-striped">
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
						<div className="form-input">
							<input
								type="text"
								name="person"
								value={person}
								placeholder="Person"
								className="text-input"
								required
								onChange={(e) => onChange(e)}
							/>
							<input
								type="text"
								name="location"
								value={location}
								placeholder="Location"
								className="text-input"
								required
								onChange={(e) => onChange(e)}
							/>
							<input
								type="text"
								required
								className="text-input"
								name="date"
								value={date}
								placeholder="Date"
								onChange={(e) => onChange(e)}
							/>
						</div>
						<button type="submit" className="add-button">
							Add
						</button>
					</form>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}

export default List;
