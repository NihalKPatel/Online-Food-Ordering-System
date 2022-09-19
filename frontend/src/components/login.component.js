import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";

const input = {
    borderRadius: "10px",
    border: "1px solid black",
}
const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email: "",
            password: "",
            loading: false,
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

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.email, this.state.password).then(
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
        } else {
            this.setState({
                loading: false
            });
        }
    }




    render() {
        return (
            <div className="col-md-12 signin-section" style={{paddingTop:"10%",backdropFilter: "blur(100px)"}}>

                <div className="container " style={{width: "40%"}}>

                    <Form
                        onSubmit={this.handleLogin}
                        ref={c => {
                            this.form = c;
                        }}
                        style={{}}
                    >

                        <div style={{width: "75%", display: "block", margin: "auto",paddingTop:"10%"}}>
                            <h1 style={{textAlign: 'center'}}>Log in</h1>
                        <div className="form-group">
                            <label htmlFor="email" style={{fontSize: "20px",}}>Email</label>
                            <Input type="text"  className="form-control" style={input} placeholder={"Email Address"}  name="email"  value={this.state.email}  onChange={this.onChangeEmail} validations={[required]}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" style={{fontSize: "20px",}}>Password</label>
                            <Input type="password" className="form-control" style={input} name="password"  placeholder={"Password"} value={this.state.password} onChange={this.onChangePassword} validations={[required]}/>
                        </div>
                            <a href={"/login"} style={{display: 'flex', alignItems: 'right', justifyContent: 'right',textDecoration:"underline"}} >
                                Forgot Password?
                            </a>
                            <a href={"/register"} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration:"underline"}} >
                                Don't have an account?
                            </a>
                            <hr style={{border: "0.5px black solid", width: "90%"}}/>
                        <div className="form-group"  style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <button
                                disabled={this.state.loading}
                                variant="secondary" className="btn"
                                style={{backgroundColor: "#FF9431",color:"white",borderRadius:"10px",fontSize:"130%"}}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"/>
                                )}
                                Sign in
                            </button>
                        </div>
                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
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
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
