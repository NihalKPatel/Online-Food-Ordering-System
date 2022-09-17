import React, {Component} from "react";
import {Link, Route, Switch} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from "./images/logo_1_white_png.png";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

const headerStyle = {
    maxHeight: "80px",
    background: "#FF9431",
    color: "white",
}

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        AuthService.logout();
        this.setState({
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        });
    }

    render() {
        const {currentUser} = this.state;

        return (
            <div className="back-image">
                <nav className="navbar navbar-expand" style={headerStyle}>
                    <Link to={"/"} className="navbar-brand">
                        <img src={logo} style={{height:"70px", width:"70px"}}/>
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>


                        {currentUser && (
                            <li className="nav-item" >
                                <Link to={"/user"} className="nav-link">
                                    User
                                </Link>
                            </li>
                        )}
                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link" style={{borderRight:"3px solid white",paddingRight:"20px"}}>
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <div className="nav-link">
                                </div>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link" style={{color:"black",background:"white",border:"1px",borderRadius:"10px"}}>
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div>
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route path="/user" component={BoardUser}/>
                    </Switch>
                </div>

                { /*<AuthVerify logOut={this.logOut}/> */}
                        
                




                <footer class="bg-light text-center text-white black">
                <div class="text-center p-3">
                    © 2020 Copyright:
                    <a class="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
                </div>
                </footer>
            </div>
            
        );
    }
}

export default App;
