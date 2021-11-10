import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
	return (
		<button
			type={props.type || 'button'}
			onClick={props.onClick}
			disabled={props.disabled}
			className={classes.button}
		>
			{props.children}
		</button>
	);
};

export default Button;