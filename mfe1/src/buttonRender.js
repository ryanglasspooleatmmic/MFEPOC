import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

const render = (id, props) => {
  ReactDOM.render(
    <Button {...(props || {})} />,
    document.getElementById(id)
  );
}

export { render }

