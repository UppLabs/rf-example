import React from 'react'
import {ControlLabel} from 'react-bootstrap'

function RenderField ({ input, label, placeholder, type, meta: { touched, error, warning } }) {
 return (
    <div>
        {label && <ControlLabel>{label}</ControlLabel>}
      <div>
        <input className="form-control" {...input} placeholder={placeholder} type={type}/>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-danger">{warning}</span>))}
      </div>
    </div>
  );
}

export default RenderField;