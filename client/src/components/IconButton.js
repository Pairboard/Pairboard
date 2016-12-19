import React, { PropTypes } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default function IconButton( { children, icon, size, ...props } ) {
  return (
    <Button size={size} {...props}>
      <Glyphicon glyph={icon} /> {children}
    </Button>
  );
}

IconButton.propTypes = {
  children: PropTypes.node,
  size: PropTypes.string, // default 'large', 'small', 'xsmall' etc.
  icon: PropTypes.string.isRequired, // a glyphicon glyph name
};
