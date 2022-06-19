import React from 'react'
import HorizontalColorSlider from './Slider'
import { Form, Row, Col, FormControl } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import {colorValue,clarityValue} from '../Classes/Diamond'
// import Multiselect from 'react-bootstrap-multiselect'
// import '../multiselect.css'


//returns color value
function num2color(value) {
  switch (value) {
    case 0:
      return "D";
      break;
    case 1:
      return "E";
      break;
    case 2:
      return "F";
      break;
    case 3:
      return "G";
      break;
    case 4:
      return "H";
      break;
    case 5:
      return "I";
      break;
    case 6:
      return "J";
      break;
    case 7:
      return "K";
      break;
    case 8:
      return "L";
      break;
    case 9:
      return "M";
      break;
    case 10:
      return "N";
      break;
    case 11:
      return "OP";
      break;
    case 12:
      return "QR";
      break;
    case 13:
      return "ST";
      break;
    case 14:
      return "UV";
      break;
    case 15:
      return "WX";
      break;
    case 16:
      return "YZ";
      break;
    default:
      return false;
  }
}
//returns clarity value
function num2clarity(value) {
  switch (value) {
    case 0:
      return "FL";
      break;
    case 1:
      return "IF";
      break;
    case 2:
      return "VVS1";
      break;
    case 3:
      return "VVS2";
      break;
    case 4:
      return "VS1";
      break;
    case 5:
      return "VS2";
      break;
    case 6:
      return "SI1";
      break;
    case 7:
      return "SI2";
      break;
    case 8:
      return "SI3";
      break;
    case 9:
      return "I1";
      break;
    case 10:
      return "I2";
      break;
    case 11:
      return "I3";
      break;
    default:
      return false;
  }
}

//filter
export default class SearchDiamondForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tglAll: "Select all shapes",
      filter:{
        weightMin:"",
        weightMax:"",
      }
    }
  }

//click on a shape filter wiil toggle selection from/to filter
  toggleChoice = (e) => {
    let { filter, setFilter } = this.props;
    if (!filter.shape.includes(e.target.innerHTML)) { filter.shape.push(e.target.innerHTML) }
    else {
      for (var i = 0; i < filter.shape.length; i++) {
        if (filter.shape[i] === e.target.innerHTML) {
          filter.shape.splice(i, 1);
        }
      }
    }
    setFilter(filter);
  }

