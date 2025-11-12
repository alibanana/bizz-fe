import React from 'react';
import '../../assets/css/Clients/footer.css';
import '../../assets/css/Clients/client.css';

function Footer() {

  const defaultPhoneNumber = "+6285179900181";
  const defaultMessage = "Halo Bizz! Saya tertarik dengan produk Anda, bisa minta info lebih lanjut?";
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${defaultPhoneNumber}&text=${encodedMessage}`;

  return (
    <div className='row m-0 px-lg-5 px-4 py-5' style={{backgroundColor: '#1A3B7D'}}>
      <div className='col-12 p-0'>
        <img src="/images/BIZZ_NAME_LOGO_WHITE.png" id="footer-logo" alt="Logo" className="img-fluid desktop-widget"
             style={{width: '10%'}}/>
        <div className='mobile-widget' style={{textAlign: 'center'}}>
          <img src="/images/BIZZ_NAME_LOGO_WHITE.png" id="footer-mobile-logo" alt="Logo" className="img-fluid"
               style={{width: '50%'}}/>

        </div>
      </div>


      <div className='col-lg-3 col-xs-12 p-0 mt-5 d-flex flex-row justify-content-center align-items-start'>
        <div>
          <p className="font-size-24 lato-bold mb-3" style={{color: '#FFFFFF'}}>Company</p>
          <p onClick={() => window.open("#our-product", "_self")} className="font-size-18 lato-regular mb-3"
             style={{color: '#FFFFFF', cursor: 'pointer'}}>About Us</p>
          <p onClick={() => window.open("/#our-product", "_self")} className="font-size-18 lato-regular mb-3"
             style={{color: '#FFFFFF', cursor: 'pointer'}}>Our Product</p>
        </div>
      </div>

      <div className='col-lg-3 col-xs-12 p-0 mt-5 d-flex flex-row justify-content-center align-items-start'>
        <div>
          <p className="font-size-24 lato-bold mb-3" style={{color: '#FFFFFF'}}>Get in touch</p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="font-size-18 lato-regular mb-3"
             style={{color: '#FFFFFF', cursor: 'pointer'}}>Contact Us</a>
        </div>
      </div>

      <div className='col-lg-3 col-xs-12 p-0 mt-5 d-flex flex-row justify-content-center align-items-start'>
        <div>
          <p className="font-size-24 lato-bold mb-3" style={{color: '#FFFFFF'}}>Shop now</p>
          <p onClick={() => window.open("https://www.tokopedia.com/smartbizz", "_self")}
             className="font-size-18 lato-regular mb-3" style={{color: '#FFFFFF', cursor: 'pointer'}}>Tokopedia</p>
        </div>
      </div>

      <div className='col-lg-3 col-xs-12 p-0 mt-5 d-flex flex-row justify-content-center align-items-start'>
        <div>
          <p className="font-size-24 lato-bold mb-3" style={{color: '#FFFFFF'}}>Connect with us</p>
          <div className='d-flex'>
            <div className='mr-3'>
              <img onClick={() => window.open("https://www.instagram.com/smartbizz.id", "_blank")}
                   src="/images/icons/instagram_icon.png" id="footer-social-logo" alt="Logo" className="img-fluid"
                   style={{width: '25px', cursor: 'pointer'}}/>
            </div>
            <div className='mr-3'>
              <img onClick={() => window.open("https://www.tiktok.com/@smartbizz.id", "_blank")}
                   src="/images/icons/tiktok_icon.png" id="footer-social-logo" alt="Logo" className="img-fluid"
                   style={{width: '25px', cursor: 'pointer'}}/>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Footer;