import React from 'react';
import { Container, InputGroup, FormControl, ListGroup,Image,Badge } from 'react-bootstrap'
import HomePageBody from '../components/HomePageBody'
import DiamondNavbar from '../components/DiamondNavbar';
import {usersMessages} from '../Classes/Message'
import { Redirect } from 'react-router-dom'
import {fullMinutes, parseDateTime} from '../components/UserMessages'

export class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter:"",
            redirectTo:""
        }
    }
    filterUsers=(e)=>{
        let {filter}=this.state;
        filter=e.target.value;
        this.setState({filter})
    }
    compareFunction=(a,b)=>{
        if (a.new&&!b.new) {return -1}
        else if (!a.new&&b.new)  {return 1}
        else if (a.lastMessageRecieved>b.lastMessageRecieved) {return -1}
        else return 1;
    }
  redirectToUserMessage(id){
      let redirectTo=id;
      this.setState({redirectTo});
  }
    render() {
        if (this.state.redirectTo) {return <Redirect to={"/messages/"+this.state.redirectTo}/>}
        const { activeUser, handleLogout, allUsers,allMessages } = this.props;
        const {filter}=this.state;
        let listUsers = [];
        let pic;
        let newMessages="";
        let allUsersSorted=[];
        
        if (!activeUser) {
            return <Redirect to="/" />
        }

        allUsers.forEach(user=>{
            let userMessages=usersMessages(activeUser,allMessages,user)
            allUsersSorted.push({user:user,new:userMessages.new,lastMessageRecieved:userMessages.last})
        })
        allUsersSorted.sort(this.compareFunction)
        allUsersSorted.forEach(user => {
            let lastMessageRecieved="";
            if (activeUser && activeUser.id!==user.user.id && ( user.user.username.toLowerCase().includes(filter.toLowerCase())||user.user.lname.toLowerCase().includes(filter.toLowerCase())||user.user.fname.toLowerCase().includes(filter.toLowerCase()))){
                if (user.user.pic)  {pic=user.user.pic["_url"]} else {pic="https://scontent.ftlv6-1.fna.fbcdn.net/v/t31.0-1/c379.0.1290.1290a/10506738_10150004552801856_220367501106153455_o.jpg?_nc_cat=1&cachebreaker=sd&_nc_oc=AQmDPuqAMC36xNBFYpWyGbruJPR0Bwnz_z8drIOP6ckngglLREPuhsA77Q9ZymgFONs&_nc_ht=scontent.ftlv6-1.fna&oh=de23631b35970c121e8f864db29fb977&oe=5E4D3749"}
                if (user.new) {newMessages=  <Badge pill variant="success">{user.new} </Badge>} else {newMessages=""}
                if (user.lastMessageRecieved) lastMessageRecieved=(`${parseDateTime(user.lastMessageRecieved)}`)
                listUsers.push(<ListGroup.Item key={user.user.id}
                                        // style={{width:"450px"}}
                                        >
                                <div className="pointer" style={{border:"1px solid"}} onClick={()=>{ this.redirectToUserMessage(user.user.id)}}>
                                    <Image style={{height:"50px"}} src={pic}>
                                    </Image>
                                    {`  ${user.user.username}: ${user.user.fname} ${user.user.lname} `}{newMessages}{" "+lastMessageRecieved}
                                </div>
                                </ListGroup.Item>)
            }
        });
        return (
            <Container >
                <DiamondNavbar cart={this.props.cart}  allMessages={allMessages}  activeUser={activeUser} handleLogout={handleLogout} />
                <h3>Messages:</h3>
                <InputGroup  
                // style={{width:"450px"}} 
                onChange={this.filterUsers} className="mb-0">
                    <FormControl
                   
                        placeholder="Search user"
                        aria-label="User"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <ListGroup>
                    {listUsers}
                </ListGroup>
            </Container>
        );
    }
}

