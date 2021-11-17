import React, {useState, useEffect} from 'react';

import UserInputForm from './components/UserInputForm/UserInputForm';
import ListWeights from './components/ListWeights/ListWeights';

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

	const clearWeightsHandler = () => {
		localStorage.removeItem('weights');
		setWeights([]);
	};

	return (
		<div className="container boxShadow">
			<UserInputForm fetchUserInput={fetchUserInput}/>
			<ListWeights
				weights={weights}
				removeWeightsHandler={removeWeightsHandler}
			/>
			<div>
				<button
					className="clearWeightBtn"
					onClick={clearWeightsHandler}
				>Clear All
				</button>
			</div>
		</div>
	);
};

export default App;