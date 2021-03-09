import logo from './logo.svg';
import './App.css';
import React from 'react';
import students from './students.json'
import StudentRow from './StudentRow';
import {DropdownButton,Dropdown} from 'react-bootstrap'
import NewVisionsLogo from './new-visions-logo.png'
 
class App extends React.Component{

  state= {
    displayedStudents: null,
    filterOptions: [
    "normal",
    "by grade",
    "lowest averages per grade"
    ],
    extraColumn: false,
    originalStudents: null
  }

  componentDidMount =()=>{
    this.setState({displayedStudents: students})
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
          this.setState({displayedStudents: byGrade, extraColumn: false})
        }
        if(e.target.value === "Lowest Average Per Grade"){
          this.setState({extraColumn: true})
          let lowestAvgs = this.getLowestAvgeragePerGrade();
          this.setState({displayedStudents: lowestAvgs})
        }
        if(e.target.value==="Normal"){
          this.setState({displayedStudents: students, extraColumn: false})
        }
      }
  render(){
  return (
    <div className="App">
      <img src={NewVisionsLogo} className = "school-logo"/>
      <header className="site-header"> Technical Assignment</header>
      <label for="student">Filter:</label>
      <select name="filter By" className="select-dropdown" id="filter" onChange = {(e)=>this.handleSelect(e)}>
        <option value="Normal">None</option>
        <option value="By Grade">By Grade</option>
        <option value="Lowest Average Per Grade">Lowest Average Per Grade</option>
      </select>
      <table className="student-container">
        <thead className = "table-header">
        <tr>
          <td>Grade</td>
          <td>Name</td>
          {this.state.extraColumn ? 
        <td>Average</td>  
          : null
        }
        </tr>
        </thead>
        <tbody>
          {this.state.displayedStudents
            ? this.state.displayedStudents.map((student) => {
                return (
                  <StudentRow
                    name={student.name}
                    grade={student.grade}
                    avg={student["avg"] || null}
                    key={student._id.$oid}
                    extraColumn = {this.state.extraColumn}
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
