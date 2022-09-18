import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";
import './register.css'
import {Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import InputGroup from 'react-bootstrap/InputGroup';

import AuthService from "../services/auth.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vfirstname = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The first name must be between 3 and 20 characters.
            </div>
        );
    }
}

const vlastname = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The last name must be between 3 and 20 characters.
            </div>
        );
    }
}

const vaddress = value => {
    if (value.length < 1) {
        return (
            <div className="alert alert-danger" role="alert">
                The address must be a valid address.
            </div>
        );
    }
}

const vdob = value => {
    if (value.length < 1) {
        return (
            <div className="alert alert-danger" role="alert">
                The date of birth must be a valid date.
            </div>
        );
    }
}

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
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
            <div className="col-md-12 ">
                <br></br>
                <br></br>
                <div className="container " style={{width: "50%"}}>


                    <Form
                        onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (

                            <div className="col-lg-6 offset-lg-3">
                                <h2>Create an account</h2>


                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Input
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
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        className="form-control form-rounded"
                                        name="password"
                                        placeholder="Must have 8 or more charcters"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                    />
                                </div>

                                <div className="input-group form-row side">

                                <div className="form-group">
                                    <label htmlFor="firstname">First Name</label>
                                    <Input
                                        type="text"
                                        className="form-control form-rounded"
                                        name="firstname"
                                        placeholder="E.g Smith"
                                        value={this.state.firstname}
                                        onChange={this.onChangeFirstname}
                                        validations={[required, vfirstname]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastname">Last Name</label>
                                    <Input
                                        type="text"
                                        className="form-control form-rounded"
                                        name="lastname"
                                        placeholder="E.g John"
                                        value={this.state.lastname}
                                        onChange={this.onChangeLastname}
                                        validations={[required, vlastname]}
                                    />
                                </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="dob">Date of Birth</label>
                                       <Input
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
                                    <Input
                                        type="text"
                                        className="form-control form-rounded"
                                        name="address"
                                        placeholder="Enter your Address here"
                                        value={this.state.address}
                                        onChange={this.onChangeAddress}
                                        validations={[required, vaddress]}
                                    />
                                </div>
                                <br></br>
                                <a><u>Already have an account</u></a>

                                <hr></hr>

                                <div className="form-group"  >

                                 <>
                                <ButtonToolbar
                                    className="justify-content-between "
                                    aria-label="Toolbar with Button groups"
                                >
                                    <ButtonGroup aria-label="First group">
                                    <button variant="secondary" className=" btn btn-light button-1">&lt;Back</button>{' '}
                                    </ButtonGroup>
                                        <button variant="secondary" className="btn orange button-2" >Create Account</button>
                                </ButtonToolbar>
                                </>
                                </div>



                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
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
                <br></br>
                <br></br>
                <br></br>
            </div>
        );
    }
}
