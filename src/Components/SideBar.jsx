import { Button } from "react-bootstrap";
import { useState } from "react";

export default function SideBar({ handleClicked, projects, setActiveProject }) {
    const [activeLink, setActiveLink] = useState(-1);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    function handleClickedLi(index) {
        setActiveLink(index);
        setActiveProject(index);
    }

    function toggleSidebar() {
        setSidebarOpen(!isSidebarOpen);
    }

    return (
        <aside
            className={`col-3 py-5 px-3 bg-dark text-white vh-100 sidebar ${
                isSidebarOpen ? "show" : ""
            }`}
        >
            <div>

            <h2 className="text-uppercase">Projects</h2>
            <p className="my-5">
                <Button
                    variant="primary"
                    onClick={() => {
                        handleClicked(true);
                        setActiveProject(-1);
                    }}
                >
                    + Add A Project
                </Button>
            </p>
            <div className="body">
                <ul className="list-unstyled">
                    {projects.map((ele, index) => (
                        <li
                            key={`${index}${ele.title}`}
                            className={`p-1 mb-3 border-1 border border-${
                                activeLink === index ? "danger" : "dark"
                            }-subtle rounded spinner-border-sm text-truncate`}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClickedLi(index)}
                        >
                            {ele.title}
                        </li>
                    ))}
                </ul>
            </div>
            </div>
            <div className="toggle-btn" onClick={toggleSidebar}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </aside>
    );
}