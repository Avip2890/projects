import {Typography} from "@mui/material";
import StudentsComponent from "../../StudentComponent/StudentsComponent";

const HomePage =()=>{

    return(
        <div>
            <div className="students-home-page">
                <Typography variant="h3" className="welcome-text">Welcome to Students Portal</Typography>
                <StudentsComponent/>
            </div>
        </div>
    )
}

export default HomePage