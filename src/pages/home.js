import React from 'react';
import {Container} from 'react-bootstrap'
import HomePageBody from '../components/HomePageBody'
import DiamondNavbar from '../components/DiamondNavbar';

export class Home extends React.Component {
  constructor(props) {
    super(props);
 
}
    render() {
      const { activeUser, handleLogout,allMessages } = this.props;

      return (
        <Container>
          <DiamondNavbar cart={this.props.cart} allMessages={allMessages} activeUser={activeUser} handleLogout={handleLogout}/>
          <HomePageBody />
        </Container>
      );
    }
  }

