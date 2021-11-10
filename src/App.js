import React, {useState, useEffect} from 'react';

import UserInputForm from './components/UserInputForm';
import ListWeights from './components/ListWeights';

import './index.css';

const App = () => {
	const [weights, setWeights] = useState([]);

	useEffect(() => {
		const weights = JSON.parse(localStorage.getItem('weights'));
		if (weights) {
			setWeights(weights);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('weights', JSON.stringify(weights));
	}, [weights]);

	const removeWeightsHandler = (id) => {
		setWeights(weights.filter(w => w.id !== id));
	};

	const fetchUserInput = input => {
		setWeights(prevState => {
			return [...prevState, {
				weight: input,
				id: Math.random().toString()
			}];
		});
	};

	console.log(weights)
	return (
		<div className="container">
			<UserInputForm fetchUserInput={fetchUserInput}/>
			<ListWeights
				weights={weights}
				removeWeightsHandler={removeWeightsHandler}
			/>
		</div>
	);
};

export default App;