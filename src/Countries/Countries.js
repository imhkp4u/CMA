import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import axios from "axios";
// Axios is a library that helps us make http requests to external resources.
import { BrowserRouter as Switch, Route } from "react-router-dom";

import Login from "../Login/Login";
import Country from "../Country/Country";
import AddEditCountry from "../AddEditCountry/AddEditCountry";

import Aux from "../Hoc/Auxiliary";

class Countries extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let isLoggedIn = true;
    if (token == null) {
      isLoggedIn = false;
    }
    this.state = {
      isLoggedIn,
    };
  }

  state = {
    countries: [],
    showAddForm: false,
    isUpdateMode: false,
    countryToBeUpdated: null,
    nameError: "",
    capitalError: "",
  };

  closeChild = () => {
    this.setState({
      showAddForm: false,
      isUpdateMode: false,
    });
  };

  componentDidMount() {
    this.getAllCountries();
  }

  getAllCountries() {
    axios
      .get("http://localhost:8080/countryapp/countries")
      .then((res) => {
        this.setState({ countries: res.data.post });
      })
      .catch((err) => {
        console.log("Error Occured" + err);
      });
  }
  onAddNewCountryHandler = () => {
    this.setState({ showAddForm: true });
  };

  onAddEditClickHandler = (formdata) => {
    console.log(formdata);
    let postData = {
      id: this.state.countryToBeUpdated
        ? +this.state.countryToBeUpdated.country_id
        : 0,
      name: formdata["name"].value,
      capital: formdata["capital"].value,
    };
    if (
      formdata.name.value == null ||
      formdata.name.value === undefined ||
      formdata.name.value === ""
    ) {
      this.setState({
        nameError: "Country name cannot be empty",
        capitalError: "",
      });
      return;
    }
    if (
      formdata.capital.value === undefined ||
      formdata.capital.value == null ||
      formdata.capital.value === ""
    ) {
      this.setState({ capitalError: "Capital cannot be empty", nameError: "" });
      return;
    }
    if (!this.state.isUpdateMode) {
      axios
        .post("http://localhost:8080/countryapp/addcountry", postData)
        .then((res) => {
          console.log("Data inserted" + res.status);
          this.getAllCountries();
          this.setState({ showAddForm: false });
        });
    } else {
      axios
        .post("http://localhost:8080/countryapp/updatecountry", postData)
        .then((res) => {
          console.log("Data Updated" + res.status);
          this.getAllCountries();
          this.setState({
            showAddForm: false,
            showChild: false,
            countryToBeUpdated: null,
            isUpdateMode: false,
          });
        });
    }
  };

  onUpdateHandler = (id) => {
    let updatedCountry = this.state.countries.find((country) => {
      return country.country_id === id ? true : false;
    });
    this.setState({
      showAddForm: true,
      isUpdateMode: true,
      countryToBeUpdated: updatedCountry,
    });
  };

  onDeleteHandler = (id) => {
    const data = { id: id };
    axios
      .post("http://localhost:8080/countryapp/deletecountry", data)
      .then((res) => {
        this.getAllCountries();
      });
  };

  Logout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/");
  };

  onNameClicked = (id, name) => {
    console.log("Programmtic navigations" + id);
    this.props.history.push(this.props.match.url + "/" + id + "/" + name);
  };

  render() {
    if (this.state.isLoggedIn === false) {
      return <Redirect to="/" />;
    }
    let countries = null;
    if (this.state.countries && this.state.countries.length > 0) {
      countries = this.state.countries.map((c) => {
        return (
          <Country
            name={c.country_name}
            capital={c.country_capital}
            states={c.states}
            id={c.country_id}
            key={c.country_id}
            delete={(id) => this.onDeleteHandler(id)}
            update={(id) => this.onUpdateHandler(id)}
            clicked={(id, name) => this.onNameClicked(id, name)}
          />
        );
      });
    }
    let addEditCountryForm = null;
    if (this.state.showAddForm && !this.state.isUpdateMode) {
      addEditCountryForm = (
        <AddEditCountry
          capitalError={this.state.capitalError}
          nameError={this.state.nameError}
          addEditClicked={(formdata) => this.onAddEditClickHandler(formdata)}
          onClose={this.closeChild}
        />
      );
    } else if (this.state.showAddForm && this.state.isUpdateMode) {
      addEditCountryForm = (
        <AddEditCountry
          addEditClicked={(formdata) => this.onAddEditClickHandler(formdata)}
          name={this.state.countryToBeUpdated.country_name}
          capital={this.state.countryToBeUpdated.country_capital}
          updateMode={this.state.isUpdateMode}
          onClose={this.closeChild}
        />
      );
    }
    return (
      <Aux>
        <div
          style={{
            marginTop: "25px",
            marginBottom: "10px",
          }}
        >
          <button
            className="nav-item"
            style={{ marginLeft: "90%" }}
            onClick={this.Logout}
          >
            Logout
          </button>
          <p
            style={{
              color: "red",
              fontSize: "40px",
              fontWeight: "bold",
              textAlign: "center",
              fontFamily: "Brush Script MT, Brush Script Std, cursive",
            }}
          >
            Country details:-
          </p>
          {addEditCountryForm}
          {countries}
          <button
            style={{
              width: 200,
              height: 40,
              backgroundColor: "#ff6666",
              marginLeft: "70px",
              border: "1px solid black",
              borderRadius: "5px",
              color: "white",
              textAlign: "center",
            }}
            onClick={this.onAddNewCountryHandler}
          >
            ADD A NEW COUNTRY
          </button>
        </div>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
          </Switch>
        </div>
      </Aux>
    );
  }
}

export default Countries;
