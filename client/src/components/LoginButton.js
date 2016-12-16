import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

const LoginButton = props => {
  return (
    <Button className='add-button' bsSize="small" onClick={props.login}>
      <Glyphicon glyph='lock' /> Login
    </Button>
    );
};

export default LoginButton;
