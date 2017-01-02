import React, { PropTypes } from 'react';
import { Button as BootstrapButton, Glyphicon } from 'react-bootstrap';

export default function Button( { children, icon, iconPosition = 'before', ...props } ) {
  if ( icon && iconPosition === 'before' ) {
    return (
      <BootstrapButton {...props}>
        <Glyphicon glyph={icon} /> {children}
      </BootstrapButton>
    );
  } else if ( icon && iconPosition === 'after' ) {
    return (
      <BootstrapButton {...props}>
        {children} <Glyphicon glyph={icon} />
      </BootstrapButton>
    );
  } else {
    return (
      <BootstrapButton {...props}>
        {children}
      </BootstrapButton>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string, // a glyphicon glyph name
  iconPosition( props, propName, componentName ) { // default 'before', one of 'before' or 'after'
    if ( props[propName] && !props.icon ) {
      return new Error( `The prop \`${propName}\` was supplied to \`${componentName}\` with a value of \`${props[propName]}\`, but you must supply the prop \`icon\` when using \`${propName}\`.` );
    }
    if ( props.icon && props[propName] && !/^(before|after)$/.test( props[propName] ) ) {
      return new Error( `The prop \`${propName}\` supplied to \`${componentName}\` must be one of 'before' or 'after', but its value is \`${props[propName]}\`.` );
    }
  },
};
