import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {Autocomplete} from "@react-google-maps/api";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


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

const vemail = value => {
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
        this.handleDelete = this.handleDelete.bind(this);
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
            message: "",
            editEmail: false,
            editAddress: false,
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

    handleDelete(e) {
        e.preventDefault();
        AuthService.delete().then(
            () => {
                this.props.history.push("/login");
                window.location.reload();
                AuthService.logout();
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

    handleUpdate(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });
        let email = this.state.email;
        // eslint-disable-next-line
        if (email == "") {
            email = this.state.currentUser.email;
        }

        let address = this.state.address;
        // eslint-disable-next-line
        if (address == "") {
            address = this.state.currentUser.address;
        }

        let password = this.state.password;
        // eslint-disable-next-line
        if (password == "") {
            address = this.state.currentUser.password;
        }

        let confirmpassword = this.state.confirmpassword;
        // eslint-disable-next-line
        if (confirmpassword == "") {
            address = this.state.currentUser.confirmpassword;
        }

        AuthService.update(
            email,
            this.state.password,
            address
        ).then(
            () => {
                this.props.history.push("/login");
                window.location.reload();
                AuthService.logout();
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


    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({redirect: "/login"});
        this.setState({currentUser: currentUser, userReady: true})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        const {currentUser} = this.state;
        return (
            <div className="profile-section">
                <div className="container" style={{width: "40%", fontSize: "70%", paddingTop: "9%"}}>
                    <Form onSubmit={this.handleUpdate}
                        ref={c => {
                            this.form = c;
                        }}
                        style={{borderRadius: "20px"}}
                    >
                        {(this.state.userReady) ?
                            <div style={{backgroundColor: "white", borderRadius: "20px", width:"100%",padding: "5%"}}>
                                <h2>Profile</h2>
                                <hr/>
                                <div>
                                    Name:{" "}
                                    <h4>{currentUser.firstname}{" "}{currentUser.lastname}</h4>
                                </div>
                                <div>
                                    Email:{" "}
                                    <input
                                        style={{height: "35px",marginTop:"10px", marginBottom:"10px", width:"100%"}}
                                        type="text"
                                        className="form-control form-rounded"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        validations={[vemail]}
                                    />
                                </div>
                                <div>
                                    Address:{" "}
                                    <Autocomplete
                                        onLoad={this.onLoad}
                                        onPlaceChanged={this.onPlaceChanged}
                                    >
                                        <input
                                            style={{height: "35px",marginTop:"10px", marginBottom:"10px", width:"100%"}}
                                            className="form-control form-rounded"
                                            name="address"
                                            placeholder="Enter your Address here"
                                            value={this.state.address}
                                            onChange={this.onChangeAddress}
                                            validations={[vaddress]}
                                        />
                                    </Autocomplete>
                                </div>
                                <div >Date of Birth:{" "}<h4 style={{height: "35px",marginTop:"10px", marginBottom:"10px", width:"100%"}}>{currentUser.dob}</h4></div>
                                <hr/>
                                <h2 style={{fontSize: "150%"}}>Change Password</h2>
                                <div style={{width: "100%", display: "block"}}>
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
                                    <hr/>

                                    <div className="form-group">
                                        <ButtonToolbar
                                            className="justify-content-between "
                                            aria-label="Toolbar with Button groups" >
                                            <button  className="btn btn-link" style={{width:"30%",color:"#FF0000",border:"1px #FF0000 solid", borderRadius:"10px"}} onClick={this.handleDelete}>Delete Account</button>
                                        <button
                                            className="btn"
                                            style={{backgroundColor: "#FF9431", color: "white",width:"50%", borderRadius:"10px"}}
                                        >Logout
                                        </button>

                                        </ButtonToolbar>
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

