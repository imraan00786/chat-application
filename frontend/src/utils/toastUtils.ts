import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showInfoToast = (message: string) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  });
};


