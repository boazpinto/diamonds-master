import React from 'react'
import { Button, ButtonToolbar, Alert } from 'react-bootstrap'
import ShowDiamond from '../components/ShowDiamond'
import SearchDiamondForm from '../components/SearchDiamondForm'
import SendMessageModal from '../components/SendMessageModal'
import SendOfferModal from '../components/SendOfferModal'


//RECIVES 3 PROPS 
//deleteDiamond=FUNCTION TO DELETE A DIAMOND(INDEX OF THE DELETED DIAMOND) 
//editDiamond=FUNCTION THAT CHANGES THE STATE OF THE FATHER COMPONENT SO
//                          THE ADDDIAMOND MODAL CHANGES TO EDIT MODAL(INDEX OF THE DIAMOND TO BE EDITED) 
//list=ARRAY OF DIAMONDS
export default class DiamondList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalOffer: false,
      index: "",
      list: this.props.list,
      show: false
    }
  }
  componentDidMount() {
    setInterval(this.hideAlert, 10000);
  }
  componentWillReceiveProps(nextProps) {
    let list = nextProps.list;
    this.setState({ list })
  }

  toggle = (e) => {
    this.setState({
      modal: !this.state.modal,
      index: e.target.value
    });
  }
  toggleOffer = (e) => {
    this.setState({
      modalOffer: !this.state.modalOffer,
      index: e.target.value
    });
  }
  handleClose = () => {
    this.setState({
      modal: false,
      modalOffer: false,
    });

  }
  // CALLS THE FATHER COMPONENT'S FUNCTION DELETEDIAMOND WITH THE INDEX OF THE DIAMOND
  deleteDiamond = (element) => {
    this.props.deleteDiamond(element.target.value)
  }
  // CALLS THE FATHER COMPONENT'S FUNCTION EDITDIAMOND WITH THE INDEX OF THE DIAMOND
  editDiamond = (element) => {

    this.props.editDiamond(element.target.value)
  }
  showAlert = () => {
    let { show } = this.state;
    show = true;
    this.setState({ show });
  }
  hideAlert = () => {
    let { show } = this.state;
    show = false;
    this.setState({ show });
  }
  render() {
    const {cart}=this.props;

    var result = [];
    for (var i = 0; i < this.state.list.length; i++) {
      if (this.state.list[i].inFilter(this.props.filter)
        && (!this.props.filter.owner
          || this.state.list[i].owner.id === this.props.activeUser.id)) {
        if (!this.props.activeUser) {
          //IF anonimus 
          //DISPLAY SINGLE DIAMOND

          result.push( <ShowDiamond  key={i} ownerName={this.props.ownerName} edit={i} description={this.state.list[i]}>
            <ButtonToolbar>
              {/* DISPLAY THE USER'S ACTION BUTTONS */}
              <Button onClick={(e) => {
                  if (!cart.includes(this.state.list[e.target.value].id)){
                  this.props.addToCart(this.state.list[e.target.value].id);
                  this.showAlert();
                }}}
                value={i} style={{ width: "100px", height: "60px", marginLeft: "15px", marginTop: "10px" }} variant="success">Add to Cart</Button>
            </ButtonToolbar>
          </ShowDiamond>
          )
          ;
        }

        else
          if (this.state.list[i].owner.id == this.props.activeUser.id) {
            //IF THE USER IS THE OWNER OF THE DIAMOND
            //DISPLAY SINGLE DIAMOND
            result.push(<ShowDiamond key={i} ownerName={this.props.ownerName} edit={i} description={this.state.list[i]}>
              <ButtonToolbar>
                {/* DISPLAY THE OWNER'S ACTION BUTTONS */}
                <Button onClick={this.editDiamond} value={i} style={{ width: "100px", height: "60px", marginLeft: "15px", marginTop: "10px" }} variant="warning">Edit</Button>
                <Button onClick={this.deleteDiamond} value={i} style={{ width: "100px", height: "60px", marginLeft: "15px", marginTop: "10px" }} variant="danger">Delete</Button>
                {/* <Button value={i} style={{ width: "100px", height: "60px", marginLeft: "15px", marginTop: "10px" }} variant="dark" >Add to Auction</Button> */}
              </ButtonToolbar>
            </ShowDiamond>)
            ;
          }
          else {
            //IF THE USER IS NOT THE OWNER OF THE DIAMOND
            //DISPLAY SINGLE DIAMOND
            result.push(<ShowDiamond key={i}  ownerName={this.props.ownerName} edit={i} description={this.state.list[i]}>
              <ButtonToolbar>
                {/* DISPLAY THE USER'S ACTION BUTTONS */}

                <Button onClick={this.toggleOffer} value={i} style={{ width: "100px", height: "60px", marginLeft: "15px", marginTop: "10px" }} variant="primary">Offer</Button>
                <Button onClick={(e) => {
                  if (!cart.includes(this.state.list[e.target.value].id)){
                  this.props.addToCart(this.state.list[e.target.value].id);
                  this.showAlert();
                }}}
                  value={i} style={{ width: "100px", height: "60px", marginLeft: "15px", marginTop: "10px" }} variant="success">Add to cart</Button>
                <Button onClick={this.toggle} value={i} style={{ width: "100px", height: "60px", marginLeft: "15px", marginTop: "10px" }} variant="secondary" >Contact seller</Button>
                {/* <Button value={i} style={{ width: "100px", height: "60px", marginLeft: "15px", marginTop: "10px" }} variant="info" >Bid</Button> */}
              </ButtonToolbar>
            </ShowDiamond>);
          }
      }
    }

    return (
      <div>
        <Alert id="alertAddToCart" key="alert" variant="info" show={this.state.show}>
          Diamond has been added to your Cart
        </Alert>
        <SearchDiamondForm clearFilter={this.props.clearFilter} filter={this.props.filter} setFilter={this.props.setFilter} />
        {result}
        <SendMessageModal show={this.state.modal} diamond={this.state.list[this.state.index]} activeUser={this.props.activeUser} addMessage={this.props.addMessage} close={this.handleClose} ownerName={this.props.ownerName} />
        <SendOfferModal show={this.state.modalOffer} diamond={this.state.list[this.state.index]} activeUser={this.props.activeUser} addMessage={this.props.addMessage} close={this.handleClose} ownerName={this.props.ownerName} />
      </div>
    );
  }
}
