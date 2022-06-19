import React from 'react'
import { Navbar, Nav,Badge,Image } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import diamondLogo from '../data/1c7be669e68d05366ad16b7d2b40333b-diamond-gemstone-black-icon-by-vexels.png'
import {usersMessages} from '../Classes/Message'
import basket from '../data/flat_seo3-24-512.png'

class DiamondNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToHome: false
        }

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.handleLogout();

        if (window.location.hash != "#/") {
            this.setState({redirectToHome: true})
        }
    }

    // // this function in onvoked after every render (but not the first)
    // componentDidUpdate() {
    //     if (this.state.redirectToHome) {
    //         this.setState({redirectToHome: false})
    //     }
    // }

    

    render() {
        let itemsInCart;
        const { activeUser,allMessages,cart } = this.props;
        const { redirectToHome } = this.state;

        let pic;

        if (activeUser&&activeUser.pic) { pic = activeUser.pic["_url"] } else { pic = "https://scontent.ftlv6-1.fna.fbcdn.net/v/t31.0-1/c379.0.1290.1290a/10506738_10150004552801856_220367501106153455_o.jpg?_nc_cat=1&cachebreaker=sd&_nc_oc=AQmDPuqAMC36xNBFYpWyGbruJPR0Bwnz_z8drIOP6ckngglLREPuhsA77Q9ZymgFONs&_nc_ht=scontent.ftlv6-1.fna&oh=de23631b35970c121e8f864db29fb977&oe=5E4D3749" }

        const signupLink = !activeUser ? <Nav.Link href="#/signup">Signup</Nav.Link> : null;
        const loginLink = !activeUser ? <Nav.Link href="#/login">Login</Nav.Link> : null;
        const profile = activeUser ? <Nav.Link href="#/updateUser"><Image style={{width:"50px"}} src={pic} roundedCircle /></Nav.Link> : null;
        const logoutLink = activeUser ? <Nav.Link onClick={this.logout}>{" "+this.props.activeUser.fname+" Logout"}</Nav.Link> : null;
        const newMessages=usersMessages( activeUser,allMessages).new;
        let myBadge="";
        if (newMessages){myBadge=(<Badge pill variant="success">{newMessages}</Badge>)}
        if (cart.length) {itemsInCart=cart.length} else {itemsInCart=""};
        return (
            
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#/"><img className="logo" src={diamondLogo}></img>Diamonds</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#/search">Search</Nav.Link>
                        <Nav.Link href="#/messages">Messages{myBadge}</Nav.Link>
                        <Nav.Link href="#/about">About</Nav.Link>
                    </Nav>

                    <Nav className="ml-auto">
                    <Navbar.Brand href="#/cart"><img className="basket" style={{width:"30px"}} src={basket}></img>{itemsInCart}</Navbar.Brand>
                        {signupLink}
                        {loginLink}
                        {profile}
                        {logoutLink}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default DiamondNavbar;