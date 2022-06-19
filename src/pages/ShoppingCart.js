import React from 'react'
import { Container,Table } from 'react-bootstrap'
// import { Redirect } from 'react-router-dom';
import DiamondNavbar from '../components/DiamondNavbar';
import { Diamond1 } from '../Classes/Diamond';
import Parse from 'parse';
import deleteFromCartIcon from '../data/delete-1507091-1279000.png'
import PaymentForm from '../components/PaymentForm'

// import User from '../Classes/User'
// import Parse from 'parse';

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            diamondsInCart: []
        }
    }
    componentDidMount(){
            let diamondsInCart=[];
            const {cart}=this.props;
            const Diamond = Parse.Object.extend('Diamond');
            const query = new Parse.Query(Diamond);

            query.find().then((results) => {
                // You can use the "get" method to get the value of an attribute
                // Ex: response.get("<ATTRIBUTE_NAME>")
                results.forEach(diamond=>{
                    if (cart.includes(diamond.id)) {diamondsInCart.push(new Diamond1(diamond))};
                })
                console.log('Diamond found', results);
                this.setState({diamondsInCart});
            }, (error) => {
                
                console.error('Error while fetching Diamond', error);
            });
        }
        render() {
            const { activeUser, handleLogout, allMessages, cart,ownerName,deleteFromCart } = this.props;
            const { diamondsInCart } = this.state;
            let index=-1;
            let tableLines=[];
            let weight,price,lineTotal,total;
            let caratTotal=0;
            let priceAVG=0;
            total=0;
            if (!diamondsInCart.length){tableLines.push(<tr key={index}><td style={{width:"100%"}}><h3>Your cart is empty</h3></td></tr>)}
            else{
            diamondsInCart.forEach(diamond=>{
                index++;
                weight=diamond.weight;
                price=diamond.pricePerCarat;
                lineTotal=weight*price;
                total+=lineTotal;
                caratTotal+=weight;
                if (caratTotal) priceAVG=total/caratTotal;
                tableLines.push(           
                 <tr key={index}>
                    {/* <td>{index}</td> */}
                    <td style={{width:"15%"}}>{ownerName(diamond.owner.id)}</td>
                    <td style={{width:"15%"}}>{`${diamond.lotID} ${diamond.shape} ${diamond.color} ${diamond.clarity}`}</td>
                    <td style={{width:"10%"}}>{weight}</td>
                    <td style={{width:"15%"}}>{price.toFixed(2)}</td>
                    <td style={{width:"15%"}}>{lineTotal.toFixed(2)}</td>
                    <td style={{width:"20%"}}><img className="deleteMessage" 
                            onClick={()=>{
                             
                                    diamondsInCart.splice(index,1);
                                    this.setState({diamondsInCart});
                                    deleteFromCart(diamond.id);
                                    
                                } }
                            style={{width:"30px"}} 
                            src={deleteFromCartIcon}></img></td>
                </tr>)
                
            })
            tableLines.push(           
                <tr>
                   {/* <td></td> */}
                   <td style={{width:"15%"}}></td>
                   <td style={{width:"15%"}}></td>
                   <td style={{fontWeight:"bold",width:"10%"}}>{caratTotal.toFixed(2)}</td>
                   <td style={{width:"15%"}}>{priceAVG.toFixed(2)}</td>
                   <td style={{fontWeight:"bold",width:"15%"}}>{total.toFixed(2)}</td>
                   <td style={{width:"20%"}}></td>
               </tr>)           
            }
            return (
                <Container>
                    <DiamondNavbar cart={cart} allMessages={allMessages} activeUser={activeUser} handleLogout={handleLogout} />
                    <h1>Shopping Cart</h1>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th style={{width:"15%"}}>Owner</th>
                                <th style={{width:"15%"}}>Desc</th>
                                <th style={{width:"10%"}}>Weight</th>
                                <th style={{width:"15%"}}>Price</th>
                                <th style={{width:"15%"}}>Total</th>
                                <th style={{width:"20%"}}>Del</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableLines}
                        </tbody>
                    </Table>

                    <PaymentForm/>
                </Container>
            );
        }
    }
    export default ShoppingCart;