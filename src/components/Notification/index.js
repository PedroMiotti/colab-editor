// Antd
import { notification } from "antd";

import './style.css'

export const customNotification = (type, placement, message, className, duration) => {
    notification[type]({
      message: message,
      duration: duration,
      className: className,
      placement,
    });
  };