import {Button} from "react-bootstrap";
import {useEffect, useRef} from "react";
import Modal from "./Modal.jsx";

export default function Project({projects, setProjects, index, setActiveProject}) {
    const task = useRef(),
          modal = useRef();
    const project = projects[index];
    function handleDeleteProject(){
        const newProjects = [...projects];
        newProjects.splice(index, 1);
        setProjects(newProjects);
        setActiveProject(-1);
    }

    // function handleAddTaskButton() {
    //     const newProjects = [...projects]; // create a copy of the projects array
    //     const newTask = {
    //         title: task.current.value, // get the title value from the input field
    //         completed: false, // set the initial completed value to false
    //     };
    //     newProjects[index].tasks.push(newTask); // add the new task to the tasks array of the current project
    //     setProjects(newProjects); // update the projects state with the newProjects array
    //     task.current.value = ""; // clear the input field
    // }
    let errorMessage = "Task Title is required";
    function checkIsInputEmpty() {
        if (task.current.value === "") {
            modal.current.open();
            return true;
        }
    }
    function handleAddTaskButton() {
        if(checkIsInputEmpty()) return;
        console.log("Task added");
        const value = task.current.value;
        setProjects(prevProjects => {
            const newProjects = [...prevProjects];
            const newTask = {
                title: value,
                completed: false,
            };
            const newTasks = [...newProjects[index].tasks, newTask];
            newProjects[index] = { ...newProjects[index], tasks: newTasks };
            return newProjects;
        });
        task.current.value = "";
    }
    // function handleAddTaskButton() {
    //     setProjects(prevProjects => {
    //         const newProjects = [...prevProjects]; // create a copy of the previous projects array
    //         const newTask = {
    //             title: task.current.value,
    //             completed: false,
    //         };
    //         newProjects[index].tasks.push(newTask);
    //         return newProjects; // return the updated projects array
    //     });
    //     task.current.value = "";
    // }
    return (
        <div className="p-5">
            <Modal ref={modal} errorMessage={errorMessage}/>
                <div>
                    <h3 className="text-truncate">{project.title}</h3>
                    <p className="d-flex justify-content-between">
                        <span>{project.dueDate}</span>
                        <Button variant="" size="sm" className="text-danger" onClick={handleDeleteProject}>Delete</Button>
                    </p>
                    <p>{project.description}</p>
                    <hr/>
                </div>
                <div>
                    <h4>Tasks</h4>
                    <p>You Have {project.tasks.length} Tasks</p>
                    <div className="input-group mb-3">
                        <input ref={task} type="text" placeholder="Task Title" className="form-control" key={`task-input-${project.tasks.length}`}/>
                        <Button variant="success" size="sm" onClick={handleAddTaskButton}>Add Task</Button>
                    </div>
                    <ul className="list-unstyled">
                        {project.tasks.map((task, idx) => (
                            <li key={`${idx}${task.title}`} className="d-flex justify-content-between align-items-center p-2 mb-2 bg-dark text-white">
                                <input  type="checkbox" checked={task.completed} onChange={(e) => {
                                    const newProjects = [...projects];
                                    newProjects[index].tasks[idx].completed = e.target.checked;
                                    setProjects(newProjects);
                                }}/>
                                <span className="text-truncate px-2">{task.title}</span>
                                <Button variant="danger" size="sm" onClick={() => {
                                    const newProjects = [...projects];
                                    newProjects[index].tasks.splice(idx, 1);
                                    setProjects(newProjects);
                                }}>Delete</Button>
                            </li>
                        ))}
                    </ul>
                </div>
        </div>
    );
}