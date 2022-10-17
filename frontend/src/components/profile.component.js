import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";


const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
const validPassword = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$');

const required = value => {
    if (!value) {
        return (
            <div style={{color: "red", paddingTop: "1%"}} role="alert">
                This field is required!
            </div>
        );
    }
};

const vpassword = value => {
    if (!validPassword.test(value)) {
        return (
            <div style={{color: "red"}} role="alert">
                Minimum 8 characters, at least one letter and one number
            </div>
        );
    }
};

const vaddress = value => {
    if (!(value)) {
        return (
            <div style={{color: "red"}} role="alert">
                The address must be a valid address.
            </div>
        );
    }
}

const email = value => {
    if (!validEmail.test(value)) {
        return (
            <div style={{color: "red"}} role="alert">
                This is not a valid email.
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


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {firstname: ""},
            email: "",
            password: "",
            address: "",
            loading: false,
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

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeConfirmPassword(e) {
        this.setState({
            confirmpassword: e.target.value
        });
    }

    handleUpdate(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        AuthService.update(
            this.state.email,
            this.state.password,
            this.state.address
        ).then(
            () => {
                this.props.history.push("/profile");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage
                });
            }
        );
    }
    handleLogout() {
        AuthService.logout();
    }
    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({redirect: "/home"});
        this.setState({currentUser: currentUser, userReady: true})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        const {currentUser} = this.state;
        return (
            <div className="profile-section">
                <div className="container" style={{width: "50%", fontSize: "70%", paddingTop: "9%"}}>
                    <Form onSubmit={this.handleUpdate}
                        ref={c => {
                            this.form = c;
                        }}
                        style={{borderRadius: "20px"}}
                    >
                        {(this.state.userReady) ?
                            <div style={{backgroundColor: "white", borderRadius: "20px", padding: "5%"}}>
                                <h2>Profile</h2>
                                <hr/>
                                <div>
                                    Name:{" "}
                                    <h4>{currentUser.firstname}{" "}{currentUser.lastname}</h4>
                                </div>
                                <div>
                                    Email:{" "}<h4>{currentUser.email}</h4>
                                    <input
                                        style={{height: "35px"}}
                                        type="text"
                                        className="form-control form-rounded"
                                        name="email"
                                        value={currentUser.email}
                                        onChange={this.onChangeEmail}
                                    />
                                </div>
                                <div>
                                    Address:{" "}<h4>{currentUser.address}</h4></div>
                                <div>Date of Birth:{" "}<h4>{currentUser.dob}</h4></div>
                                <hr/>
                                <h2 style={{fontSize: "150%"}}>Change Password</h2>
                                <div style={{width: "75%", display: "block"}}>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Input
                                            style={{height: "35px"}}
                                            type="password"
                                            className="form-control"
                                            placeholder={"Password"}
                                            name="password"
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
                                    <div className="form-group">
                                        <button
                                            className="btn"
                                            style={{backgroundColor: "#FF9431", color: "white"}}
                                        >Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                            : null}
                    </Form>
                </div>
            </div>
        );
    }
}

