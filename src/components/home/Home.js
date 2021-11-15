import React, { useContext, useEffect, useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import Spinner from "../UI/Spinner/Spinner";
import Navbar from "./navabar";

import Reports from "./Reports";

const Home = () => {
    const auth = useContext(AuthContext);
    const [isloading, setIsLoading] = useState(false);
    const [reportsData, setReportsData] = useState([]);

    const changeTableHandler = (id) => {
        const newReports =reportsData.filter(report => {
            return report.id !== id;
        })
        setReportsData(newReports);
    }
    
    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:27944/api/Reports")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setIsLoading(false);
            setReportsData(data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <React.Fragment>
            {isloading && <Spinner show={isloading} />}
            <Navbar />
            
            <div class="row">
                <div class="offset-md-2 col-md-8">
                    <div class="container">
                        
                        <div class="row">
                            <div class="col-md-3 mb-5">
                                {localStorage.getItem('isAdmin') === 'true' ?
                                    <NavLink className="btn btn-secondary mb-3" to="/api/createReport" exact>Create new Report</NavLink> : null}
                            </div>
                        </div>

                        <Reports changeTable={changeTableHandler} reportsData={reportsData} />   
                        
                        <div class="container p-0">
                            <a className="btn btn-primary" href="http://localhost:27944/api/Reports/export" >Download Report sa Excel</a>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
};

export default Home;