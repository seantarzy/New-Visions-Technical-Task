import logo from './logo.svg';
import './App.css';
import React from 'react';
import students from './students.json'
 
class App extends React.Component{

  state= {
    students: null
  
  }

  componentDidMount =()=>{
    console.log(students)
    this.setState({students})
    this.groupByGrade()
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
  render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  }
}

export default App;
