import React from "react";
import { Redirect } from "react-router";
import { useState } from "react/cjs/react.development";
import Spinner from "../../UI/Spinner/Spinner";

const CreateReport = () => {

    const [reportName, setReportName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);


    const reportNameHandler = (event) => {
        setReportName(event.target.value);
    }

    const startDateHandler = (event) => {
        setStartDate(event.target.value);
    }

    const endDateHandler = (event) => {
        setEndDate(event.target.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const data = {
            reportName: reportName,
            startDate: startDate,
            endDate: endDate
        };

        setIsLoading(true);

        fetch("http://localhost:27944/api/Reports", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            setIsLoading(false);
            console.log('reprot created!!');
            setRedirect(true);
        })
        .catch(err => {
            setIsLoading(false);
            console.log(err);
        });
    }

    if(redirect) {
        return <Redirect to="/api/Reports" />;
    }

    return (
        <React.Fragment>
            {isLoading && <Spinner show={isLoading} />}

            <div className="row mt-5">
                <div className="offset-md-4 col-md-4">
                    <div className="container">
                        <div className="container text-center">
                            <h1 className="display-5 mb-5">
                                Create New Report
                            </h1>
                        </div>
                        <form onSubmit={onSubmitHandler}>
                            <div className="form-group">
                                <label htmlFor="reportName">Report Name</label>
                                <input type="text" className="form-control" id="reportName" placeholder="Enter Report Name" onChange={reportNameHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="startDate">Start Date (dd/mm/yyyy)</label>
                                <input type="text" className="form-control" id="startDate" placeholder="Enter Start date" onChange={startDateHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDate">End Date (dd/mm/yyyy)</label>
                                <input type="text" className="form-control" id="endDate" placeholder="Enter end date" onChange={endDateHandler} />
                            </div>
                            <button type="submit" className="btn mt-4 btn-block btn-primary">Create Report</button>
                        </form>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
};

export default CreateReport;