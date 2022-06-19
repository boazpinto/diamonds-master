import React from 'react';
import { Container, Jumbotron, Table, Form, Button } from 'react-bootstrap'
import readXlsxFile from 'read-excel-file'
import DiamondNavbar from '../components/DiamondNavbar';
import Parse from 'parse';
import excelIcon from '../data/38-383271_excel-logo-png-microsoft-excel-logo-transparent-png.png'
import excelTemplet from '../data/Save_Excel_Icon.jpg'
import zipcelx from 'zipcelx';

//upload diamonds from excel sheet
export default class LoadExcel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            excelRows: [], //keep the excel data rows
            headers: [], //keep the excel headers row
            header: {}, //keep an object with parse diamond keys and an index that represent the column number in the excel
            log1: []    // keeps the remarks log to show at the end of the upload
        }

    }
    // internal function to save a diamond in parse. input : object with one diamond data
    saveDiamond = (diamond) => {

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
        if (!diamond.list&&diamond.list!=0) diamond.list=0;
        myNewObject.set('list', Number(diamond.list));
        if (!diamond.list&&diamond.discount!="0") diamond.discount=null;
        myNewObject.set('discount', Number(diamond.discount));
        myNewObject.set('pricePerCarat', Number(diamond.pricePerCarat));
        myNewObject.set('links', diamond.links);
        // myNewObject.set('inclusions',diamond.inclusions);
        myNewObject.set('keepDiscount', false);
        myNewObject.set('diamMin', Number(diamond.diamMin));
        myNewObject.set('diamMax', Number(diamond.diamMax));
        myNewObject.set('deptAvg', Number(diamond.deptAvg));
        myNewObject.set('owner', Parse.User.current());
        myNewObject.save().then(
            (result) => {
                console.log('Diamond created', result);
            },
            (error) => {
                console.error('Error while creating Diamond: ', error);
            }
        );


    }

    // function to load excel data using libraary 'read-excel-file', and set the state with the headers line and the data lines
    // if any excel header column match a parse diamond object key, header state i also updated with the column number (example: header={shape: 2,color:4})
    loadExcelFile = (e) => {
        let { excelRows, headers, header, log1 } = this.state;
        excelRows = [];
        headers = [];
        header = {};
        log1 = [];

        const input = e.target;
        readXlsxFile(input.files[0]).then((rows) => {
            // `rows` is an array of rows
            // each row being an array of cells.

            headers = rows[0];
            excelRows = rows.splice(1, rows.length - 1);
            for (var i = 0; i < headers.length; i++) {
                if (["shape", "weight", "color", "clarity", "lotID", "cut", "polish", "symmetry",
                    "fluorescence", "fluorescenceColor", "lab", "certificateNumber", "depth", "table",
                    "crownAngle", "crownHeight", "pavillionAngle", "pavillionDepth", "starLength", "lowerHalf",
                    "girdle", "culet", "discount", "pricePerCarat", "diamMin", "diamMax", "deptAvg"
                ].includes(headers[i])) { header[headers[i]] = i }
            }
            this.setState({ excelRows, headers, header, log1 })
        })
    }

    //when a key is picked from a list, add to header (example: header={shape: 2,color:4})
    getValues = (e) => {

        let { header } = this.state;
        header[e.target.value] = parseInt(e.target.id);
        this.setState({ header });
    }

    // for each row in the data, builds an object of diamond using the map built in state.header  (example: header={shape: 2,color:4,clarity:1,lotId:5}==> diamond={shape:value in column 2, color:value in column 4.......})
    // attempts to upload diamonds to parse
    // 6 keys are must : lotID,weight,shape,color,clarity and pricePerCarat
    // for now the data is not verified
    upload = () => {
        const { activeUser } = this.props;
        let { header, excelRows, log1 } = this.state;
        const headerKeys = Object.keys(header);
        let index = -1;
        excelRows.forEach(row => {
            //builds the diamond object with the data from excell data line
            let diamond = {};
            index++;
            for (var i = 0; i < headerKeys.length; i++) {
                if (["weight", "dept", "table", "crownAngle", "crownHeight", "pavillionAngle", "pavillionDept", "starLength", "lowerHalf", "discount", "pricePerCarat", "deptAvg", "diamMin", "diamMax"].includes(headerKeys[i])) {
                    diamond[headerKeys[i]] = Number(row[header[headerKeys[i]]])
                }
                // else if (["lotID", "fluorescence", "fluorescenceColor", "culet"].includes(headerKeys[i])) {
                //     diamond[headerKeys[i]] = row[header[headerKeys[i]]].toString()
                // }
                else if (row[header[headerKeys[i]]]) {
                    diamond[headerKeys[i]] = row[header[headerKeys[i]]].toString();
                }
            }
            diamond.owner = Parse.User.current();
            if (diamond.keepDiscount || diamond.keepDiscount === "0" || diamond.discount) { diamond.keepDiscount = true } else { diamond.keepDiscount = false };

            //checks if there ar the necesary 6 fields
            if (diamond.lotID && diamond.weight && diamond.shape && diamond.color && diamond.clarity && diamond.pricePerCarat) {
                log1.push(<p key={index} style={{ color: "green" }}>{row} is valid for upload...</p>)
                this.saveDiamond(diamond);
            }
            else {
                log1.push(<p key={index} style={{ color: "red" }}>{row} is not valid for upload...</p>)
            }

        })
        //completed the upload
        log1.push(<p key={index + 0.5} style={{ color: "purple" }}>upload process completed</p>)
        this.setState({ log1 });
    }
    downloadTemplet=()=>{
        const config = {
            filename: 'diamond import templat',
            sheet: {
              data: [
                [{  
                  value:'certificateNumber',
                  type: 'string'
                }, {
                    value:'clarity',
                  type: 'string'
                }, {
                    value:'color',
                  type: 'string'
                }, {
                    value:'crownAngle',
                  type: 'string'
                }, {
                    value:'crownHeight',
                  type: 'string'
                }, {
                    value:'culet',
                  type: 'string'
                }, {
                    value:'cut',
                  type: 'string'
                }, {
                    value:'depth',
                  type: 'string'
                }, {
                    value:'diamMax',
                  type: 'string'
                }, {
                    value:'diamMin',
                  type: 'string'
                }, {
                    value:'deptAvg',
                  type: 'string'
                }, {
                    value:'discount',
                  type: 'string'
                }, {
                    value:'fluorescence',
                  type: 'string'
                }, {
                    value:'fluorescenceColor',
                  type: 'string'
                }, {
                    value:'girdle',
                  type: 'string'
                }, {
                    value:'lab',
                  type: 'string'
                }, {
                    value:'lotID',
                  type: 'string'
                }, {
                    value:'lowerHalf',
                  type: 'string'
                }, {
                    value:'pavillionAngle',
                  type: 'string'
                }, {
                    value:'pavillionDepth',
                  type: 'string'
                }, {
                    value:'polish',
                  type: 'string'
                }, {
                    value:'pricePerCarat',
                  type: 'string'
                }, {
                    value:'shape',
                  type: 'string'
                }, {
                    value:'starLength',
                  type: 'string'
                }, {
                    value:'symmetry',
                  type: 'string'
                }, {
                    value:'table',
                  type: 'string'
                }, {
                    value:'weight',
                  type: 'string'
                }],[
                {  
                    value:'',
                    type: 'string'
                  }, {
                      value:'Required',
                    type: 'string'
                  }, {
                      value:'Required',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'Required',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'Required',
                    type: 'string'
                  }, {
                      value:'Required',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'',
                    type: 'string'
                  }, {
                      value:'Required',
                    type: 'string'
                  }
            ]
              ]
            }
          };
          
          zipcelx(config);
    }
    render() {

        const { activeUser, handleLogout, allMessages } = this.props;
        const { excelRows, headers, log1 } = this.state;
        if (log1.length) return (
            <Container>
                <DiamondNavbar cart={this.props.cart} allMessages={allMessages} activeUser={activeUser} handleLogout={handleLogout} />
                <Jumbotron fluid>
                    <div>
                        {log1}
                    </div>
                </Jumbotron>
            </Container>
        )
        let tableLines = [];
        let index = -1;
        headers.forEach(element => {
            index++;
            tableLines.push(<tr key={index}>
                <td>{index}</td>
                <td>{element}</td>
                <td id={element}>
                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control id={"0000" + index} onChange={this.getValues} defaultValue={element} as="select">
                            <option></option>
                            <option>certificateNumber</option>
                            <option>clarity</option>
                            <option>color</option>
                            <option>crownAngle</option>
                            <option>crownHeight</option>
                            <option>culet</option>
                            <option>cut</option>
                            <option>depth</option>
                            <option>diamMax</option>
                            <option>diamMin</option>
                            <option>deptAvg</option>
                            <option>discount</option>
                            <option>fluorescence</option>
                            <option>fluorescenceColor</option>
                            <option>girdle</option>
                            <option>lab</option>
                            <option>lotID</option>
                            <option>lowerHalf</option>
                            <option>pavillionAngle</option>
                            <option>pavillionDepth</option>
                            <option>polish</option>
                            <option>pricePerCarat</option>
                            <option>shape</option>
                            <option>starLength</option>
                            <option>symmetry</option>
                            <option>table</option>
                            <option>weight</option>

                        </Form.Control>
                    </Form.Group></td>
            </tr>)

        });
        return (
            <Container>
                <DiamondNavbar cart={this.props.cart} allMessages={allMessages} activeUser={activeUser} handleLogout={handleLogout} />
                <Jumbotron fluid>
                    <div style={{position:"relative",display:"inline-block",width:"100%"}}>
                        <div  onChange={this.loadExcelFile}>
                    <input className="excelImage"  style={{opacity:"0",position:"absolute",top:"-65px",left:"0", width:"30%",height:"80px"}} type="file" id="input" />
                    <img  style={{pointerEvents:"none",position:"absolute",top:"-30px",left:"0", width:"18%",height:"50px"}} src={excelIcon}></img>
                    </div>
                    <p style={{marginTop:"20px"}}>Upload Excel</p>
                    <div  onClick={this.downloadTemplet} className="excelImage"  style={{position:"absolute",top:"-30px",right:"0",height:"50px"}}>
                    <img style={{height:"50px",marginLeft:"90px"}} src={excelTemplet}></img>
                    <p>Download Template</p>
                    </div>
                    </div>
                    <Table  >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Excel Header</th>
                                <th>Map to</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableLines}
                        </tbody>
                    </Table>
                    <Button onClick={this.upload}>Upload</Button>
                </Jumbotron>

            </Container>
        );
    }
}

