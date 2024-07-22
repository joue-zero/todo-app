import {Button} from "react-bootstrap";
import {useRef, useState} from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import Modal from "./Modal.jsx";

export default function AddProject({setProjects, showNoProject}) {
    const title = useRef(),
        description = useRef(),
        dueDate = useRef(),
        modal = useRef()
    const [errorMessage, setErrorMessage] = useState("");
    // get today's date
    const today = new Date();
    const dd = today.toISOString().split('T')[0];
    function handleSave(){
        const values = {
            'title': title.current.value,
            'description': description.current.value,
            'due date': dueDate.current.value
        }
        // loop on key and value
        for(const key in values){
            if(values[key] === ""){
                setErrorMessage(`${key} is required`);
                modal.current.open();
                return;
            }
        }
        if(values['due date'] < dd){
            setErrorMessage("Due date should be greater than or equal to today");
            modal.current.open();
            return;
        }
        const project = {
            title: values['title'],
            description: values['description'],
            dueDate: values['due date'],
            tasks:[]
        };
        setProjects((prevProjects) => [...prevProjects, project]);
        showNoProject(false);
    }

    function handleCancel(){
        title.current.value = "";
        description.current.value = "";
        dueDate.current.value = "";
    }
    return (
        <>
        <Modal ref={modal} errorMessage={errorMessage}/>
        <form className="col-md-6 col-11">
            <div className="text-end">
                <Button onClick={handleCancel} variant="">Cancel</Button>
                <Button onClick={handleSave} variant="success" className="ms-2">Save</Button>
            </div>

            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input ref={title} type="text" className="form-control" id="title" />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea ref={description} className="form-control" id="description" rows="3"></textarea>
            </div>
            <div className="mb-3">Due Date
                <label htmlFor="dueDate" className="form-label">Due Date</label>
                <input ref={dueDate} type="date" className="form-control" id="dueDate" min={dd}/>
            </div>
        </form>
        </>
    );

}