import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button} from "react-bootstrap";
import SideBar from "./Components/SideBar";
import AddProject from "./Components/AddProject";
import NoProjects from "./Components/NoProjects.jsx";
import Project from "./Components/Project.jsx";
function App() {
   const [projectButtonClicked, setProjectButtonClicked] = useState(false);
   const [projects, setProjects] = useState([]);
   const [activeProject, setActiveProject] = useState(-1);

  return (
      <main className="d-flex">
          {/*<PopUp />*/}
         <SideBar handleClicked={setProjectButtonClicked}  projects={projects} setActiveProject={setActiveProject}/>
         <section className={(activeProject === -1? "mt-5 d-flex align-items-center justify-content-center" : undefined )+ " col-7"}>
             {activeProject !== -1 && <Project projects={projects} setProjects={setProjects} index={activeProject} setActiveProject={setActiveProject}/>}
             {activeProject === -1 && (!projectButtonClicked? <NoProjects handleClicked={setProjectButtonClicked}/> : <AddProject setProjects={setProjects} showNoProject={setProjectButtonClicked}/>)}
         </section>
      </main>
  )
}

export default App
