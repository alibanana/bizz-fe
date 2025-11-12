import React from 'react';

const WhatsAppButton = ({phoneNumber}) => {
  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber.replace(/\D/g, '')}`, '_blank');
  };

  return (<div
    onClick={handleClick}
    style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#25D366',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      cursor: 'pointer',
      zIndex: 1000,
      animation: 'pulse 2s infinite',
      transform: 'translateZ(0)',
      transition: 'all 0.2s ease-in-out'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.1) translateZ(0)';
      e.currentTarget.style.animation = 'pulse 1s infinite';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1) translateZ(0)';
      e.currentTarget.style.animation = 'pulse 2s infinite';
    }}
  >
    <i className="fab fa-whatsapp" style={{color: 'white', fontSize: '34px'}}></i>
    <style jsx>{`
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
            }
            70% {
                box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
            }
        }
    `}</style>
  </div>);
};

export default WhatsAppButton;