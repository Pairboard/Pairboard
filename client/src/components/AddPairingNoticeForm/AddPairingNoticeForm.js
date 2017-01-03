import React, { PropTypes } from 'react';

import TextField from '../TextField';
import AutoFocus from '../AutoFocus';

export default function AddPairingNoticeForm( {
  handleSubmit,
  username,
  availableTime,
  pairingTechs,
  other,
  interests,
  handleFieldChange,
  ...rest
} ) {
  return (
    <form onSubmit={handleSubmit} {...rest}>
      <TextField
        label="Forum username"
        name="username"
        id="username"
        pattern=".{1,20}"
        title="Username between 1 and 20 characters"
        prefix="@"
        value={username}
        onChange={handleFieldChange}
        required
      />
      <AutoFocus>
        {( ref ) => (
          <TextField
            label="Length of Time Available for Pairing (example: 03:00 = 3hrs)"
            name="availableTime"
            id="availableTime"
            title="Please enter in the format HH:mm"
            postfix="HH:mm"
            pattern="\d{1,2}:\d{2}"
            value={availableTime}
            onChange={handleFieldChange}
            getInputRef={ref}
            required
          />
        )}
      </AutoFocus>
      <fieldset>
        <legend htmlFor="setup[]">Preferred Pairing Technology:</legend>
        {pairingTechs.map( type => (
          <p key={type}>{type} <input name="setup[]" type="checkbox" value={type} onChange={handleFieldChange} /></p>
        ) )}
      </fieldset>
      <TextField
        label="Other"
        name="other"
        id="other"
        title="Keep it to a minimum of 30 characters"
        pattern=".{0}|.{1,30}"
        value={other}
        onChange={handleFieldChange}
      />
      <TextField
        label="Interests"
        name="interests"
        id="interests"
        title="Keep it to a minimum of 30 characters"
        pattern=".{0}|.{1,30}"
        value={interests}
        onChange={handleFieldChange}
      />
      <input className="btn btn-success modal-submit" type="submit" value="Submit" />
    </form>
  );
}

AddPairingNoticeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  availableTime: PropTypes.string.isRequired,
  pairingTechs: PropTypes.arrayOf( PropTypes.string ).isRequired,
  other: PropTypes.string.isRequired,
  interests: PropTypes.string.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
};
