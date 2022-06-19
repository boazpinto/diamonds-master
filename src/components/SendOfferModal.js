import React from 'react'
import { Modal, Button,InputGroup,FormControl,Alert } from 'react-bootstrap'

export default class SendOfferModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            modal: this.props.show,
            diamond: this.props.diamond,
        }
    }
    handleClose = () => {
        this.setState({
            modal: false,
            show: false
        });
        this.props.close();

    }
    contactSeller = () => {
        const { addMessage, activeUser,ownerName } = this.props;
        const { diamond } = this.state;
        let { show } = this.state;
        addMessage(this.textInput.value, activeUser.id, diamond.owner.id);
        show = true;
        this.setState({ show })
        // this.handleClose();
    }
    componentWillReceiveProps(nextProps) {
        let newState = {
            modal: nextProps.show,
            diamond: nextProps.diamond,
        }
        this.setState(newState)
    }
    render() {
        const { addMessage, activeUser,ownerName } = this.props;
        const { modal, diamond } = this.state;
        let showLotId;
        let showOwnerId;
        let showPrice;
        if (diamond) {showPrice=diamond.pricePerCarat; showOwnerId=diamond.owner.id; showLotId=diamond.lotID} else return false;
        return (
            <Modal show={modal}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Send Offer to {this.props.ownerName(showOwnerId)}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{height:"300px"}}>
                    <h4>Regarding Diamond {showLotId}</h4>
                    <h4>Asking Price: {showPrice}</h4>
                    <InputGroup className="mb-0">
                        <FormControl
                             ref={(element)=>{this.textInput=element}}
                            as="textarea" rows="10" 
                            defaultValue = {`Hi ${ownerName(showOwnerId)}, I am Offering you on your diamond: ${showOwnerId} ${diamond.shape} ${diamond.color} ${diamond.clarity}, XXXXX Dollars per carat. what do you say?`}
                            aria-label="User"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <Alert style={{ width: "100%" }} variant="primary" show={this.state.show}>
                        Offer Sent to {ownerName(showOwnerId)}
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.contactSeller() }}>Send</Button>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
