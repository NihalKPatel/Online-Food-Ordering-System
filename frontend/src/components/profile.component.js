import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {username: ""}
        };
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
            <div className="container" style={{width:"45%",backgroundColor: "white"}}>
                {(this.state.userReady) ?
                    <div>
                        <h2>Profile</h2>
                        <hr/>
                        <div>
                            Name:{" "}
                            <h4>{currentUser.firstname}{" "}{currentUser.lastname}</h4>
                        </div>
                        <div>
                            Email:{" "}
                            <h4>{currentUser.email}</h4>
                        </div>
                        <div>
                            Address:{" "}
                            <h4>{currentUser.address}</h4>
                        </div>
                        <div>
                            Date of Birth:{" "}
                            <h4>{currentUser.dob}</h4>
                        </div>
                        <strong>Authorities:</strong>
                        <ul>
                            {currentUser.roles &&
                                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                        </ul>
                    </div> : null}
            </div>
            </div>
        );
    }
}
