import {Button} from "react-bootstrap";
import './model.css';
import img from '../assets/img_1.png';
import {forwardRef, useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";


const Modal = forwardRef(({errorMessage}, ref) =>  {
    const modal = useRef();
    useImperativeHandle(ref, () => ({
        open(){
            modal.current.showModal();
        }
    }));
    return createPortal((
        <dialog  ref={modal} className="result-modal col-md-5 col-10" >
            <div className="rounded-circle p-1 x-sign-parent">
                <span>X</span>
            </div>
            <h2>Oops...</h2>
            <p>
                {errorMessage}
            </p>
            <form method="dialog"> {/*This to close the dialog*/}
                <button>Close</button>

            </form>
        </dialog>
    ),document.body);
})

export default Modal;