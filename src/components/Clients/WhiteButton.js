import React from 'react';
import '../../assets/css/Clients/components.css';

const WhiteButton = ({ buttonText }) => {

  const defaultPhoneNumber = "+6285179900181";
  const defaultMessage = "Halo Bizz! Saya tertarik dengan produk Anda, bisa minta info lebih lanjut?";
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${defaultPhoneNumber}&text=${encodedMessage}`;

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
       className="white-button font-size-18 lato-bold">
      {buttonText}
    </a>
  );
};

export default WhiteButton;