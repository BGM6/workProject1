import React, {useState, useEffect} from 'react';

import UserInputForm from './components/UserInputForm/UserInputForm';
import ListWeights from './components/ListWeights/ListWeights';
import Modal from './components/UI/Modal/Modal';

import './index.css';

const App = () => {
	const [weights, setWeights] = useState([]);
	const [confirmClear, setConfirmClear] = useState(false);
	const [toggleWeight, setToggleWeight] = useState(false);

	useEffect(() => {
		const weights = JSON.parse(localStorage.getItem('weights'));
		if (weights) {
			setWeights(weights);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('weights', JSON.stringify(weights));
	}, [weights]);

	useEffect(() => {
		const conversation = JSON.parse(localStorage.getItem('conversation'));
		if (conversation === true) {
			setToggleWeight(true);
		}

	}, []);

	useEffect(() => {
		localStorage.setItem('conversation', JSON.stringify(toggleWeight));
	}, [toggleWeight]);

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

	const toggleWeightHandler = () => {
		setToggleWeight(!toggleWeight);
	};

	console.log(toggleWeight);

	return (
		<div>
			<h1 className="title">Weight Calculator</h1>
			<div style={{textAlign: 'center'}}>
				<button
					className="toggleBtn"
					onClick={toggleWeightHandler}
				>{toggleWeight ? 'Switch to grams' : 'Switch to lbs'}</button>
			</div>
			<div className="container boxShadow">
				{confirmClear && <Modal cancelClear={cancelClearHandler} confirmClear={clearWeightsHandler}/>}
				<UserInputForm
					toggleWeight={toggleWeight}
					fetchUserInput={fetchUserInput}/>
				<ListWeights
					weights={weights}
					toggleWeight={toggleWeight}
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