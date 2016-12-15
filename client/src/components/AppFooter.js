import React from 'react';
import AddButton from './AddButton';
import InfoButton from './InfoButton';
import LoginButton from './LoginButton';

const AppFooter = props => {
  return (
    <div className='App-footer'>
      <AddButton open={props.open} />
      <InfoButton openInfo={props.openInfo} />
      <LoginButton login={props.login} />
    </div>
    );
};

export default AppFooter;
