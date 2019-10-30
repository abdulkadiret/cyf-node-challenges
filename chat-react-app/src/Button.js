import React from "react";

function Button(props) {
  return (
    <button type="submit" className="btn btn-secondary m-2">
      {props.name}
    </button>
  );
}

export default Button;
