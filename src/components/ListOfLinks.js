import React from 'react';
import { Button, Image, Row, Col } from 'react-bootstrap';


class ListOfLinks extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let parse = [];
        for (var i = 0; i < this.props.links.length; i++) {
            parse.push(
                <Row style={{ margin: "10px", border: "1px solid green"}}>
                    <Col style={{display:"flex",alignItems:"center",justifyContent:"center"}} md="6" sm="6">
                        {this.props.links[i].substring(0, 30)+"......"}
                    </Col>
                    <Col style={{display:"flex",alignItems:"center",justifyContent:"center"}} md="3" sm="2">
                        <Image src={this.props.links[i]} style={{ width: "50px" }} />
                    </Col>
                    <Col style={{display:"flex",alignItems:"center",justifyContent:"center"}} md="3" sm="4">
                        <Button onClick={() => { this.props.deleteLink(i) }}>
                            Delete Me
                                </Button>
                    </Col>
                </Row>);



        }

        return (
            <div>
                {parse}
            </div>
        )
    }
}


export default ListOfLinks;