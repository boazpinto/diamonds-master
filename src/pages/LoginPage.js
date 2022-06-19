import React from 'react'
import { Container,Form, Button, Alert } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import DiamondNavbar from '../components/DiamondNavbar';
import User from '../Classes/User'
import Parse from 'parse';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invalidLogin: false,
            successLogin: false
        }

        this.emailInput = React.createRef();
        this.pwdInput = React.createRef();

        this.login = this.login.bind(this);
    }

    login() {
        // Pass the username and password to logIn function
        Parse.User.logIn(this.emailInput.current.value,this.pwdInput.current.value).then((user) => {
            // Do stuff after successful login
             console.log('Logged in user', user);

            const User1 = new Parse.User();
            const query = new Parse.Query(User1);

            // Finds the user by its ID
            query.get(user.id).then((user) => {
                // Updates the data we want
                user.set('isLogin', true);
                user.save().then((response) => {
                console.log('Updated user', response);
                    this.props.handleLogin(new User(user));
                    this.setState({successLogin: true});
                }).catch((error) => {
                console.error('Error while updating user', error);
                });
            });

        }).catch(error => {
  
            console.error('Error while logging in user', error);
            this.setState({invalidLogin: true});
        })

    }

    render() {
        const { activeUser, handleLogout } = this.props;
        if (this.state.successLogin) {
            return <Redirect to="/home"/>
        }

        return (
            <Container>
            <DiamondNavbar cart={this.props.cart}   allMessages={this.state.allMessages} activeUser={activeUser} handleLogout={handleLogout}/>
            <div className="login">
                <h1>Login to Diamonds</h1>
                <p>or <a href="#/signup">create an account</a></p>
                <Alert variant="danger" show={this.state.invalidLogin}>
                    Invalid email or password!
                </Alert>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                        // value="pintob" 
                        ref={this.emailInput} type="email" placeholder="Enter email"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        //  value="1397"
                          ref={this.pwdInput}  type="password" placeholder="Password"/>
                    </Form.Group>
                    <Button variant="success" type="button" block onClick={this.login}>
                        Login
                    </Button>
                </Form>
            </div>
            </Container>
        );
    }
}
export default LoginPage;