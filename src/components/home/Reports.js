import React from "react";
import Report from "./Report";

const Reports = (props) => {
    const changeTableHandler = (id) => {
        props.changeTable(id);
    };

    return (
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Report Name</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                </tr>
            </thead>
            <tbody>
                {props.reportsData.map(report => {
                    return <Report changeTable={changeTableHandler} report={report} />
                })}
                
            </tbody>
        </table>
    );
};

export default Reports;