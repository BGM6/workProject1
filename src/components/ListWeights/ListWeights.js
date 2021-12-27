import React, {useEffect, useState} from 'react';

import classes from './ListWeights.module.css';

const ListWeights = (props) => {
	const [totalWeights, setTotalWeights] = useState(0);
	const [totalLbs, setTotalLbs] = useState(0);

	const renderWeights = props.weights.map((w, idx) => {
		return <div key={idx}>
			<div>
				<h4 className={classes.number}><i className="fas fa-hashtag"/>{idx + 1} - <span
					className={classes.totalNum}>{props.toggleWeight ? `${w.weight} lbs` : `${w.weight} g`}</span>
					<span className={classes.divBtn}>
					<button className={classes.btn} onClick={() => {
						props.removeWeightsHandler(w.id);
					}}>
						<i className="fas fa-trash-alt fa-lg"/>
					</button>
				</span></h4>
			</div>
		</div>;
	});

	useEffect(() => {
		if (!props.toggleWeight) {
			const totalGrams = props.weights.map(w => Number(w.weight))
				.reduce((acc, currentNum) => acc + currentNum, 0);
			const totalLbs = totalGrams * 0.00220462;
			setTotalWeights(totalGrams);
			setTotalLbs(totalLbs);
		}
	}, [props.toggleWeight, props.weights]);

	useEffect(() => {
		if (props.toggleWeight) {
			const totalLbs = props.weights.map(w => Number(w.weight))
				.reduce((acc, currentNum) => acc + currentNum, 0);
			const totalGrams = totalLbs / 0.00220462;
			setTotalWeights(totalGrams);
			setTotalLbs(totalLbs);
		}
	}, [props.toggleWeight, props.weights]);

	return (
		<div>
			{renderWeights}
			<div>
				<h3 className={classes.totalNum}><span className={classes.totalText}>Total Lbs</span> : {totalLbs.toFixed(2)  }
				</h3>
				<h3 className={classes.totalNum}><span
					className={classes.totalText}>Total Grams</span> : {totalWeights.toFixed(2)}</h3>
			</div>
		</div>
	);
};

export default ListWeights;