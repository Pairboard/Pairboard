import React from 'react';
import IconButton from './IconButton';

class AppFooter extends React.Component {

  // Temporary code to test login functionality
  // When rewriting components this whole code can be deleted
  constructor( props ) {
    super( props );
    this.state = {
      user: null,
      style: {
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
      },
    };
  }

  componentWillMount() {
    fetch( 'http://localhost:3001/user', { method: 'GET', credentials: 'include' } )
      .then( res => { return res.json(); } )
      .then( res => {
        console.log( res.username );
        this.setState( { user: res.username } );
      } ).catch( err => console.log( 'Error:', err ) );
  }

  render() {
    return (
      <div className="App-footer">
        <IconButton
          className="add-button"
          size="small"
          icon="plus"
          onClick={props.open}
        >
          Add
        </IconButton>
        <IconButton
          className="info-button"
          size="small"
          icon="info-sign"
          onClick={props.openInfo}
        >
          Info
        </IconButton>
        {this.state.user ?
          <a href="http://localhost:3001/auth/logout" style={this.state.style}>@{this.state.user} Logout</a> :
          <a href="http://localhost:3001/auth/login" style={this.state.style}>Login</a>
      }
      </div>
    );
  }
};

export default AppFooter;
