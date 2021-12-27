import React, {useState, useEffect} from 'react';

import UserInputForm from './components/UserInputForm/UserInputForm';
import ListWeights from './components/ListWeights/ListWeights';
import Modal from './components/UI/Modal/Modal';

import './index.css';

const App = () => {
	const [grams, setGrams] = useState([]);
	const [lbs, setLbs] = useState([]);
	const [confirmClear, setConfirmClear] = useState(false);
	const [toggleWeight, setToggleWeight] = useState(false);

	//Lbs Logic
	useEffect(() => {
		const lbs = JSON.parse(localStorage.getItem('lbs'));
		if (lbs) {
			setLbs(lbs);
		}
	}, [toggleWeight]);

	useEffect(() => {
		localStorage.setItem('lbs', JSON.stringify(lbs));
	}, [lbs]);

	//Grams Logic
	useEffect(() => {
		const grams = JSON.parse(localStorage.getItem('grams'));
		if (grams) {
			setGrams(grams);
		}
	}, [toggleWeight]);

	useEffect(() => {
		localStorage.setItem('grams', JSON.stringify(grams));
	}, [grams]);

	const fetchUserInput = input => {
		if (!toggleWeight) {
			setGrams(prevState => {
				return [...prevState, {
					grams: input,
					id: Math.random().toString()
				}];
			});
		} else {
			setLbs(prevState => {
				return [...prevState, {
					lbs: input,
					id: Math.random().toString()
				}];
			});
		}
	};


	//Conversion Logic
	useEffect(() => {
		const conversation = JSON.parse(localStorage.getItem('conversation'));
		if (conversation === true) {
			setToggleWeight(true);
		}

	}, []);

	useEffect(() => {
		localStorage.setItem('conversation', JSON.stringify(toggleWeight));
	}, [toggleWeight]);


	const removeGramsHandler = (id) => {
		setGrams(grams.filter(w => w.id !== id));
	};

	const removeLbsHandler = (id) => {
		setLbs(lbs.filter(w => w.id !== id));
	};

	const clearGramsHandler = () => {
		localStorage.removeItem('grams');
		setGrams([]);
		setConfirmClear(false);
	};

	const clearLbsHandler = () => {
		localStorage.removeItem('lbs');
		setLbs([]);
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
			<h1 className={!toggleWeight ? 'grams' : 'lbs'}>{!toggleWeight ? 'Grams Mode' : 'Lbs Mode'}</h1>
			<div style={{textAlign: 'center'}}>
				<button
					className={toggleWeight ? 'toggleBtnGrams' : 'toggleBtnLbs'}
					onClick={toggleWeightHandler}
				>{toggleWeight ? 'Switch to grams' : 'Switch to lbs'}</button>
			</div>
			<div className="container boxShadow">
				{confirmClear &&
				<Modal cancelClear={cancelClearHandler} confirmClear={!toggleWeight ? clearGramsHandler : clearLbsHandler}/>}
				<UserInputForm
					toggleWeight={toggleWeight}
					fetchUserInput={fetchUserInput}/>
				<ListWeights
					grams={grams}
					lbs={lbs}
					toggleWeight={toggleWeight}
					removeGramsHandler={removeGramsHandler}
					removeLbsHandler={removeLbsHandler}
				/>
				<div>
					{!toggleWeight ?
						<button
							className="clearWeightBtnGrams"
							onClick={modalHandler}
						>Clear grams</button> :
						<button
							className="clearWeightBtnLbs"
							onClick={modalHandler}
						>Clear lbs
						</button>}
				</div>
			</div>
		</div>
	);
};

export default App;