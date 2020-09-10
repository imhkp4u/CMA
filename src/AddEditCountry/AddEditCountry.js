import React, { Component } from "react";
import Input from "../UI/Input";
import "./AddEditCountry.css";
import Aux from "../Hoc/Auxiliary";

class AddEditCountry extends Component {
  state = {
    addEditCountryForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Country",
          placeholder: "Enter country: ",
        },
        value: "",
      },
      capital: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Capital",
          placeholder: "Enter capital :",
        },
        value: "",
      },
    },
    showAddEditForm: true,
  };
  componentDidMount() {
    console.log("componentDidMount--------------------");
    let updatedForm = { ...this.state.addEditCountryForm };
    updatedForm.name.value = this.props.name;
    updatedForm.capital.value = this.props.capital;
    this.setState({ addEditCountryForm: updatedForm });
    this.setState({ nameError: "", capitalError: "" });
  }
  onInputChangeHandler = (event, id) => {
    let addEditForm = { ...this.state.addEditCountryForm };
    let updatedAddEditFormElement = { ...addEditForm[id] };
    updatedAddEditFormElement.value = event.target.value;
    addEditForm[id] = updatedAddEditFormElement;
    this.setState({ addEditCountryForm: addEditForm });
  };

  render() {
    let formElementsArray = [];
    let addPersonFormElements = { ...this.state.addEditCountryForm };
    for (let formElementIndex in addPersonFormElements) {
      const formValue = { ...addPersonFormElements[formElementIndex] };
      formElementsArray.push({
        id: formElementIndex,
        value: formValue,
      });
    }
    return (
      <Aux>
        <div className="BackDrop"></div>

        <div className="AddEditCountry">
          {formElementsArray.map((element, index) => {
            return (
              <Input
                inputtype="input"
                elementConfig={element.value.elementConfig}
                label={element.value.elementConfig.label}
                value={element.value.value}
                key={index}
                changed={(event) =>
                  this.onInputChangeHandler(event, element.id)
                }
              />
            );
          })}
          <button
            className="AddEditButtonClass"
            onClick={() =>
              this.props.addEditClicked(this.state.addEditCountryForm)
            }
          >
            {this.props.updateMode ? "Update" : "Add"}
          </button>
          <button className="Close" onClick={this.props.onClose}>
            Back
          </button>
          <p style={{ color: "red" }}>{this.props.nameError}</p>
          <p style={{ color: "red" }}>{this.props.capitalError}</p>
        </div>
      </Aux>
    );
  }
}
export default AddEditCountry;
