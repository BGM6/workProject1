import React, {useEffect, useState} from 'react';

import classes from './ListWeights.module.css';

const ListWeights = (props) => {
	const [totalGrams, setTotalGrams] = useState(0);
	const [totalLbs, setTotalLbs] = useState(0);

	const renderGrams = props.grams.map((w, idx) => {
		return <div key={idx}>
			<div>
				<h4 className={classes.number}><i className="fas fa-hashtag"/>{idx + 1} - <span
					className={classes.totalNum}>{w.grams}g</span>
					<span className={classes.divBtn}>
					<button className={classes.btn} onClick={() => {
						props.removeGramsHandler(w.id);
					}}>
						<i className="fas fa-trash-alt fa-lg"/>
					</button>
				</span></h4>
			</div>
		</div>;
	});

	const renderLbs = props.lbs.map((w, idx) => {
		return <div key={idx}>
			<div>
				<h4 className={classes.number}><i className="fas fa-hashtag"/>{idx + 1} - <span
					className={classes.totalNum}>{w.lbs}lbs</span>
					<span className={classes.divBtn}>
					<button className={classes.btn} onClick={() => {
						props.removeLbsHandler(w.id);
					}}>
						<i className="fas fa-trash-alt fa-lg"/>
					</button>
				</span></h4>
			</div>
		</div>;
	});

	useEffect(() => {
		if (!props.toggleWeight) {
			const totalGrams = props.grams.map(w => Number(w.grams))
				.reduce((acc, currentNum) => acc + currentNum, 0);
			const totalLbs = totalGrams * 0.00220462;
			setTotalGrams(totalGrams);
			setTotalLbs(totalLbs);
		}
	}, [props.toggleWeight, props.grams]);

	useEffect(() => {
		if (props.toggleWeight) {
			const totalLbs = props.lbs.map(w => Number(w.lbs))
				.reduce((acc, currentNum) => acc + currentNum, 0);
			const totalGrams = totalLbs / 0.00220462;
			setTotalGrams(totalGrams);
			setTotalLbs(totalLbs);
		}
	}, [props.toggleWeight, props.lbs]);

	return (
		<div>
			{props.toggleWeight ? renderLbs : renderGrams}
			<div>
				<h4 className={classes.totalNum}><span className={classes.totalText}>Total lbs</span> : {totalLbs.toFixed(2)}</h4>
				<h4 className={classes.totalNum}><span className={classes.totalText}>Total grams</span> : {totalGrams.toFixed(0)}</h4>
			</div>
		</div>
	);
};

export default ListWeights;