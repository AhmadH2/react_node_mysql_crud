
import './App.css';
import { useState, useEffect } from 'react'
import Axios from 'axios';


function App() {

  const [data, setData] = useState();

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState();
  const [employeeList, setEmployeeList] = useState([]);

  const url = 'http://127.0.0.1:3010';

  const getEmployees = ()=> {
    Axios.get(url).then((response)=> {
      setEmployeeList(response.data)
    })
    console.log(employeeList)
  }

  const addEmployee = () => {
    Axios.post(url + '/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then(()=> {
      console.log('success')
    })
  }

  const deleteEmployee = (empId) => {
    Axios.delete(url + '/' + empId).then((res)=> setEmployeeList(res.data));
  }

  const updateEmployee = (empId) => {
    const data = {
      id : empId,
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }
    Axios.put(url+ '/' + empId, data).then((res)=> setEmployeeList(res.data))
  }

  useEffect(()=> {
    const fetchData = async() => {
      const res = await fetch('http://127.0.0.1:3010');
      const json = await res.json();
      setData(json)
      // console.log(json)
    }

    fetchData();
  }, [setData])


  return (
    <div className='App'>
      {JSON.stringify(data)}
      <br />
      <br />
      <br />
      <div className='info'>
        <label>Name</label>
        <input
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label>Age</label>
        <input
          type='text'
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
        <label>Country</label>
        <input
          type='text'
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
        <label>Position</label>
        <input
          type='text'
          value={position}
          onChange={(event) => setPosition(event.target.value)}
        />
        <label>Wage</label>
        <input
          type='text'
          value={wage}
          onChange={(event) => setWage(event.target.value)}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <button
        style={{ width: 100, alignSelf: 'center', marginTop: 20 }}
        onClick={getEmployees}
      >
        Show employees
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Country</th>
            <th>Position</th>
            <th>Wage</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((emp, key) => {
            return (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.age}</td>
                <td>{emp.country}</td>
                <td>{emp.position}</td>
                <td>{emp.wage}</td>
                <td>
                  <button
                    style={{ backgroundColor: 'red' }}
                    onClick={() => deleteEmployee(emp.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    style={{backgroundColor: 'green'}}
                    onClick={()=> updateEmployee(emp.id)}
                  >Updaet</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
