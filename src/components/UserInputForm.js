import React, {useState} from 'react';

import classes from './UserInputForm.module.css';

const UserInputForm = (props) => {
	const [userInput, setUserInput] = useState('');

	let formIsValid = false;

	const formSubmitHandler = event => {
		event.preventDefault();
		const numbers = /^[0-9]+$/;
		if (userInput !== '' && userInput.match(numbers)) {
			formIsValid = true;
		} else {
			return;
		}
		props.fetchUserInput(userInput);
		setUserInput('');
	};

	const addWeightHandler = event => {
		setUserInput(event.target.value);
	};

	return (
		<div>
			<form onSubmit={formSubmitHandler}>
				<label htmlFor="weight">Enter Weight: </label>
				<input
					id="weight"
					type="text"
					value={userInput}
					onChange={addWeightHandler}
				/>
				<button className={classes.addBtn}>Add</button>
			</form>
		</div>
	);
};

export default UserInputForm;