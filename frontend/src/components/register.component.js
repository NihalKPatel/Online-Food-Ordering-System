import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import AuthService from "../services/auth.service";
import {Col} from "react-bootstrap";
import {Autocomplete} from '@react-google-maps/api';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
const validPassword = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$');
const validFirstname = new RegExp('^[a-z]{1,10}$');
const validLastname = new RegExp('^[a-z\']{2,10}$');
const validDob = new RegExp('^[a-z]{1,10}$');

const required = value => {
    if (!value) {
        return (
            <div style={{color: "red", paddingTop: "1%"}} role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!validEmail.test(value)) {
        return (
            <div style={{color: "red"}} role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vfirstname = value => {
    if (validFirstname.test(value)) {
        return (
            <div style={{color: "red"}} role="alert">
                The first name must be between 3 and 20 characters.
            </div>
        );
    }
}

const vlastname = value => {
    if (validLastname.test(value)) {
        return (
            <div style={{color: "red"}} role="alert">
                The last name must be between 3 and 20 characters.
            </div>
        );
    }
}

const vaddress = value => {
    if (!(value)) {
        return (
            <div style={{color: "red"}} role="alert">
                The address must be a valid address.
            </div>
        );
    }
}

const vdob = value => {
    if (validDob.test(value)) {
        return (
            <div style={{color: "red"}} role="alert">
                The date of birth must be a valid date.
            </div>
        );
    }
}

const vpassword = value => {
    if (!validPassword.test(value)) {
        return (
            <div style={{color: "red"}} role="alert">
                Minimum 8 characters, at least one letter and one number
            </div>
        );
    }
};
const vconfirmpassword = (value, props, components) => {
    const password = components.password[0].value;
    if (value !== password) {
        return (
            <div style={{color: "red"}} role="alert">
                The passwords do not match
            </div>
        );
    }
}

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
        this.state = {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            address: "",
            dob: "",
            successful: false,
            message: ""
        };

        this.autocomplete = null
        this.onLoad = this.onLoad.bind(this)
        this.onPlaceChanged = this.onPlaceChanged.bind(this)
    }

    onLoad(autocomplete) {
        console.log('autocomplete: ', autocomplete)
        this.autocomplete = autocomplete
    }

    onPlaceChanged() {
        if (this.autocomplete !== null) {
            console.log(this.autocomplete.getPlace())
            this.setState({
                address: this.autocomplete.getPlace().formatted_address
            });
        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeConfirmPassword(e) {
        this.setState({
            confirmpassword: e.target.value
        });
    }

    onChangeFirstname(e) {
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeDob(e) {
        this.setState({
            dob: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.email,
                this.state.password,
                this.state.firstname,
                this.state.lastname,
                this.state.address,
                this.state.dob

            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    render() {
        return (
            <div className="signup-section">
                <div className="container" style={{width: "50%", fontSize: "70%", paddingTop: "9%"}}>
                    <Form
                        onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                        style={{borderRadius: "20px"}}
                    >
                        {!this.state.successful && (
                            <div style={{width: "75%", display: "block", margin: "auto"}}>
                                <h2 style={{textAlign: 'center', paddingTop: "5%"}}>Create an account</h2>
                                <div className="form-group">
                                    <div className="input-group form-row side">
                                        <Col>
                                            <div className="form-group">
                                                <label htmlFor="firstname">First Name</label>
                                                <Input
                                                    style={{height: "35px"}}
                                                    type="text"
                                                    className="form-control form-rounded"
                                                    name="firstname"
                                                    placeholder="E.g John"
                                                    value={this.state.firstname}
                                                    onChange={this.onChangeFirstname}
                                                    validations={[required, vfirstname]}
                                                />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="form-group">
                                                <label htmlFor="lastname">Last Name</label>
                                                <Input
                                                    style={{height: "35px"}}
                                                    type="text"
                                                    className="form-control form-rounded"
                                                    name="lastname"
                                                    placeholder="E.g Smith"
                                                    value={this.state.lastname}
                                                    onChange={this.onChangeLastname}
                                                    validations={[required, vlastname]}
                                                />
                                            </div>
                                        </Col>
                                    </div>

                                    <label htmlFor="email">Email</label>
                                    <Input
                                        style={{height: "35px"}}
                                        type="text"
                                        className="form-control form-rounded"
                                        name="email"
                                        placeholder="E.g example@gmail.com"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, email]}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="dob">Date of Birth</label>
                                    <Input
                                        style={{height: "35px", width: "50%"}}
                                        type="date"
                                        className="form-control form-rounded"
                                        name="dob"
                                        value={this.state.dob}
                                        onChange={this.onChangeDob}
                                        validations={[required, vdob]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <Autocomplete
                                        onLoad={this.onLoad}
                                        onPlaceChanged={this.onPlaceChanged}
                                    >
                                        <input
                                            style={{height: "35px"}}
                                            type="text"
                                            className="form-control form-rounded"
                                            name="address"
                                            placeholder="Enter your Address here"
                                            value={this.state.address}
                                            onChange={this.onChangeAddress}
                                            validations={[required, vaddress]}
                                        />
                                    </Autocomplete>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        style={{height: "35px"}}
                                        type="password"
                                        className="form-control form-rounded"
                                        name="password"
                                        placeholder="Minimum 8 characters, at least one letter and one number"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Confirm Password</label>
                                    <Input
                                        style={{height: "35px"}}
                                        type="password"
                                        className="form-control form-rounded"
                                        name="password"
                                        placeholder="Confirm your password"
                                        value={this.state.confirmpassword}
                                        onChange={this.onChangeConfirmPassword}
                                        validations={[required, vconfirmpassword]}
                                    />
                                </div>
                                <a href={"/login"}
                                   style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    Already have an account?
                                </a>

                                <hr style={{border: "0.5px black solid", width: "90%"}}/>

                                <div className="form-group">
                                    <>
                                        <ButtonToolbar
                                            className="justify-content-between "
                                            aria-label="Toolbar with Button groups" >
                                            <ButtonGroup aria-label="First group">
                                                <a href="/home">
                                                    <button className=" btn"
                                                            style={{border: "1px black solid"}}>&lt;Back
                                                    </button>
                                                </a>
                                            </ButtonGroup>
                                            <Popup trigger={
                                            <button
                                                    className="btn"
                                                    style={{backgroundColor: "#FF9431"}}>Create Account
                                            </button>} modal>
                                                    {this.state.message && (
                                                    <div className="form-group">
                                                        <div
                                                            className={this.state.successful ? "alert alert-success" : "alert alert-danger"}
                                                            role="alert"
                                                        >
                                                            {this.state.message}
                                                        </div>
                                                    </div>
                                                )}
                                            </Popup>

                                        </ButtonToolbar>
                                    </>

                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{display: "none"}}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>


                </div>
            </div>
        );
    }
}
