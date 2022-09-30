import React from 'react';
import { toast } from 'react-toastify';

type Props = {
  message: string;
  type: string;
};

export const Toast = (type: string, message: string) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;

    case 'error':
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;

    case 'warn':
      toast.warn(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;

    case 'info':
      toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;

    default:
      toast(message);
      break;
  }
};
