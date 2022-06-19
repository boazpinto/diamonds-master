import React from 'react'

import { Container, Carousel } from 'react-bootstrap'

//pagebody of home page
export default class HomePageBody extends React.Component {

  render() {
    return (
      <Carousel>
               <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://file4.batdongsan.com.vn/2019/07/11/akCJKkFO/20190711181053-40bf.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>New York</h3>
            <p>Directly from 47th street</p>
          </Carousel.Caption>
        </Carousel.Item>
               <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://en.israelidiamond.co.il/wp-content/uploads/2016/09/Israel-Diamond-Industry.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Israel</h3>
            <p>Ramat Gan Diamond Exchange complex</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://www.morphogenesis.org/wp-content/uploads/2018/11/Surat-Diamond-Bourse-1.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>India</h3>
            <p>Mumbai new Diamond Exchange</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://metro.co.uk/wp-content/uploads/2018/02/hong-kong-skyline-getty.jpg?quality=90&strip=all"
            alt="Fourth slide"
          />
          <Carousel.Caption>
            <h3>Hong Kong</h3>
            <p>The gate to china</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.abc.net.au/news/image/11038164-3x2-700x467.jpg"
            alt="Fifth slide"
          />
          <Carousel.Caption>
            <h3>List your diamonds</h3>
            <p>Live selling platform with proven results</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://image.shutterstock.com/image-photo/brilliant-cut-diamond-held-by-260nw-1068771257.jpg"
            alt="Sixth slide"
          />

          <Carousel.Caption>
            <h3>Connect with your other dealers</h3>
            <p>Messaging Platform</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://image.iol.co.za/image/1/process/620x349?source=http://ana-baobab-prod-eu-west-2.s3.amazonaws.com/public/ana/media/media/2017/04/21/1492781484816.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>All shapes, all color , all clarity</h3>
            <p>with or without certificates. pictures and full specs</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      // <div className="marginTop">
      //   <div className="row  cardHolder">
      //     {/* <div className="col-lg-4">
      //       <div className="content bg-diam">
      //         <a href="#">
      //           <MyCard key={1} num={1} total={3} img="https://image.shutterstock.com/image-photo/brilliant-cut-diamond-held-by-260nw-1068771257.jpg" label="Search Diamonds" text="Search by any parameter, Contact the seller, Shake hands, Mazal ubracha" />
      //         </a>
      //       </div>
      //     </div>
      //     <div className="col-lg-4">
      //       <div className="content  bg-diam">
      //         <a href="#">
      //           <MyCard key={1} num={2} total={3} img="https://image.shutterstock.com/image-photo/message-bottle-floating-ocean-260nw-667435318.jpg" label="Messages" text="Check and send messages to members, send ofers, Stay in touch." />
      //         </a>
      //       </div>
      //     </div>
      //     <div className="col-lg-4">
      //       <div className="content bg-diam">
      //         <a href="#">
      //           <MyCard key={1} num={3} total={3} img="https://image.shutterstock.com/image-photo/auction-bid-sale-judgment-mallet-260nw-1033130779.jpg" label="Auction" text="Join the fun and bid on any diamond in the auction list. Get lucky." />
      //         </a>
      //       </div>
      //     </div> */}
      //   </div>
      // </div>
    );
  }
}