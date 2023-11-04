import './Styles.css'

import React, { useState, useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Automatically hide the notification after a few seconds (you can adjust the timeout)
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'green';
      case 'error':
        return 'red';
      case 'info':
        return 'blue';
      default:
        return 'black';
    }
  };

  const notificationStyle ={
    top: 0,
    left: 500,
    right: 500,
    backgroundColor: getBackgroundColor(),
    color: 'white',
    padding: '10px',
    display: isVisible ? 'block' : 'none',
  };

  return (
    <div className='notifies shadow' style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
