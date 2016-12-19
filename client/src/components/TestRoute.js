import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import io from 'socket.io-client';
import AppHeader from './AppHeader';
import '../App.css';
import server from '../config/config';

class TestRoute extends Component {

  constructor() {
    super();
    this.state = {
      campers: [],
      username: '',
      availableTime: '',
      setup: [],
      interests: '',
    };

    this.handleChange = this.handleChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  componentWillMount() {
    fetch( 'http://localhost:3001/user', { method: 'GET', credentials: 'include' } )
      .then( res => { return res.json(); } )
      .then( res => {
        this.setState( { username: res.username } );
      } ).catch( err => console.log( 'Error:', err ) );
  }

  componentDidMount() {
    this.socket = io( server );
  }

  handleSubmit( e ) {
    e.preventDefault();
    const post = {
      username: this.state.username,
      availableTime: this.state.availableTime,
      setup: this.state.setup,
      interests: this.state.interests,
    };
    const url = '/api/v1/posts';

    axios.post( url, post ).then( res => {
      if ( res.status === 201 ) {
        // temporary solution, because API sends back nested data
        browserHistory.push( '/' );
        this.socket.emit( 'post', res.body );
      }
    } ).catch( e => console.log( e ) );
  }

  handleChange( e ) {
    // Get checked checkboxes
    if ( e.target.name === 'setup[]' ) {
      const inputs = document.getElementsByName( 'setup[]' );
      let setup = [];
      // TODO: refactor
      for ( let i = 0, len = inputs.length; i < len; i++ ) {
        if ( inputs[i].checked ) {
          setup.push( inputs[i].value );
        }
      }
      this.setState( {
        setup,
      } );
    } else {
      this.setState( {
        [e.target.id]: e.target.value,
      } );
    }
  }

  render() {
    return (
      <div>
        <AppHeader headerText="freeCodeCamp" appName="Remote Pairing Noticeboard" />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            {/* <label htmlFor="username">Forum username:</label>
            <div className="input-group">
              <span className="input-group-addon" id="basic-addon1">@</span>
              <input pattern=".{1,20}" required title="Username between 1 and 20 characters" className="form-control" name="username" id="username" type="text" aria-describedby="basic-addon1" value={this.state.username} onChange={this.handleChange}/>
            </div> */}
            <label htmlFor="availableTime">Length of Time Available for Pairing (example: 03:00 = 3hrs):</label>
            <div className="input-group">
              <input required title="Please enter in the format HH:mm" className="form-control" name="availableTime" id="availableTime" type="text" pattern="\d{1,2}:\d{2}" aria-describedby="basic-addon2" value={this.state.availableTime} onChange={this.handleChange}/>
              <span className="input-group-addon" id="basic-addon2">HH:mm</span>
            </div>

            <fieldset>
              <legend htmlFor="setup[]">Preferred Pairing Technology:</legend>
              <p>ScreenHero <input name="setup[]" type="checkbox" value="ScreenHero" onChange={this.handleChange}/></p>
              <p>TeamViewer <input name="setup[]" type="checkbox" value="TeamViewer" onChange={this.handleChange}/></p>
              <p>GoogleHangouts <input name="setup[]" type="checkbox" value="GoogleHangouts" onChange={this.handleChange}/></p>
              <p>Skype <input name="setup[]" type="checkbox" value="Skype" onChange={this.handleChange}/></p>
            </fieldset>

            Other: <input pattern=".{0}|.{1,30}" title="Keep it to minimum of 30 characters" className="form-control" name="setup" id="setup" type="text"/>
            <label htmlFor="interests">Interests:</label>
            <input pattern=".{0}|.{1,30}" title="Keep it to minimum of 30 characters" className="form-control" name="interests" id="interests" type="text" value={this.state.interests} onChange={this.handleChange}/>
            <input className="btn btn-success modal-submit" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  };
};

export default TestRoute;
