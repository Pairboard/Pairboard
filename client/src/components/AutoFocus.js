import React, { PropTypes } from 'react';

class AutoFocus extends React.Component {
  constructor( props ) {
    super( props );

    this.receiveRef = this.receiveRef.bind( this );
  }

  componentDidMount() {
    if ( this.ref ) {
      this.ref.focus();
    }
  }

  receiveRef( node ) {
    this.ref = node;
  }

  render() {
    return this.props.children( this.receiveRef );
  }
}

AutoFocus.propTypes = {
  children: PropTypes.func.isRequired,
};

export default AutoFocus;
