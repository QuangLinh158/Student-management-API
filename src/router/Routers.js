import Home from "../pages/Home";
import Instructor from "../pages/Instructor";
// import InstructorEdit from "../pages/InstructorEdit";
import Major from "../pages/Major";
// import MajorEdit from "../pages/MajorEdit";
// import NotFound from "../pages/NotFound";
import Student from "../pages/Student";

//b1.mảng điều hướng header
const Routers = [
    {path:"", component: <Home/>},
    {path:"home", component: <Home/>},
    {path:"major", component: <Major/>},
    // {path:"major/:id", component: <MajorEdit/>},
    // {path:"*", component: <NotFound/>},
    {path:"student", component:<Student/>},
    {path:"instructor", component:<Instructor/>},
    // {path:"instructor/:id", component:<InstructorEdit/>},
];

export default Routers;