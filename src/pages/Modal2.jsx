import { createPortal } from "react-dom";
import CloseIcon from '@mui/icons-material/Close';

const Modal2 = ({ children, onClose }) => {
    return createPortal(
        <div className="fixed inset-0 z-99999 flex w-full h-full items-center justify-center bg-background-backdrop bg-opacity-60">
            <div className="relative bg-background-modal rounded-lg shadow-lg w-[100%] max-w-[718px] pb-4">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-3xl leading-4 cursor-pointer rounded-max hover:text-black-100 hover:bg-white"
                >
                    {/*&times;*/}
                    <CloseIcon fontSize="small"/>
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal2;
