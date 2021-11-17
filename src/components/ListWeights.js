import React, {useEffect, useState} from 'react';
import classes from './ListWeights.module.css';

const ListWeights = (props) => {
	const [totalWeights, setTotalWeights] = useState(0);
	const [totalLbs, setTotalLbs] = useState(0);

	const renderWeights = props.weights.map((w, idx) => {
		return <div key={idx}>
			<div>
				<h4 className={classes.number}>#{idx + 1} - <span className={classes.totalNum}>{w.weight}</span>
					<span className={classes.divBtn}>
					<button className={classes.btn} onClick={() => {
						props.removeWeightsHandler(w.id);
					}}>
						Delete
					</button>
				</span></h4>
			</div>
		</div>;
	});

	useEffect(() => {
		const total = props.weights.map(w => Number(w.weight))
			.reduce((acc, currentNum) => acc + currentNum, 0);
		const totalLbs = total * 0.00220462;
		setTotalWeights(total);
		setTotalLbs(totalLbs);
	}, [props.weights]);

	return (
		<div>
			{renderWeights}
			<div>
				<h3 className={classes.totalNum}><span className={classes.totalText}>Grams Total</span> : {totalWeights}</h3>
				<h3 className={classes.totalNum}><span className={classes.totalText}>Lbs Total</span> : {totalLbs.toFixed(2)}
				</h3>
			</div>
		</div>
	);
};

export default ListWeights;