import React from 'react';
import './App.css';
import './multiselect.css'
import { Switch, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Messages } from './pages/messages'
import { Search } from './pages/search.js'
import UserUpdate  from './pages/updateUser'
import jsonUsers from './data/users'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/Signup'
import Parse from 'parse';
import User from './Classes/User'
import { Message, usersMessages } from './Classes/Message'
import UserMessages from '../src/components/UserMessages'
import ShoppingCart from '../src/pages/ShoppingCart'
import About from '../src/pages/About'
import $ from "jquery";
import LoadExcel  from './pages/Load';

// import rapList from '../src/data/prices.json';

// input: 4c's of diamond and a pricelist. output : list price of the diamond
export function listPrice(shape, color, clarity, weight, priceList) {
// priceList=rapList;
  if (shape != "BR" && shape != "round") { shape = "pear" } else { shape = "round" };
  for (var i = 0; i < priceList.length; i++) { //searches the right price on the pricelist
    if (shape === priceList[i].shape && color === priceList[i].color &&
      clarity === priceList[i].clarity && weight >= Number(priceList[i].low_size) &&
      weight <= Number(priceList[i].high_size))
      return Number(priceList[i].caratprice);
  }
  return 0;
}

//returns the owner of a diamond
function ownerOfDiamond(diamondId) {

  const Diamond = Parse.Object.extend('Diamond');
  const query = new Parse.Query(Diamond);
  query.equalTo("objectId", diamondId);
  query.find().then((results) => {
    // You can use the "get" method to get the value of an attribute
    // Ex: response.get("<ATTRIBUTE_NAME>")
    results.forEach(diamond => {
      if (diamond.id === diamondId) { alert(diamond.get("owner").id); return diamond.get("owner").id }
    })
  }, (error) => {

    console.error('Error while fetching Diamond', error);
    return false;
  });
}


//main component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parseActive: null,
      activeUser:
        null,
      allUsers: [],
      allMessages: [],
      isLoading: true,
      cart: []
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);


  }
