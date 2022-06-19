import React from 'react';
import { Container, Button } from 'react-bootstrap'
import AddDiamond from '../components/AddNewDiamond'
import DiamondList from '../components/DiamondsList'
import { user, listPrice } from '../App'
import { Diamond1 } from '../Classes/Diamond'
import DiamondNavbar from '../components/DiamondNavbar';
import diamondPic from '../data/l8cb11pkn10.jpg'
import Parse from 'parse'; 

import priceList from '../data/prices.json';
const axios = require('axios').default


export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diamondArr: [],
      prices: [],
      isLoading: true,
      filter: {
        shape: [],
        colorMin: "D",
        colorMax: "YZ",
        clarityMin: "FL",
        clarityMax: "I3",
        weightMin: 0,
        weightMax: 10000,
        owner: false,
        clearColorFilter: false,
        clearClarityFilter: false
      },
      edit: -1
    }
  }
  componentDidMount() {
    // let {diamondArr,isLoading,prices}=this.state;
    let isLoading = true;
    let diamondArr = [];
    let prices = priceList;
    var newDiamond;
    const Diamond = Parse.Object.extend('Diamond');
    const query = new Parse.Query(Diamond);
    query.find().then((diamondsParse) => {
      // You can use the "get" method to get the value of an attribute
      // Ex: response.get("<ATTRIBUTE_NAME>")
      diamondsParse.forEach((diamond) => {
        newDiamond = new Diamond1(diamond);
        diamondArr = diamondArr.concat([newDiamond]);
      })
      isLoading = false;
      this.setState({ diamondArr, isLoading, prices })
    }, (error) => {

      console.error('Error while fetching Diamond', error);
    });
  }

  saveDiamond = (diamond, atEdit) => {
    console.log(diamond);
    let { edit, diamondArr } = this.state;

    if (atEdit === -1) {

      const Diamond = Parse.Object.extend('Diamond');
      const myNewObject = new Diamond();

      myNewObject.set('lotID', diamond.lotID);
      myNewObject.set('shape', diamond.shape);
      myNewObject.set('weight', Number(diamond.weight));
      myNewObject.set('color', diamond.color);
      myNewObject.set('clarity', diamond.clarity);
      myNewObject.set('cut', diamond.cut);
      myNewObject.set('polish', diamond.polish);
      myNewObject.set('symmetry', diamond.symmetry);
      myNewObject.set('fluorescence', diamond.fluorescence);
      myNewObject.set('fluorescenceColor', diamond.fluorescenceColor);
      myNewObject.set('lab', diamond.lab);
      myNewObject.set('certificateNumber', diamond.certificateNumber);
      myNewObject.set('depth', Number(diamond.depth));
      myNewObject.set('table', Number(diamond.table));
      myNewObject.set('crownAngle', Number(diamond.crownAngle));
      myNewObject.set('crownHeight', Number(diamond.crownHeight));
      myNewObject.set('pavillionAngle', Number(diamond.pavillionAngle));
      myNewObject.set('pavillionDepth', Number(diamond.pavillionDepth));
      myNewObject.set('starLength', Number(diamond.starLength));
      myNewObject.set('lowerHalf', Number(diamond.lowerHalf));
      myNewObject.set('girdle', diamond.girdle);
      myNewObject.set('culet', diamond.culet);
      myNewObject.set('list', Number(diamond.list));
      myNewObject.set('discount', Number(diamond.discount));
      myNewObject.set('pricePerCarat', Number(diamond.pricePerCarat));
      myNewObject.set('links', diamond.links);
      // myNewObject.set('inclusions',diamond.inclusions);
      if (diamond.keepDiscount) {myNewObject.set('keepDiscount', true)} else {myNewObject.set('keepDiscount', false)}
      // myNewObject.set('keepDiscount', diamond.keepDiscount);
      myNewObject.set('diamMin', Number(diamond.diamMin));
      myNewObject.set('diamMax', Number(diamond.diamMax));
      myNewObject.set('deptAvg', Number(diamond.deptAvg));
      myNewObject.set('owner', Parse.User.current());

      if (diamond.pic1 && diamond.pic1.file) myNewObject.set('pic1', new Parse.File(diamond.pic1.name, diamond.pic1.file));
      if (diamond.pic2 && diamond.pic2.file) myNewObject.set('pic2', new Parse.File(diamond.pic2.name, diamond.pic2.file));

      myNewObject.save().then(
        (result) => {
          console.log('Diamond created', result);
          diamondArr = diamondArr.concat([new Diamond1(result)]);
    
          edit = -1;
          this.setState({ edit, diamondArr });
        },
        (error) => {
          console.error('Error while creating Diamond: ', error);
        }
      );
    }
    else {
      const Diamond = Parse.Object.extend('Diamond');
      const query = new Parse.Query(Diamond);
      // here you put the objectId that you want to update
      query.get(diamond.id).then((object) => {
        object.set('lotID', diamond.lotID);
        object.set('shape', diamond.shape);
        object.set('weight', Number(diamond.weight));
        object.set('color', diamond.color);
        object.set('clarity', diamond.clarity);
        object.set('cut', diamond.cut);
        object.set('polish', diamond.polish);
        object.set('symmetry', diamond.symmetry);
        object.set('fluorescence', diamond.fluorescence);
        object.set('fluorescenceColor', diamond.fluorescenceColor);
        object.set('lab', diamond.lab);
        object.set('certificateNumber', diamond.certificateNumber);
        object.set('depth', Number(diamond.depth));
        object.set('table', Number(diamond.table));
        object.set('crownAngle', Number(diamond.crownAngle));
        object.set('crownHeight', Number(diamond.crownHeight));
        object.set('pavillionAngle', Number(diamond.pavillionAngle));
        object.set('pavillionDepth', Number(diamond.pavillionDepth));
        object.set('starLength', Number(diamond.starLength));
        object.set('lowerHalf', Number(diamond.lowerHalf));
        object.set('girdle', diamond.girdle);
        object.set('culet', diamond.culet);
        object.set('list', Number(diamond.list));
        object.set('discount', Number(diamond.discount));
        object.set('pricePerCarat', Number(diamond.pricePerCarat));
        object.set('links', diamond.links);
        // object.set('inclusions',diamond.inclusions);
        if (diamond.keepDiscount) {object.set('keepDiscount', true)} else {object.set('keepDiscount', false)}
        object.set('diamMin', Number(diamond.diamMin));
        object.set('diamMax', Number(diamond.diamMax));
        object.set('deptAvg', Number(diamond.deptAvg));
        object.set('owner', Parse.User.current());
  
        if (!diamond.pic1.file) {object.set('pic1',null)}
        else if (!diamond.pic1.file["_name"]){ object.set('pic1', new Parse.File(diamond.pic1.name, diamond.pic1.file)); }
        else  {object.set('pic1', diamond.pic1.file)};
        if (!diamond.pic2.file) {object.set('pic2',null)}
        else if (!diamond.pic2.file["_name"]){ object.set('pic2', new Parse.File(diamond.pic2.name, diamond.pic2.file)); }
        else  {object.set('pic2', diamond.pic2.file)};       
        object.save().then((response) => {
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
          console.log('Updated Diamond', response);
         diamondArr.splice(atEdit, 1, new Diamond1(response));
          edit = -1;
          this.setState({ edit, diamondArr });
        }, (error) => {

          console.error('Error while updating Diamond', error);
        });
      });

    }

  }

  deleteDiamond = (index) => {
    let { diamondArr } = this.state;
    let id = diamondArr[index].id;
    const Diamond = Parse.Object.extend('Diamond');
    const query = new Parse.Query(Diamond);
    // here you put the objectId that you want to delete
    query.get(id).then((object) => {
      object.destroy().then((response) => {

        var newArr = diamondArr.splice(index, 1);
        this.setState(newArr);
        console.log('Deleted Diamond', response);
      }, (error) => {

        console.error('Error while deleting Diamond', error);
      });
    });


  }
  setFilter = (filter) => {
    this.setState({ filter })
  }
  editDiamond = (index) => {
    let newState = this.state;
    newState.edit = index;
    this.setState(newState)
  }
  cancelEdit = () => {
    let newState = {
      edit: -1
    }
    this.setState(newState)
  }
  clearFilter = () => {
    let filter = {
      shape: [],
      colorMin: "D",
      colorMax: "YZ",
      clarityMin: "FL",
      clarityMax: "I3",
      weightMin: "",
      weightMax: "",
      owner: false,
      clearClarityFilter: true,
      clearColorFilter: true
    }
    this.setFilter(filter);
  }
  render() {
    const { activeUser, handleLogout, allMessages } = this.props;
    if (this.state.isLoading) return false;
 
    return (

      <Container >
        <DiamondNavbar cart={this.props.cart}  allMessages={allMessages} activeUser={activeUser} handleLogout={handleLogout} />
        <AddDiamond filter={this.state.filter} setFilter={this.setFilter} activeUser={activeUser} saveDiamond={this.saveDiamond} cancelEdit={this.cancelEdit} addEdit={this.addEdit} prices={this.state.prices} edit={this.state.edit} diamonds={this.state.diamondArr} />
        <DiamondList cart={this.props.cart}   addToCart={this.props.addToCart}  addMessage={this.props.addMessage} clearFilter={this.clearFilter} filter={this.state.filter} setFilter={this.setFilter} ownerName={this.props.ownerName} activeUser={activeUser} deleteDiamond={this.deleteDiamond} editDiamond={this.editDiamond} list={this.state.diamondArr} />
      </Container>
    );
  }
}

export default Search;