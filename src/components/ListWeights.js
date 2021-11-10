import React, {useEffect, useState} from 'react';

const ListWeights = (props) => {
	const [totalWeights, setTotalWeights] = useState(0);


	const renderWeights = props.weights.map((w, idx) => {
		return <div key={idx}>
			<div>
				<span>
				<h4>{idx + 1} - {w.weight} g <button onClick={() => {
					props.removeWeightsHandler(w.id);
				}
				}>delete</button></h4>
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
				<h1>Total: {totalWeights}</h1>
			</div>
		</div>
	);
};

export default ListWeights;