import React, { useEffect } from 'react';

function List({ flowers }) {
	const flowersList = flowers.map((flower, index) => (
		<tr key={index}>
			<td>{flower.COMNAME}</td>
		</tr>
	));
	console.log(flowers);
	return (
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
	);
}

export default List;
