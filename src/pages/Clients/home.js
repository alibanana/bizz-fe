import React from 'react';
import '../../assets/css/Clients/client.css';
import '../../assets/css/Clients/home.css';
import {Helmet} from "react-helmet";


// Import Swiper React components

// Import Swiper styles
import 'swiper/css';

import NavigationBar from '../../components/Clients/Navbar';
import BlueButton from '../../components/Clients/BlueButton';
import WhiteButton from '../../components/Clients/WhiteButton';
import Footer from '../../components/Clients/Footer';


class HomePage extends React.Component {

  constructor(){
    super()
    this.state = {
    }

  }



  render(){
    return(
      <div className="body-container">
        <Helmet>
            <title>
                Bizz | Elevate Your Connections, Redefine Impressions.
            </title>
            <meta
                name="description"
                content="Bizz | Elevate Your Connections, Redefine Impressions"
            />
        </Helmet>
        <NavigationBar></NavigationBar>

        {/* START OF TOP DESKTOP SECTION */}
        <div >
            <div className="row m-0 no-gutters px-lg-5 py-5" id="top-height-container" style={{height:'85vh'}}>
                <div className="col-md-6 d-flex flex-row justify-content-center align-items-center">
                    <img src="/images/Card_Illustration.png" className='app-illustration' id="top-app-illustration" alt="Card Illustration" style={{height:'500px'}} />
                </div>
                <div className="col-md-6 pr-5 pl-5 d-flex flex-column justify-content-center align-items-start">
                    <p className="font-size-36 raleway-bold mb-3" style={{color:'#1A3B7D'}}>BIZZ.</p>
                    <p className="font-size-24 lato-semibold mt-2 mb-5" style={{color:'#252525'}}>Experience <span style={{color:'#F8AA8B'}}> seamless </span>  connections and leave <span style={{color:'#FC5543'}}> unforgettable </span> impressions with bizz, the smart business card, redefines networking with style!</p>
                    <BlueButton buttonText={"SHOP NOW"}></BlueButton>
                </div>
            </div>
        </div>

        {/* END OF TOP DESKTOP SECTION*/}


        {/* START OF MIDDLE SECTION */}
        <div className="row m-0 py-5 px-lg-5" style={{backgroundColor:'#29353C'}} id="our-product">

            <div className="col-md-6 col-xs-12 pl-5 pr-5 d-flex flex-column justify-content-center align-items-start" id="height-container" style={{height:'70vh'}}> 
                <p className="font-size-36 raleway-bold mb-3" style={{color:'#FFFFFF'}}> <span style={{color:'#F8AA8B'}}>SMART</span> BUSINESS CARD</p>
                <p className="font-size-24 lato-semibold mt-2 mb-5" style={{color:'#FFFFFF'}}>A new way to share your contact through a simple tap to a smartphone. Elevate your networking game and make lasting impressions with Bizz.</p>
                <BlueButton buttonText={"SHOP NOW"}></BlueButton>
            </div>
            <div className="col-md-6 col-xs-12 d-flex flex-row justify-content-center align-items-center" id="image-height-container"  style={{height:'70vh'}}>
                <img src="/images/White_Card_Illustration.png" className='app-illustration' id="white-card-illustration" alt="White_Card_Illustration" style={{height:'500px'}} />
            </div>

            <div className="col-md-6 col-xs-12 d-flex flex-row justify-content-center align-items-center" id="image-height-container"  style={{height:'70vh'}}>
                <img src="/images/User_UI.png" className='app-illustration' alt="User_UI" id="user-ui-illustration" style={{height:'500px'}} />
            </div>
            <div className="col-md-6 col-xs-12 pl-5 pr-5 d-flex flex-column justify-content-center align-items-start" id="height-container"  style={{height:'70vh'}}>
                <p className="font-size-36 raleway-bold mb-3" style={{color:'#FFFFFF'}}><span style={{color:'#FC5543'}}>BOLD</span> VISUAL STATEMENT</p>
                <p className="font-size-24 lato-semibold mt-2 mb-5" style={{color:'#FFFFFF'}}>Choose from a vibrant palette of three distinct colors, allowing you to personalize your Bizz experience and make a bold visual statement.</p>
                <BlueButton buttonText={"SHOP NOW"}></BlueButton>
            </div>

           
            
            <div className="col-md-6 col-xs-12 pr-5 pl-5 d-flex flex-column justify-content-center align-items-start" id="height-container"  style={{height:'70vh'}}>
                <p className="font-size-36 raleway-bold mb-3" style={{color:'#FFFFFF'}}> Customize. Connect. Impress.</p>
                <p className="font-size-24 lato-semibold mt-2 mb-5" style={{color:'#FFFFFF'}}>Unleash your personal touch and forge memorable connections with Bizz, where you can effortlessly customize your data through our CMS, revolutionizing networking with style and sophistication</p>
                <BlueButton buttonText={"SHOP NOW"}></BlueButton>
            </div>
            <div className="col-md-6 col-xs-12 d-flex flex-row justify-content-center align-items-center" id="image-height-container"  style={{height:'70vh'}}>
                <img src="/images/CMS_Application.png" className='app-illustration' alt="CMS_Application" id="cms-illustration" style={{height:'500px'}} />
            </div>
            
            
            <div className='col-12 px-5 py-5 d-flex justify-content-center align-items-center flex-column' id="contact-us">
            <p className="font-size-36 raleway-bold " style={{color:'#FFFFFF'}}>Contact Us</p>
            <p className="font-size-18 lato-regular mt-2 mb-5 px-lg-5" style={{color:'#FFFFFF', textAlign:'center'}}>Looking for a quick and convenient way to reach out to us? Simply tap the button below and open up a WhatsApp chat window. Whether you have a question, need assistance, or want to share your feedback, we're just a message away. Connect with us effortlessly and experience our responsive and friendly customer support!</p>
            <WhiteButton  buttonText={"CHAT WHATSAPP"}></WhiteButton>

            </div>
            {/* 
            <div className='col-12 px-5 py-5' id="contact-us">
                <div className='p-lg-5 p-4' style={{backgroundColor:'#1A3B7D', borderRadius:'10px'}}>
                    <p className="font-size-36 raleway-bold mb-3" style={{color:'#FFFFFF'}}>Contact Us</p>
                    <div className='pr-lg-5'>
                        <p className="font-size-18 lato-regular mt-2 mb-3" style={{color:'#FFFFFF'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.</p>
                    </div>
                    
                    <div className="form-group pt-2">
                        <p className="font-size-18 raleway-semibold mb-3" style={{color:'#FFFFFF'}}>Full Name <span style={{color:'red'}}>*</span></p>
                        <input type="text" className="pb-1 text-input lato-regular" style={{color:'#FFFFFF'}} id="full_name" placeholder="Insert your full name" />
                    </div>
                    <div className="form-group pt-2">
                        <p className="font-size-18 raleway-semibold mb-3" style={{color:'#FFFFFF'}}>Email <span style={{color:'red'}}>*</span></p>
                        <input type="email" className="pb-1 text-input lato-regular" style={{color:'#FFFFFF'}} id="full_name" placeholder="Insert your email address" />
                    </div>

                    <div className="form-group pt-2">
                        <p className="font-size-18 raleway-semibold mb-3" style={{color:'#FFFFFF'}}>Message <span style={{color:'red'}}>*</span></p>
                        <textarea  className="pb-1 text-input lato-regular" style={{color:'#FFFFFF'}} id="message" placeholder="Insert your message" ></textarea>
                    </div>
                    <div style={{textAlign:"right"}} className="mt-4">
                        <WhiteButton buttonText={"SEND MESSAGE"}></WhiteButton>

                    </div>



                </div>
            </div>
            */}

        </div>
        {/* END OF MIDDLE SECTION */}

        <Footer></Footer>


    </div>
    )}
}

export default HomePage;