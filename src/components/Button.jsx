import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  linkTo, // New prop to optionally specify a Link target
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  if (linkTo) {
    // If 'linkTo' is provided, render a Link
    return (
      <Link to={linkTo} className="btn-mobile">
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} type={type}>
          {children}
        </button>
      </Link>
    );
  }

  // Otherwise, render a standard button
  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
