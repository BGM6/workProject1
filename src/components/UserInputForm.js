import React, {useState} from 'react';

import classes from './UserInputForm.module.css';

const UserInputForm = (props) => {
	const [userInput, setUserInput] = useState('');

	// eslint-disable-next-line no-unused-vars
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
			<div className={classes.actions}>
				<form onSubmit={formSubmitHandler} >
					<label htmlFor="weight"/>
					<input
						placeholder="Enter Weight"
						id="weight"
						type="text"
						value={userInput}
						onChange={addWeightHandler}
					/>
				</form>
			</div>
		</div>
	);
};

export default UserInputForm;