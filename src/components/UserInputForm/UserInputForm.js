import React, {useState, Fragment} from 'react';

import classes from './UserInputForm.module.css';

const UserInputForm = (props) => {
	const [userInput, setUserInput] = useState('');

	// eslint-disable-next-line no-unused-vars
	let formIsValid = false;

	const formSubmitHandler = event => {
		event.preventDefault();
		const numbers = /^(\d+(\.\d+)?)$/;
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
		<Fragment>
			<div className={classes.actions}>
				<form onSubmit={formSubmitHandler}>
					<label htmlFor="weight"/>
					<input
						placeholder={props.toggleWeight ? 'Enter weight in lbs' : 'Enter weight in grams'}
						id="weight"
						type="number"
						pattern="[0-9]+([\.,][0-9]+)?"
						step="0.01"
						value={userInput}
						onChange={addWeightHandler}
					/>
				</form>
			</div>
		</Fragment>
	);
};

export default UserInputForm;