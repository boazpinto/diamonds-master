import { listPrice } from '../App'
import priceList from '../data/prices.json';

//DIAMOND CLASS
export class Diamond1 {
  constructor(diamond) {
    this.id = diamond.id;
    this.lotID = diamond.get("lotID");
    this.shape = diamond.get("shape");
    this.weight = diamond.get("weight");
    this.color = diamond.get("color");
    this.clarity = diamond.get("clarity");
    this.cut = diamond.get("cut");
    if (!this.cut) this.cut="";
    this.polish = diamond.get("polish");
    if (!this.polish) this.polish="";
    this.symmetry = diamond.get("symmetry");
    if (!this.symmetry) this.symmetry="";
    this.fluorescence = diamond.get("fluorescence");
    if (!this.fluorescence) this.fluorescence="";
    this.fluorescenceColor = diamond.get("fluorescenceColor");
    if (!this.fluorescenceColor) this.fluorescenceColor="";
    this.lab = diamond.get("lab");
    if (!this.lab) this.lab="";
    this.certificateNumber = diamond.get("certificateNumber");
    if (!this.certificateNumber) this.certificateNumber="";
    this.depth = diamond.get("depth");
    if (!this.depth) this.depth="";
    this.table = diamond.get("table");
    if (!this.table) this.table="";
    this.crownAngle = diamond.get("crownAngle");
    if (!this.crownAngle) this.crownAngle="";
    this.crownHeight = diamond.get("crownHeight");
    if (!this.crownHeight) this.pocrownHeightlish="";
    this.pavillionAngle = diamond.get("pavillionAnglecut");
    if (!this.pavillionAnglecut) this.pavillionAnglecut="";
    this.pavillionDepth = diamond.get("pavillionDepth");
    if (!this.pavillionDepth) this.pavillionDepth="";
    this.starLength = diamond.get("starLength");
    if (!this.starLength) this.starLength="";
    this.lowerHalf = diamond.get("lowerHalf");
    if (!this.lowerHalf) this.lowerHalf="";
    this.girdle = diamond.get("girdle");
    if (!this.girdle) this.girdle="";
    this.culet = diamond.get("culet");
    if (!this.culet) this.culet="";
    this.list = listPrice(this.shape, this.color, this.clarity, this.weight, priceList.response.body.price);
    this.discount = diamond.get("discount");
    if (!this.discount) this.discount="";
    this.pricePerCarat = diamond.get("pricePerCarat");
    if (!this.pricePerCarat) this.pricePerCarat="";
    this.links = diamond.get("links");
    if (!this.links) this.links=[];
    this.inclusions = diamond.get("inclusions");
    if (!this.inclusions) this.inclusions="";
    this.owner = diamond.get("owner");
    if (!this.owner) this.owner="";
    this.keepDiscount = diamond.get("keepDiscount");
    if (!this.keepDiscount) this.keepDiscount="";
    this.diamMin = diamond.get("diamMin");
    if (!this.diamMin) this.diamMin="";
    this.diamMax = diamond.get("diamMax");
    if (!this.diamMax) this.diamMax="";
    this.deptAvg = diamond.get("deptAvg");
    if (!this.deptAvg) this.deptAvg="";
    let pic1 = diamond.get("pic1");
    if (pic1) { this.pic1 = { file:pic1,name: pic1["_name"], url: pic1["_url"] } } else this.pic1 = {};
     let pic2 = diamond.get("pic2");
    if (!pic2) { this.pic2 = {} } else { this.pic2 = {file:pic2, name: pic2["_name"], url: pic2["_url"] } }
    if (this.list) {
      if (!this.keepDiscount)
        this.discount = 100 - 100 * (this.pricePerCarat / (this.list))
      else this.pricePerCarat = this.list * (100 - this.discount) / 100
    }

  }
  measurements() { return this.diamMin + "-" + this.diamMax + "*" + this.deptAvg }
  inFilter(filter) {

    if ((filter.shape.includes(this.shape)|| !filter.shape.length)
      && this.color >= filter.colorMin
      && this.color <= filter.colorMax
      && clarityValue(this.clarity) >= clarityValue(filter.clarityMin)
      && clarityValue(this.clarity) <= clarityValue(filter.clarityMax)
      && (this.weight >= filter.weightMin || filter.weightMin==="")
      && (this.weight <= filter.weightMax || filter.weightMax==="")) return true;

    return false;
  }
}

export function clarityValue(clarity) {
  switch (clarity) {
    case "FL":
      return 0
      break;
    case "IF":
      return 1
      break;
    case "VVS1":
      return 2
      break;
    case "VVS2":
      return 3
      break;
    case "VS1":
      return 4
      break;
    case "VS2":
      return 5
      break;
    case "SI1":
      return 6
      break;
    case "SI2":
      return 7
      break;
    case "SI3":
      return 8
      break;
    case "I1":
      return 9
      break;
    case "I2":
      return 10
      break;
    case "I3":
      return 11
      break;
    default:
      return false;
  }
}
export function colorValue(color) {
  switch (color) {
    case "D":
      return 0
      break;
    case "E":
      return 1
      break;
    case "F":
      return 2
      break;
    case "G":
      return 3
      break;
    case "H":
      return 4
      break;
    case "I":
      return 5
      break;
    case "J":
      return 6
      break;
    case "K":
      return 7
      break;
    case "L":
      return 8
      break;
    case "M":
      return 9
      break;
    case "N":
      return 10
      break;
    case "OP":
      return 11
      break;
    case "QR":
      return 12
      break;
      case "ST":
        return 13
        break;
        case "UV":
          return 14
          break;
          case "WX":
            return 15
            break;
            case "YZ":
              return 16
              break;
    default:
      return false;
  }
}