//toggle all shape to/from filter
  toggleAll = (e) => {
    let allShapes = ["BR", "OV", "PS", "MQ", "HS", "PRI", "RAD", "EM","AS", "CU", "BG", "TRI"]
    let { filter, setFilter } = this.props;
    let { tglAll } = this.state;
    if (tglAll === "Select all shapes") { filter.shape = allShapes; tglAll = "Clear all shapes" }
    else {
      filter.shape = []; tglAll = "Select all shapes"
    }
    this.setState({ tglAll });
    setFilter(filter);
  }

  //changing weight minimum filter value
  setMinWeight = (e) => {

    let { setFilter } = this.props;
    let filter1=this.props.filter;
    let filter=this.state.filter;
    filter1.weightMin = e.target.value;
    filter.weightMin=e.target.value;
    if (filter1.weightMin==="") filter1.weightMin=0;
    this.setState({filter});
    setFilter(filter1);
  }

  //changing weight maximum filter value
  setMaxWeight = (e) => {

    let { setFilter } = this.props;
    let filter1=this.props.filter;
    let filter=this.state.filter;
    filter1.weightMax = e.target.value;
    filter.weightMax=e.target.value;
    if (filter1.weightMax==="") filter1.weightMax=10000;
    this.setState({filter});
    setFilter(filter1);
  }

  //set color minimum and maximum on change in color slider
  setColorFilter = (value) => {
    let { filter, setFilter } = this.props;
    filter.colorMin = num2color(value[0]);
    filter.colorMax = num2color(value[1]);
    setFilter(filter);
  }

   //set clarity minimum and maximum on change in clarity slider
  setClarityFilter = (value) => {
    let { filter, setFilter } = this.props;
    filter.clarityMin = num2clarity(value[0]);
    filter.clarityMax = num2clarity(value[1]);
    setFilter(filter);
  }

  //clear all filters
  clearTheFilter= ()=>{
    const {clearFilter } = this.props;
    let {filter } = this.state;
    filter.weightMax="";
    filter.weightMin="";
    clearFilter();
    this.setState({filter});

  }
  render() {

    let br, ov, ps, mq, hs, pri, rad, em, cu, bg, tri, asher;
    //sets the color of each shape according to its filter value
    if (this.props.filter.shape.includes("BR")) { br = "success" } else { br = "light" };
    if (this.props.filter.shape.includes("OV")) { ov = "success" } else { ov = "light" };
    if (this.props.filter.shape.includes("MQ")) { mq = "success" } else { mq = "light" };
    if (this.props.filter.shape.includes("HS")) { hs = "success" } else { hs = "light" };
    if (this.props.filter.shape.includes("PS")) { ps = "success" } else { ps = "light" };
    if (this.props.filter.shape.includes("PRI")) { pri = "success" } else { pri = "light" };
    if (this.props.filter.shape.includes("RAD")) { rad = "success" } else { rad = "light" };
    if (this.props.filter.shape.includes("EM")) { em = "success" } else { em = "light" };
    if (this.props.filter.shape.includes("CU")) { cu = "success" } else { cu = "light" };
    if (this.props.filter.shape.includes("TRI")) { tri = "success" } else { tri = "light" };
    if (this.props.filter.shape.includes("BG")) { bg = "success" } else { bg = "light" };
    if (this.props.filter.shape.includes("AS")) { asher = "success" } else { asher = "light" };
   
    var width60 = { width: "60px" };
    return (
      <Form>
        <Button style={{backgroundColor:"pink",border:"none",borderRadius:"5px",marginTop:"5px",height:"40px"}} onClick={this.clearTheFilter} className="fullWin">
                    Clear all filters
        </Button> 
        <h3 style={{marginTop:"10px"}}> Filter</h3>
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            {/* clear all shapes or choose all shapes */}
            <button style={{marginBottom:"5px"}} onClick={this.toggleAll} type="button" className={`btn btn-primary`}>{this.state.tglAll}</button>
          </Col>
          {/* all shapes buttons */}
          <Col lg="1" md="2" sm="3" xs="4">
            <button onClick={this.toggleChoice} type="button" className={`btn btn-${br}`}>BR</button>
          </Col>
          <Col lg="1" md="2" sm="3" xs="4">
            <button onClick={this.toggleChoice} type="button" className={`btn btn-${ov}`}>OV</button>
          </Col>
          <Col lg="1" md="2" sm="3" xs="4">
            <button onClick={this.toggleChoice} type="button" className={`btn btn-${ps}`}>PS</button>
          </Col>
          <Col lg="1" md="2" sm="3" xs="4">
            <button onClick={this.toggleChoice} type="button" className={`btn btn-${mq}`}>MQ</button>
          </Col>
          <Col lg="1" md="2" sm="3" xs="4">
            <button onClick={this.toggleChoice} type="button" className={`btn btn-${hs}`}>HS</button>
          </Col>
          <Col lg="1" md="2" sm="3" xs="4">
            <button onClick={this.toggleChoice} type="button" className={`btn btn-${pri}`}>PRI</button>
          </Col>
          <Col lg="1" md="2" sm="3" xs="4">
            <button onClick={this.toggleChoice} type="button" className={`btn btn-${em}`}>EM</button>
          </Col>
          <Col lg="1" md="2" sm="3" xs="4">
            <button onClick={this.toggleChoice} type="button" className={`btn btn-${asher}`}>AS</button>
          </Col>
          <Col lg="1" md="2" sm="3" xs="4">
            <button onClick={this.toggleChoice} type="button" className={`btn btn-${rad}`}>RAD</button>
          </Col>
          <Col lg="1" md="2" sm="3" xs="4">
            <button onClick={this.toggleChoice} type="button" className={`btn btn-${cu}`}>CU</button>
          </Col>
          <Col lg="1" md="2" sm="3" xs="4">
            <button onClick={this.toggleChoice} type="button" className={`btn btn-${bg}`}>BG</button>
          </Col>
          <Col lg="1" md="2" sm="3" xs="4">
            <button onClick={this.toggleChoice} type="button" className={`btn btn-${tri}`}>TRI</button>
          </Col>
        </Row>
        <Row>
{/* //weight input minimum and maximum */}
          <Form.Group as={Col} xl="3" lg="3" sm="12" controlId="validationCustom05">
            <Form.Label>Weight From</Form.Label>
            <Form.Control onChange={this.setMinWeight} type="number" placeholder="From" value={this.state.filter.weightMin}/>
            <Form.Control.Feedback type="invalid">
            </Form.Control.Feedback>
            <Form.Label>Weight To</Form.Label>
            <Form.Control onChange={this.setMaxWeight} type="number" placeholder="To" value={this.state.filter.weightMax} />
            <Form.Control.Feedback type="invalid">
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} xl="9" lg="9" sm="12" controlId="validationCustom05">
            {/* sliders , one for color and one for clarity */}
            <HorizontalColorSlider setFilter={this.props.setFilter} filter={this.props.filter} name="Color" change={(value) => { this.setColorFilter(value) }} />
            <HorizontalColorSlider setFilter={this.props.setFilter} filter={this.props.filter} name="Clarity" change={(value) => { this.setClarityFilter(value)}} />
          </Form.Group>
        </Row>
      </Form>
    );
  }
}
