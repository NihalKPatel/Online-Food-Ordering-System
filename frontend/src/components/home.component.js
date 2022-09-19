import React, {Component} from "react";

import UserService from "../services/user.service";
import logo from "../images/logo_name_white.png";
import {AiOutlineSearch} from "react-icons/ai";
import {Card, Row} from "react-bootstrap";


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
            <div>
            <div  className="home  home-section py-5">
                    <div className="container" style={{paddingTop:"10%"}}>
                        <img src={logo} style={{display:"block", marginLeft:"auto", marginRight: "auto", height:"106px", width:"309px"}} alt={""}/>
                        <p style={{textAlign:"center", color:"white", paddingTop:"60px", fontSize:"25px" }}>Find Local Restaurants</p>
                        <div style={{paddingTop:"0.5%"}}>
                        <form>
                            <AiOutlineSearch style={{fontSize:"50px", marginTop:"15px", marginLeft:"10px", transform:"scale(-1, 1)"}}/>
                            <input className="searchbar" type="search" placeholder="Search..."/>
                            <button type="submit">Search</button>
                        </form>
                            </div>
                    </div>
            </div>
            <div>
                <div className="container" style={{paddingTop:"2%"}}>
                           <h1 style={{fontSize:"40px", lineHeight: "48px", textAlign: "center"}}>Popular Food Chains</h1>
                            <hr style={{border:"1px solid black"}}/>
                </div>
            </div>
            <div className="container" style={{paddingTop:"2%"}}>
                <Row>
                <Card style={{ width: '18rem' ,boxShadow:"none", border:"none", backgroundColor:"#db0007"}}>
                    <Card.Img variant="top" src="https://mcdonalds.co.nz/sites/all/themes/mcdonalds/images/token-logo.svg" style={{width:"150px", height:"150px"}} />
                    <Card.Body>
                        <Card.Title style={{textAlign:"center", color:"white"}}>McDonald's</Card.Title>
                        <Card.Text  style={{textAlign:"center", color:"white"}}>Fast Food Restaurant</Card.Text>
                    </Card.Body>
                </Card>
                    <Card style={{ width: '18rem' ,boxShadow:"none", borderColor:"#006341"}}>
                    <Card.Img variant="top" src="https://www.starbucks.co.nz/content/images/starbucks-logo.svg"style={{width:"150px", height:"150px"}}  />
                    <Card.Body>
                        <Card.Title  style={{textAlign:"center", color:"#006341"}}>Starbucks</Card.Title>
                        <Card.Text style={{textAlign:"center", color:"#006341"}}>Fast Food Restaurant</Card.Text>
                    </Card.Body>
                </Card>
                    <Card style={{ width: '18rem' ,boxShadow:"none", borderColor:"#e4002b", padding:"2px"}}>
                    <Card.Img variant="top" src="https://static.kfc.co.nz/images/web/kfc-logo.svg?v=2.0" style={{width:"150px", height:"150px"}} />
                    <Card.Body>
                        <Card.Title style={{textAlign:"center", color:"#e4002b"}}>KFC</Card.Title>
                        <Card.Text style={{textAlign:"center", color:"#e4002b"}}>Fast Food Restaurant</Card.Text>
                    </Card.Body>
                </Card>
                </Row>
            </div>
            </div>
        );
    }
}
