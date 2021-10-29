
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';


function App() {

  const [employee, setEmployee] = useState({});

  
  const [employeeList, setEmployeeList] = useState([]);

  const url = 'http://127.0.0.1:3010';

  useEffect(()=> {
    axios.get(url).then((response)=> {
      setEmployeeList(response.data)
    })
  }, [setEmployeeList])

  const updateEmployee = (empId) => {
    setEmployee(employeeList.filter((emp) => emp.id === empId)[0]);
  }

  return (
    <div className='App'>
      <EmployeeForm
        employeeList={employeeList}
        setEmployeeList={setEmployeeList}
        employee={employee}
        setEmployee={setEmployee}
      />
      <br />
      <EmployeeList
        employeeList={employeeList}
        setEmployeeList={setEmployeeList}
        updateEmployee={updateEmployee}
      />
    </div>
  );
}

export default App;
