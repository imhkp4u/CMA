import React, { Component } from "react";
import "./AddEditStates.css";
import Aux from "../Hoc/Auxiliary";
import Input from "../UI/Input";

class AddEditStates extends Component {
  state = {
    addEditStateForm: {
      statename: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "STATE NAME: ",
        },
        value: "",
      },
      capital: {
        elementType: "text",
        elementConfig: {
          type: "text",
          placeholder: "CAPITAL :",
        },
        value: "",
      },
    },
    showAddEditForm: true,
  };
  componentDidMount() {
    console.log("componentDidMount--------------------");
    let updatedForm = { ...this.state.addEditStateForm };
    updatedForm.statename.value = this.props.statename;
    updatedForm.capital.value = this.props.capital;
    this.setState({ addEditStateForm: updatedForm });
  }
  onInputChangeHnadler = (event, id) => {
    let addEditForm = { ...this.state.addEditStateForm };
    let updatedAddEditFormElement = { ...addEditForm[id] };
    updatedAddEditFormElement.value = event.target.value;
    addEditForm[id] = updatedAddEditFormElement;
    this.setState({ addEditStateForm: addEditForm });
  };
  render() {
    let formElementsArray = [];
    let addStateFormElements = { ...this.state.addEditStateForm };
    for (let formElementIndex in addStateFormElements) {
      const formValue = { ...addStateFormElements[formElementIndex] };
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
                label={element.value.elementConfig.placeholder}
                value={element.value.value}
                key={index}
                changed={(event) =>
                  this.onInputChangeHnadler(event, element.id)
                }
              />
            );
          })}
          <button
            className="AddEditButtonClass"
            onClick={() =>
              this.props.addEditClicked(this.state.addEditStateForm)
            }
          >
            {this.props.updateMode ? "UPDATE" : "ADD  "}
          </button>
          <button
            className="AddEditButtonClass"
            onClick={this.props.cancelClicked}
          >
            CANCEL
          </button>
        </div>
      </Aux>
    );
  }
}
export default AddEditStates;
