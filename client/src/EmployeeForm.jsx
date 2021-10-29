
import { useState } from 'react';
import axios from 'axios';

function EmployeeForm(props) {

    const url = 'http://127.0.0.1:3010';

    const handleSubmit = () => {
      addEmployee();

    }

    const handleInputChange = (value, key) => {
        let newEmp = {...props.employee}
        newEmp[key] = value;
      props.setEmployee(newEmp);
    }

    const addEmployee = () => {
      axios
        .post(url + '/create', {
          name: props.employee.name,
          age: props.employee.age,
          country: props.employee.country,
          position: props.employee.position,
          wage: props.employee.wage,
        })
        .then((res) => {
          props.setEmployeeList(res);
        });
    };

    const updateEmployee = (empId) => {
      const data = {
        id: props.employee.id,
        name: props.employee.name,
        age: props.employee.age,
        country: props.employee.country,
        position: props.employee.position,
        wage: props.employee.wage,
      };
      axios.put(url + '/' + empId, data).then((res) =>
        props.setEmployeeList(res.data)
      );
    };

    return (
      <div>
        <form className='info'>
          <label>Name</label>
          <input
            type='text'
            value={props.employee.name}
            onChange={(event) =>
              handleInputChange(event.target.value, 'name')
            }
          />
          <label>Age</label>
          <input
            type='text'
            value={props.employee.age}
            onChange={(event) =>
              handleInputChange(event.target.value, 'age')
            }
          />
          <label>Country</label>
          <input
            type='text'
            value={props.employee.country}
            onChange={(event) =>
              handleInputChange(event.target.value, 'country')
            }
          />
          <label>Position</label>
          <input
            type='text'
            value={props.employee.position}
            onChange={(event) =>
              handleInputChange(event.target.value, 'position')
            }
          />
          <label>Wage</label>
          <input
            type='text'
            value={props.employee.wage}
            onChange={(event) =>
              handleInputChange(event.target.value, 'wage')
            }
          />
          <button type='submit' onClick={handleSubmit}>
            Add Employee
          </button>
          <button onClick={() => updateEmployee(props.employee.id)}>Update Employee</button>
        </form>
      </div>
    );
}

export default EmployeeForm;