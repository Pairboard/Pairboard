import React, { PropTypes } from 'react';

export default function AddPairingNoticeForm( {
  handleSubmit,
  username,
  availableTime,
  pairingTechs,
  other,
  interests,
  handleFieldChange,
} ) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Forum username:</label>
        <div className="input-group">
          <span className="input-group-addon" id="basic-addon1">@</span>
          <input pattern=".{1,20}" required title="Username between 1 and 20 characters" className="form-control" name="username" id="username" type="text" aria-describedby="basic-addon1" value={username} onChange={handleFieldChange} />
        </div>
      </div>
      <div>
        <label htmlFor="availableTime">Length of Time Available for Pairing (example: 03:00 = 3hrs):</label>
        <div className="input-group">
          <input required title="Please enter in the format HH:mm" className="form-control" name="availableTime" id="availableTime" type="text" pattern="\d{1,2}:\d{2}" aria-describedby="basic-addon2" value={availableTime} onChange={handleFieldChange} />
          <span className="input-group-addon" id="basic-addon2">HH:mm</span>
        </div>
      </div>
      <fieldset>
        <legend htmlFor="setup[]">Preferred Pairing Technology:</legend>
        {pairingTechs.map( type => (
          <p>{type} <input name="setup[]" type="checkbox" value={type} onChange={handleFieldChange} /></p>
        ) )}
      </fieldset>
      <div>
        <label htmlFor="other">
          Other:
        </label>
        <input pattern=".{0}|.{1,30}" title="Keep it to minimum of 30 characters" className="form-control" name="other" id="other" type="text" value={other} onChange={handleFieldChange}/>
      </div>
      <div>
        <label htmlFor="interests">
          Interests:
        </label>
        <input pattern=".{0}|.{1,30}" title="Keep it to minimum of 30 characters" className="form-control" name="interests" id="interests" type="text" value={interests} onChange={handleFieldChange}/>
      </div>
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
