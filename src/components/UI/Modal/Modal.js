import React from 'react';

import Card from '../Card/Card';
import Button from '../Button/Button';

import classes from '../Modal/Modal.module.css';

const Modal = (props) => {
	return (
		<div className={classes.backdrop}>
			<Card className={classes.modal}>
				<header className={classes.header}>
					<h2>Confirm Clear All</h2>
				</header>
				<div className={classes.content}>
					<p>Are you sure you want to clear everything?</p>
				</div>
				<footer className={classes.actions}>
					<Button onClick={props.cancelClear}>Cancel</Button>
					<Button onClick={props.confirmClear}>Confirm</Button>
				</footer>
			</Card>
		</div>
	);
};

export default Modal;