//fetch messages related to activeuser from parse
  getMessages = () => {
    const { activeUser, parseActive } = this.state;
    if (activeUser) {
      let allMessages = [];

      const parseMessages = Parse.Object.extend('Messages');

      //messages from activeuser
      const query1 = new Parse.Query(parseMessages);
      query1.equalTo('from', parseActive);

      //messages to activeuser
      const query2 = new Parse.Query(parseMessages);
      query2.equalTo('to', parseActive);

      //messages from activeuser or to activeuser
      const composedQuery = Parse.Query.or(query1, query2);

      composedQuery.count().then((count) => {
        //only 100 last messages
        if (count > 100) composedQuery.skip(count - 100);
        composedQuery.find().then((results) => {
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
          console.log('Messages found', results);
          let message1;
          results.forEach(message => {
            message1 = new Message(message);
            //setting received to all messages to activeuser that are still marked not recieved
            if (message1.to.id === activeUser.id && !message1.recieved) {
              message1.recieved = true;
              const Messages = Parse.Object.extend('Messages');
              const query = new Parse.Query(Messages);
              // here you put the objectId that you want to update
              query.get(message1.id).then((object) => {
                object.set('recieved', true);
                object.save().then((response) => {
                  // You can use the "get" method to get the value of an attribute
                  // Ex: response.get("<ATTRIBUTE_NAME>")

                  console.log('Updated Messages', response);
                }, (error) => {

                  console.error('Error while updating Messages', error);
                });
              });
            }
            allMessages.push(message1);

          });
          this.setState({ allMessages });
        }, (error) => {
          console.error('Error while fetching Messages', error);
        });

      })
    }
  }


  componentDidMount() {

    //set interval for short time will read messages again and agin and will be more live
    // setInterval(this.getMessages, 3000000000);

    if (Parse.User.current()) { 
      this.handleLogin(new User(Parse.User.current()));
      this.setState({ successLogin: true });
    }

//retrieving all users
    let allUsers = [];
    const parseUser = new Parse.User();
    const query = new Parse.Query(parseUser);

    query.find().then((users) => {
      console.log('User found', users);
      users.forEach(user => {
        allUsers.push(new User(user))
        this.setState({ allUsers });
      })
    }, (error) => {
      console.error('Error while fetching user', error);
    });

  }


  handleLogout() {
    const User1 = new Parse.User();
    const query = new Parse.Query(User1);
    const { activeUser } = this.state;
    let { cart } = this.state;
    // Finds the user by its ID
    query.get(activeUser.id).then((user) => {
      // Updates the data we want

      user.set('isLogin', false);
      user.set('lastLogout', new Date());

      // Saves the user with the updated data
      user.save().then((response) => {
        console.log('Updated user logout', response);
        Parse.User.logOut();
      }).catch((error) => {

        console.error('Error while updating user', error);
      });
    });
    cart = [];
    this.setState({ activeUser: null, cart });
  }

  //at login retrieving the activeuser cart and merging with the current unregisterd user cart
  //diamonds in the unregistered user cart that are owned by activeuser will be deleted from cart
  handleLogin(activeUser) {

    let { cart } = this.state;

    //if prelogin cart is empty
    if (cart === []) {
      cart = activeUser.cart;
      this.setState({ activeUser, cart });
      this.getMessages();
    }

    //if prelogin cart is not empty and loginuser cart is not empty
    else if (activeUser.cart) {
      const Diamond = Parse.Object.extend('Diamond');
      const query = new Parse.Query(Diamond);
      // query.equalTo("objectId", cart[i]);
      query.find().then((results) => {
        // You can use the "get" method to get the value of an attribute
        // Ex: response.get("<ATTRIBUTE_NAME>")

        for (var i = 0; i < cart.length; i++) {
          if (!activeUser.cart.includes(cart[i])) {
            let ownerD;
            for (var j = 0; j < results.length; j++) {
              if (cart[i] === results[j].id) { ownerD = results[j].get("owner").id; break }
            }
            if (ownerD != activeUser.id) { activeUser.cart.push(cart[i]) };
          }
        }
        cart = activeUser.cart;

        const User = new Parse.User();
        const query = new Parse.Query(User);

        // Finds the user by its ID
        query.get(activeUser.id).then((user) => {
          // Updates the data we want
          let { parseActive } = this.state;
          parseActive = user;
          user.set('cart', cart);
          // Saves the user with the updated data
          user.save().then((response) => {

            console.log('Updated user', response);
          }).catch((error) => {

            console.error('Error while updating user', error);
          });
          this.setState({ activeUser, cart, parseActive });
          this.getMessages();
        });
      }, (error) => {

        console.error('Error while fetching Diamond', error);

      });

    }
     //if prelogin cart is not empty and loginuser cart is empty
    else {
      const User = new Parse.User();
      const query = new Parse.Query(User);

      // Finds the user by its ID
      query.get(activeUser.id).then((user) => {
        // Updates the data we want
        user.set('cart', cart);
        // Saves the user with the updated data
        user.save().then((response) => {

          console.log('Updated user', response);
          this.setState({ activeUser, cart });
          this.getMessages();
        }).catch((error) => {

          console.error('Error while updating user', error);
        });
      });
    }
  }

  //gets owner id and returns owner name
  ownerName = (userId) => {
    for (var i = 0; i < this.state.allUsers.length; i++) {
      if (this.state.allUsers[i].id == userId) return this.state.allUsers[i].fname + " " + this.state.allUsers[i].lname
    }

  }
  //delete message both sides. happens when the sender is the one that deletes the message
  deleteMessage = (id) => {
    let { allMessages } = this.state;
    const Messages = Parse.Object.extend('Messages');
    const query = new Parse.Query(Messages);
    // here you put the objectId that you want to delete
    query.get(id).then((object) => {
      object.destroy().then((response) => {

        console.log('Deleted Messages', response);
        for (var i = 0; i < allMessages.length; i++) {
          if (id === allMessages[i].id) {
            allMessages.splice(i, 1);
            break;
          }
        }
        this.setState({ allMessages });
      }, (error) => {

        console.error('Error while deleting Messages', error);
      });
    });
  }

  //marks the message deleted. it will not show only in the recieving side at conversation. happens when
  //the receiving side initiated the delete
  markDeleted = (id) => {
    let { allMessages } = this.state;
    const Messages = Parse.Object.extend('Messages');
    const query = new Parse.Query(Messages);
    // here you put the objectId that you want to update
    query.get(id).then((object) => {
      object.set('deleted', true);
      object.save().then((response) => {
        // You can use the "get" method to get the value of an attribute
        // Ex: response.get("<ATTRIBUTE_NAME>")

        console.log('Updated Messages', response);
        for (var i = 0; i < allMessages.length; i++) {
          if (id === allMessages[i].id) {
            allMessages.splice(i, 1);
            break;
          }
        }
        this.setState({ allMessages });
      }, (error) => {

        console.error('Error while updating Messages', error);
      });
    });
  }

  //add message
  addMessage = (text, fromID, toID) => {

    let { allMessages } = this.state;
    const User2 = new Parse.User();
    const User1 = new Parse.User();
    const query2 = new Parse.Query(User2);
    const query1 = new Parse.Query(User1);
    let from, to;

    query1.get(fromID).then((from1) => {
      from = from1;
      console.log('User found', from1);
      query2.get(toID).then((to1) => {
        to = to1;
        console.log('User found', to1);

        const Messages = Parse.Object.extend('Messages');
        const myNewObject = new Messages();
        myNewObject.set('from', from);
        myNewObject.set('to', to);
        myNewObject.set('text', text);
        myNewObject.set('read', false);
        myNewObject.set('deleted', false);
        myNewObject.set('recieved', false);
        myNewObject.save().then(
          (result) => {
            console.log('Messages created', result);
            allMessages.push(new Message(result));
            this.setState({ allMessages });
            // alert("The Message: '"+text+"' has been sent");

          },
          (error) => {
            console.error('Error while creating Messages: ', error);
          });
      }, (error) => {

        console.error('Error while fetching user', error);
      });

    }, (error) => {

      console.error('Error while fetching user', error);
    });

  }

  //mark all messages in conversation that are still not read as read
  messageRead = (message) => {
    const Messages = Parse.Object.extend('Messages');
    const query = new Parse.Query(Messages);
    // here you put the objectId that you want to update
    let { allMessages } = this.state;
    for (var i = 0; i < allMessages.length; i++) {
      if (allMessages[i].id === message.id) {
        allMessages[i].read = true;
        break;
      }
    }
    query.get(message.id).then((object) => {
      object.set('read', true);
      object.save().then((response) => {
        // You can use the "get" method to get the value of an attribute
        // Ex: response.get("<ATTRIBUTE_NAME>")
        console.log('Updated Messages', response);
      }, (error) => {
        console.error('Error while updating Messages', error);
      });
    });
    this.setState({ allMessages });
  }

  //add to cart a diamond
  addToCart = (diamondId) => {
    let { activeUser, cart } = this.state;
    if (!cart) cart = [];
    if (!cart.includes(diamondId)) {
      cart.push(diamondId);
   
      if (activeUser) {
        const User = new Parse.User();
        const query = new Parse.Query(User);

        // Finds the user by its ID
        query.get(activeUser.id).then((user) => {
          // Updates the data we want
          user.set('cart', cart);
          // Saves the user with the updated data
          user.save().then((response) => {

            console.log('Updated user', response);
          }).catch((error) => {

            console.error('Error while updating user', error);
          });
        });

      }
    }
    this.setState({ cart });
  }

  //delete from cart
  deleteFromCart = (item) => {
    let { cart, activeUser } = this.state;
    var index = cart.indexOf(item);
    if (index > -1) {
      cart.splice(index, 1);
      if (!activeUser) {
        this.setState({ cart })
      }
      else {
        const User = new Parse.User();
        const query = new Parse.Query(User);

        // Finds the user by its ID
        query.get(activeUser.id).then((user) => {
          // Updates the data we want
          user.set('cart', cart);
          // Saves the user with the updated data
          user.save().then((response) => {
            console.log('Updated user', response);
            this.setState({ cart })
          }).catch((error) => {
            console.error('Error while updating user', error);
          });
        });
      }
    }
  }
  render() {

    const { activeUser, allUsers, isLoading, allMessages, cart } = this.state;

    return (


      <Switch>
        <Route exact path="/" ><Home cart={cart} allMessages={allMessages} activeUser={activeUser} handleLogout={this.handleLogout}></Home></Route>
        <Route exact path="/home" ><Home cart={cart} allMessages={allMessages} activeUser={activeUser} handleLogout={this.handleLogout}></Home></Route>
        <Route exact path="/messages" ><Messages cart={cart} allMessages={allMessages} allUsers={allUsers} activeUser={activeUser} handleLogout={this.handleLogout}></Messages></Route>
        <Route exact path="/messages/:id" ><UserMessages cart={cart} markDeleted={this.markDeleted} deleteMessage={this.deleteMessage} messageRead={this.messageRead} addMessage={this.addMessage} allMessages={allMessages} allUsers={allUsers} activeUser={activeUser} handleLogout={this.handleLogout}></UserMessages></Route>
        <Route exact path="/search"><Search cart={cart} addToCart={this.addToCart} addMessage={this.addMessage} allMessages={allMessages} ownerName={this.ownerName} activeUser={activeUser} handleLogout={this.handleLogout}></Search></Route>
        <Route exact path="/login"> <LoginPage cart={cart} allMessages={allMessages} handleLogout={this.handleLogout} activeUser={activeUser} users={allUsers} handleLogin={this.handleLogin}></LoginPage></Route>
        <Route exact path="/signup"> <SignupPage cart={cart} allMessages={allMessages} handleLogout={this.handleLogout} activeUser={activeUser} users={allUsers} handleLogin={this.handleLogin}></SignupPage></Route>
        <Route exact path="/cart"><ShoppingCart deleteFromCart={this.deleteFromCart} cart={cart} allMessages={allMessages} ownerName={this.ownerName} activeUser={activeUser} handleLogout={this.handleLogout}></ShoppingCart></Route>
        <Route exact path="/updateUser" ><UserUpdate cart={cart} allMessages={allMessages} activeUser={activeUser} handleLogout={this.handleLogout} handleLogin={this.handleLogin}></UserUpdate></Route>
        <Route exact path="/about" ><About cart={cart} allMessages={allMessages} allUsers={allUsers} activeUser={activeUser} handleLogout={this.handleLogout}></About></Route>
        <Route exact path="/load" ><LoadExcel cart={cart} allMessages={allMessages} allUsers={allUsers} activeUser={activeUser} handleLogout={this.handleLogout}></LoadExcel></Route>
      </Switch>

      // </div>
    );
  }
}

export default App;
