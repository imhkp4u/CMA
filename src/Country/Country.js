import React from "react";
import "./Country.css";

const country = (props) => {
  return (
    <div className="Country">
      <p
        className="Paragraph"
        onClick={() => props.clicked(props.id, props.name)}
      >
        <span>Name:</span> {props.name}
      </p>
      <p className="Paragraph">
        <span> No of States:</span> {props.states}{" "}
      </p>
      <p className="Paragraph">
        <span> Capital :</span> {props.capital}{" "}
      </p>
      <button className="DeleteButton" onClick={() => props.delete(props.id)}>
        Delete
      </button>
      <button className="UpdateButton" onClick={() => props.update(props.id)}>
        Update
      </button>
    </div>
  );
};
export default country;
