import React, { PropTypes } from 'react';

export default function TextField( {
  label = null,
  name,
  prefix = null,
  postfix = null,
  id,
  ...rest
} ) {
  id = id || name; // If there is no id, default to the field name

  // aria-describedby is a space delimited list of ids of associated descriptive nodes
  // we include the ids of the prefix and postfix if there are any
  const ariaDescribedBy = [
    prefix && `${id}-prefix`,
    postfix && `${id}-postfix`,
  ].filter( label => label !== null ).join( ' ' );

  return (
    <div>
      {label && <label htmlFor={name}>{label}:</label>}
      <div className={( prefix || postfix ) && 'input-group'}>
        {/* HACK if there are no addons AND we have an 'input-group' className, the field becomes small width instead of full width. There should be a better solution than this in the bootstrap docs somewhere */}
        {prefix &&
          <span className="input-group-addon" id={`${id}-prefix`}>
            {prefix}
          </span>
        }
        <input
          type="text"
          name={name}
          id={id}
          className="form-control"
          aria-describedby={ariaDescribedBy}
          {...rest}
        />
        {postfix &&
          <span className="input-group-addon" id={`${id}-postfix`}>
            {postfix}
          </span>
        }
      </div>
    </div>
  );
}

TextField.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  prefix: PropTypes.node,
  postfix: PropTypes.node,
};
