import React, {useEffect, useState} from 'react';

import classes from './ListWeights.module.css';

const ListWeights = (props) => {
	const [totalWeights, setTotalWeights] = useState(0);

	const renderWeights = props.weights.map((w, idx) => {
		return <div key={idx}>
			<div>
				<span>
					<ul>
				<li>#{idx + 1} - {w.weight}
					<div className={classes.divBtn}>
						<button className={classes.btn} onClick={() => {
							props.removeWeightsHandler(w.id);
						}}>
						Delete
					</button>
					</div>
				</li>
						</ul>
				</span>
			</div>
		</div>;
	});

	useEffect(() => {
		const total = props.weights.map(w => Number(w.weight))
			.reduce((acc, currentNum) => acc + currentNum, 0);
		setTotalWeights(total);
	}, [props.weights]);

	return (
		<div>
			{renderWeights}
			<div>
				<h3 className={classes.total}>Total: {totalWeights}</h3>
			</div>
		</div>
	);
};

export default ListWeights;