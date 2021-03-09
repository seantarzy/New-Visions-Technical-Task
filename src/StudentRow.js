import React from 'react';

function StudentRow(props) {
    const {name, grade, scores} = props
    return (
        <tr className = "student-row">
            <td>{grade}</td>
            <td>{name}</td>
            <td>{scores}</td>
            <td></td>
        </tr>
    );
}

export default StudentRow;