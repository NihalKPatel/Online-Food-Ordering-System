import React, {Component} from "react";

import UserService from "../services/user.service";
import logo from "../images/logo_name_white.png";
export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }
x
    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div className="home home-section">
                <div>
                    <header className="container" style={{paddingTop:"150px"}}>
                        <img src={logo} style={{display:"block", marginLeft:"auto", marginRight: "auto",height:"218px", width:"612px"}}/>
                        <p style={{textAlign:"center", color:"white", paddingTop:"50px", fontSize:"25px" }}>Find Local Restaurants</p>
                    </header>
                </div>
            </div>
        );
    }
}
