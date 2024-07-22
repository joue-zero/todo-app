import {Button, Image} from "react-bootstrap";
import img from "../assets/img.png";

export default function NoProjects({handleClicked}) {
    return(
        <div className="text-center">
            <img src={img} alt="No Projects Found"  style={{width: "80px"}}/>
            <h3>No Projects Found</h3>
            <p className="mt-3">Click the button below to add a project</p>
            <Button variant="primary" onClick={() => handleClicked(true)}>+ Add A Project</Button>
        </div>
    );
}