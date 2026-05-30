// src/utils/toast.js
import { toast } from 'react-toastify';

const options = {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
};

export const showSuccess = (msg) => toast.success(msg, options);
export const showError   = (msg) => toast.error(msg, options);
export const showInfo    = (msg) => toast.info(msg, options);
export const showWarn    = (msg) => toast.warn(msg, options);