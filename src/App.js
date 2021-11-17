import React, {useState, useEffect} from 'react';

import UserInputForm from './components/UserInputForm/UserInputForm';
import ListWeights from './components/ListWeights/ListWeights';
import Modal from './components/UI/Modal/Modal';

import './index.css';

const App = () => {
	const [weights, setWeights] = useState([]);
	const [confirmClear, setConfirmClear] = useState(false);

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
		setConfirmClear(false);
	};

	const modalHandler = () => {
		setConfirmClear(true);
	};

	const cancelClearHandler = () => {
		setConfirmClear(false);
	};

	return (
		<div>
			<h1 className="title">Grams Calculator</h1>
			<div className="container boxShadow">
				{confirmClear && <Modal cancelClear={cancelClearHandler} confirmClear={clearWeightsHandler}/>}
				<UserInputForm fetchUserInput={fetchUserInput}/>
				<ListWeights
					weights={weights}
					removeWeightsHandler={removeWeightsHandler}
				/>
				<div>
					<button
						className="clearWeightBtn"
						onClick={modalHandler}
					>Clear All
					</button>
				</div>
			</div>
		</div>
	);
};

export default App;