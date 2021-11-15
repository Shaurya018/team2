import { NavLink } from "react-router-dom";

const Report = (props) => {
    const editHandler = () => {
        
    }

    const deleteHandler = () => {
        fetch(`http://localhost:27944/api/Reports/${props.report.id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if(response.ok) {
                console.log('deleted successfully');
                props.changeTable(props.report.id);
            }  
        })
        .catch(err => console.log(err));
    }

    return (
        <tr key={props.report.id}>
            <td>{props.report.ReportName}</td>
            <td>{props.report.Startdate}</td>
            <td>{props.report.Enddate}</td>
            {localStorage.getItem('isAdmin') === "true" ? <NavLink className="btn btn-warning mr-3" to={`/api/editReport/${props.report.id}`} exact>Edit</NavLink> : null}
            {localStorage.getItem('isAdmin') === "true" ? <button className="btn btn-danger" onClick={deleteHandler}>Delete</button> : null}
        </tr>
    )
};

export default Report;