import logo from './logo.svg';
import './App.css';
import React from 'react';
import students from './students.json'
import StudentRow from './StudentRow';
import {DropdownButton,Dropdown} from 'react-bootstrap'
 
class App extends React.Component{

  state= {
    displayedStudents: null,
    filterOptions: [
    "normal",
    "by grade",
    "lowest averages per grade"
    ]
  
  }

  componentDidMount =()=>{
    console.log(students)
    this.setState({displayedStudents: students})
    this.getLowestAvgeragePerGrade()
      }

      groupByGrade = ()=>{
        let studentsByGrade = [...students].sort((a,b)=>a.grade - b.grade)
          return studentsByGrade
      }

    
      getAverageOfGrades = (student)=>{
        let {scores} = student
        let total = 0
        for(let i=0;i<scores.length; i++){

          total += scores[i]["value"]
        }
        return total/(scores.length)
      }


      getStudentAverages = (studentArray)=>{
         let studentAvgs = studentArray.map((student) => {
           let avgGrade = this.getAverageOfGrades(student);
           student["avg"] = avgGrade;
           return student;
         });
         return studentAvgs
      }

      getLowestAvgeragePerGrade = ()=>{
        let studentsByGrade = this.groupByGrade()
        let studentAvgs = this.getStudentAverages(studentsByGrade)
        let lowestAvgPerGrade = []
        let currentLowStudent = studentAvgs[0]
        for(let i=1; i<studentAvgs.length; i++){
          if (studentAvgs[i]["grade"] > currentLowStudent["grade"] || i === studentAvgs.length-1){
            lowestAvgPerGrade.push(currentLowStudent)
            currentLowStudent = studentAvgs[i]
          }
            else if (studentAvgs[i]["avg"] < currentLowStudent["avg"]) {
              currentLowStudent = studentAvgs[i]
            }
        }
        return lowestAvgPerGrade
      }
      handleSelect = (e)=>{
        console.log("selected",e.target.value)

        if(e.target.value == "By Grade"){
          let byGrade = this.groupByGrade();
          this.setState({displayedStudents: byGrade})
        }
        if(e.target.value === "Lowest Average Per Grade"){
          let lowestAvgs = this.getLowestAvgeragePerGrade();
          this.setState({displayedStudents: lowestAvgs})
        }
        if(e.target.value==="normal"){
          this.setState({displayedStudents: students})
        }
      }
  render(){
  return (
    <div className="App">
      <header className="app-header">New Visions Technical Assignment</header>
      <label for="student">Filter By:</label>
      <select name="filter By" id="filter" onChange = {(e)=>this.handleSelect(e)}>
        <option value="Normal">Normal</option>
        <option value="By Grade">By Grade</option>
        <option value="Lowest Average Per Grade">Lowest Average Per Grade</option>
      </select>
      <table className="student-container">
        <tr>
          <td>Grade</td>
          <td>Name</td>
        </tr>
        <tbody>
          {this.state.displayedStudents
            ? this.state.displayedStudents.map((student) => {
                return (
                  <StudentRow
                    name={student.name}
                    grade={student.grade}
                    avg={student.avg || null}
                    key={student._id.$oid}
                  />
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}
}

export default App;
