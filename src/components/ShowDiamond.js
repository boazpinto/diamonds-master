import React from 'react'
import { Row, Col, Accordion, Card } from 'react-bootstrap'



//This Stupid component receives two props : edit & description. edit is the index of the diamond and description is all the data of the diamond
//it uses acordeon to show the details of single diamond
export default class ShowDiamond extends React.Component {

  render() {

    var bgColorClass = "";
    if (this.props.edit % 2 === 0) { bgColorClass = "light-blue" };
    var pics = [];
    for (var i = 0; i < this.props.description.links.length; i++) {
      pics.push(<div style={{ margin: "5px" }} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
        <div className="content diamondContent">
          <a href="#"><img className="smallPic" src={this.props.description.links[i]} /></a>
        </div>
      </div>);
    }
    if (this.props.description.pic1 !== {}) {
      pics.push(<div style={{ margin: "5px" }} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
        <div className="content diamondContent">
          <a href="#"><img className="smallPic" src={this.props.description.pic1.url} /></a>
        </div>
      </div>);
    }
    if (this.props.description.pic2 !== {}) {
      pics.push(<div style={{ margin: "5px" }} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
        <div className="content diamondContent">
          <a href="#"><img className="smallPic" src={this.props.description.pic2.url} /></a>
        </div>
      </div>);
    }
    return (
      <div>
        {/* below are the details visible in accordeon */}
        <Accordion key={this.props.description.id} defaultActiveKey="0" style={{ backgroundColor: bgColorClass }}>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey={this.props.edit}>
              <Row>
                <Col lg="3" md="12" sm="12" style={{ height: "60px" }}>
                  <Row>

                    <Col className="innerCol" xl="3">
                      <div className="content diamondContent">
                        <h5 className="noMarginBottom">Shape</h5>
                        <p>{this.props.description.shape}</p>
                      </div>
                    </Col>
                    <Col className="innerCol" xl="3">
                      <div className="content diamondContent">
                        <h5 className="noMarginBottom">Carat</h5>
                        <p>{this.props.description.weight}</p>
                      </div>
                    </Col>

                    <Col className="innerCol" xl="3">
                      <div className="content diamondContent">
                        <h5 className="noMarginBottom">Col</h5>
                        <p>{this.props.description.color}</p>
                      </div>
                    </Col>
                    <Col className="innerCol" xl="3">
                      <div className="content diamondContent">
                        <h5 className="noMarginBottom">Clar</h5>
                        <p>{this.props.description.clarity}</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col lg="3" md="12" sm="12" style={{ height: "60px" }}>
                  <Row>
                    <Col className="innerCol" xl="3">
                      <div className="content diamondContent">
                        <h5 className="noMarginBottom">Cut</h5>
                        <p>{this.props.description.cut}</p>
                      </div>
                    </Col>
                    <Col className="innerCol" xl="3">
                      <div className="content diamondContent">
                        <h5 className="noMarginBottom">Pol</h5>
                        <p>{this.props.description.polish}</p>
                      </div>
                    </Col>
                    <Col className="innerCol" xl="3">
                      <div className="content diamondContent">
                        <h5 className="noMarginBottom">Sym</h5>
                        <p>{this.props.description.symmetry}</p>
                      </div>
                    </Col>
                    <Col className="innerCol" xl="3">
                      <div className="content diamondContent">
                        <h5 className="noMarginBottom">FL</h5>
                        <p>{this.props.description.fluorescence + " " + this.props.description.fluorescenceColor}</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col lg="3" md="12" sm="12" style={{ height: "60px" }}>
                  <Row>
                    <Col className="innerCol" xl="3">
                      <div className="content diamondContent">
                        <h5 className="noMarginBottom">Depth</h5>
                        <p>{this.props.description.depth}</p>
                      </div>
                    </Col>
                    <Col className="innerCol" xl="3">
                      <div className="content diamondContent">
                        <h5 className="noMarginBottom">Table</h5>
                        <p>{this.props.description.table}</p>
                      </div>
                    </Col>
                    <Col className="innerCol" xl="3">
                      <div className="content diamondContent">
                        <h5 className="noMarginBottom">Lab</h5>
                        <a target="_blank" href={"http://www.gia.edu/report-check?reportno=" + this.props.description.certificateNumber}><p>{this.props.description.lab}</p></a>
                      </div>
                    </Col>
                    <Col className="innerCol" xl="3">
                      <div className="content diamondContent">
                        <h5 className="noMarginBottom">Gird</h5>
                        <p>{this.props.description.girdle}</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col lg="3" md="12" sm="12" style={{ height: "60px" }}>
                  <Row>
                    <Col className="innerCol" xl="3">
                      <div className="content diamondContent">
                        <h5 className="noMarginBottom">Culet</h5>
                        <p>{this.props.description.culet}</p>
                      </div>
                    </Col>
                    <Col className="innerCol" xl="3">
                      <div className="content diamondContent">
                        <h5 className="noMarginBottom">Rap</h5>
                        <p style={{fontSize:"11px"}}>{this.props.description.list}</p>
                      </div>
                    </Col>
                    <Col className="innerCol" xl="3">
                      <div className="content diamondContent">
                        <h5 className="noMarginBottom">Disc%</h5>
                        <p>{(Math.floor(this.props.description.discount * 10) / 10).toFixed() + "%"}</p>
                      </div>
                    </Col>
                    <Col className="innerCol" xl="3">
                      <div className="content diamondContent">
                        <h5 className="noMarginBottom">Price$</h5>
                        <p style={{fontSize:"11px"}}>{this.props.description.pricePerCarat.toFixed()}</p>
                      </div>
                    </Col>
                  </Row>
                </Col>

              </Row>
              {/* below are the details hiden in Accordion */}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={this.props.edit}>
              <Card.Body>
                <Row>
                  <Col lg="3" md="12" sm="12" style={{ height: "60px" }}>

                    <Row>
                      <Col className="innerCol" xl="3">
                        <div className="content diamondContent">
                          <h5 className="noMarginBottom">Lot</h5>
                          <p style={{fontSize:"11px"}}>{this.props.description.lotID}</p>
                        </div>
                      </Col>




                      <Col className="innerCol" xl="3">
                        <div className="content diamondContent">
                          <h5 className="noMarginBottom">Owner</h5>
                          <p style={{fontSize:"11px"}}>{this.props.ownerName(this.props.description.owner.id)}</p>
                        </div>
                      </Col>

                      <Col className="innerCol" xl="3">
                        <div className="content diamondContent">
                          <h5 className="noMarginBottom">Cert</h5>
                          <a target="_blank" href={"http://www.gia.edu/report-check?reportno=" + this.props.description.certificateNumber}><p style={{fontSize:"11px"}}>{this.props.description.certificateNumber}</p></a>

                        </div>
                      </Col>


                      <Col className="innerCol" xl="3">
                        <div className="content diamondContent">
                          <h5 className="noMarginBottom">C.Angle</h5>
                          <p>{this.props.description.crownAngle}</p>
                        </div>
                      </Col></Row></Col>
                  <Col lg="3" md="12" sm="12" style={{ height: "60px" }}>

                    <Row>
                      <Col className="innerCol" xl="3">
                        <div className="content diamondContent">
                          <h5 className="noMarginBottom">C.Heigh</h5>
                          <p>{this.props.description.crownHeight}</p>
                        </div>
                      </Col>


                      <Col className="innerCol" xl="3">
                        <div className="content diamondContent">
                          <h5 className="noMarginBottom">P.Angle</h5>
                          <p>{this.props.description.pavillionAngle}</p>
                        </div>
                      </Col>


                      <Col className="innerCol" xl="3">
                        <div className="content diamondContent">
                          <h5 className="noMarginBottom">P.Depth</h5>
                          <p>{this.props.description.pavillionDepth}</p>
                        </div>
                      </Col>
                      <Col className="innerCol" xl="3">
                        <div className="content diamondContent">
                          <h5 className="noMarginBottom">StarLen</h5>
                          <p>{this.props.description.starLength}</p>
                        </div>
                      </Col></Row></Col>

                  <Col lg="3" md="12" sm="12" style={{ height: "60px" }}>
                    <Row>

                      <Col className="innerCol" xl="3">
                        <div className="content diamondContent">
                          <h5 className="noMarginBottom">LoHalf</h5>
                          <p>{this.props.description.lowerHalf}</p>
                        </div>
                      </Col>
                      <Col className="innerCol" xl="3">
                        <div className="content diamondContent">
                          <h5 className="noMarginBottom">Meas</h5>
                          <p>{this.props.description.measurements()}</p>
                        </div>
                      </Col>
                      <Col className="innerCol" xl="3">
                        <div className="content diamondContent">
                          <h5 className="noMarginBottom">Incl</h5>
                          <p>{this.props.description.inclusions}</p>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  {pics}
                </Row>
                <Row>
                  {/* these childres are the action buttons and are declared in the father componenet DiamondList */}
                  {this.props.children}
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}
