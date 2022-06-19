import React from 'react';
import { InputGroup, FormControl,Jumbotron,Container } from 'react-bootstrap'
import Cards from 'react-credit-cards';


//payment form
export default class PaymentForm extends React.Component {
    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    };

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    render() {
        return (

        <Jumbotron fluid>
                <Container>
                    <h1>Payment</h1>
                    <p>
                        Please enter your credit card information
                    </p>
   
                <Cards className="md-12 sm-12"
                    cvc={this.state.cvc}
                    expiry={this.state.expiry}
                    focus={this.state.focus}
                    name={this.state.name}
                    number={this.state.number}
                />
                <div 
                style={{ width: "100%", marginTop: "50px" }} 
                // className=" container md-6 sm-12 mr-auto"  
                >
                    <InputGroup className="mb-3 sm-12">
                        <FormControl
                            type="tel"
                            name="number"
                            placeholder="Card Number"
                            aria-label="Card Number"
                            aria-describedby="basic-addon1"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 sm-6">
                        <FormControl
                            type="number"
                            name="expiry"
                            placeholder="MMYY"
                            aria-label="MMYY"
                            aria-describedby="basic-addon1"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 sm-6">
                        <FormControl
                            type="number"
                            name="cvc"
                            placeholder="CVC"
                            aria-label="CVC"
                            aria-describedby="basic-addon1"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 sm-12">
                        <FormControl
                            type="text"
                            name="name"
                            placeholder="name"
                            aria-label="name"
                            aria-describedby="basic-addon1"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                        />
                    </InputGroup>
                </div>
                </Container>
            </Jumbotron>
        );
    }
}