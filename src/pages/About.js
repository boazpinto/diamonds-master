import React from 'react';
import { Container, Jumbotron, ListGroup } from 'react-bootstrap'
import messagearrived from '../data/V-512.png'
import messageread from '../data/seen-300x225.webp'
import cartIcon from '../data/flat_seo3-24-512.png'
import excelTemplet from '../data/Save_Excel_Icon.jpg'
import DiamondNavbar from '../components/DiamondNavbar';

export default class About extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { activeUser, handleLogout, allMessages } = this.props;
        return (
            <Container>
                <DiamondNavbar cart={this.props.cart} allMessages={allMessages} activeUser={activeUser} handleLogout={handleLogout} />
                <Jumbotron fluid>
                    <Container>
                        <h1>About</h1>
                        <p>
                            this web sight has been built by Boaz Pinto as a final front end web development course project.

                        </p>
                        <h1>Features</h1>
                        <ListGroup>
                            <ListGroup.Item variant="primary">Search</ListGroup.Item>
                            <ListGroup.Item>show my listings - filter to owner=activeuser</ListGroup.Item>
                            <ListGroup.Item>clear all filters - clear filters</ListGroup.Item>
                            <ListGroup.Item>Add new Diamond - popup window to enter all diamond parameters</ListGroup.Item>
                            <ListGroup.Item>Acordion - click to see aditional information and action buttons</ListGroup.Item>
                            <ListGroup.Item>Hover on image to enlarge</ListGroup.Item>
                            <ListGroup.Item>Delete - action button for the owner of the diamond</ListGroup.Item>
                            <ListGroup.Item>Edit - action button for the owner of the diamond</ListGroup.Item>
                            <ListGroup.Item>contact - action button for user to send message to the owner</ListGroup.Item>
                            <ListGroup.Item>filter - filter the list of diamonds by min weight and max weight</ListGroup.Item>
                            <ListGroup.Item>filter - filter the list by shapes buttons, mutiple selectio, clear all and select all</ListGroup.Item>
                            <ListGroup.Item>filter - double sided range input for color and clarity</ListGroup.Item>
                            <ListGroup.Item>Upload from excel <img style={{width:"30px"}} src={excelTemplet}></img></ListGroup.Item>
                            <ListGroup.Item>Mapping excel headers with parse object keys</ListGroup.Item>
                            <ListGroup.Item variant="warning">Messages</ListGroup.Item>
                            <ListGroup.Item>List of members, sorted by new messages and by last message date</ListGroup.Item>
                            <ListGroup.Item>search a member by name or by userName</ListGroup.Item>
                            <ListGroup.Item>show conversation with member as a chat style</ListGroup.Item>
                            <ListGroup.Item>each message yoy send shows if it has been arrived <img style={{width:"20px"}} src={messagearrived}></img> or read <img style={{width:"20px"}}  src={messageread}></img></ListGroup.Item>
                            <ListGroup.Item>Delete message you wrote will delete message both sides</ListGroup.Item>
                            <ListGroup.Item>Delete message you reccieved will delete it only your side</ListGroup.Item>
                            <ListGroup.Item>input field to send message</ListGroup.Item>
                            <ListGroup.Item variant="success">Cart<img  style={{width:"30px"}} src={cartIcon} ></img></ListGroup.Item>
                            <ListGroup.Item>show your items in cart</ListGroup.Item>
                            <ListGroup.Item>combines diamonds in cart at login</ListGroup.Item>
                            <ListGroup.Item>canceling diamonds in cart that are owned by activeuser </ListGroup.Item>
                            <ListGroup.Item>delete button to remove from cart</ListGroup.Item>
                            <ListGroup.Item>summery of carats and prices</ListGroup.Item>
                            <ListGroup.Item>credit card form that shows an image of the credit card company by the first digits of credit muber</ListGroup.Item>
                            <ListGroup.Item variant="danger">Login</ListGroup.Item>
                            <ListGroup.Item variant="primary">Signup</ListGroup.Item>
                            <ListGroup.Item variant="success">HomePage</ListGroup.Item>
                            <ListGroup.Item>Carousel with pictures of diamonds and major diamond centers worlwide</ListGroup.Item>
                        </ListGroup>
                        <h1>Contact</h1>
                        <p>
                            Boaz Pinto - pintob@gmail.com

                        </p>
                    </Container>
                </Jumbotron>
            </Container>
        );
    }
}

