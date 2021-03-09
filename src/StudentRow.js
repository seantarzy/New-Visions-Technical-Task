import React from 'react';

function StudentRow(props) {
    const {name, grade, avg} = props
    return (
        <tr className = "student-row">
            <td>{grade}</td>
            <td>{name}</td>
            {props.extraColumn ?
            <td>{avg}</td>
            :
            null}
        </tr>
    );
}

export default StudentRow;