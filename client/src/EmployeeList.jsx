import axios from "axios";
function EmployeeList(props) {

    const url = 'http://127.0.0.1:3010';

    const deleteEmployee = (empId) => {
      axios.delete(url + '/' + empId).then((res) => props.setEmployeeList(res.data));
    };

    return (
      <div style={{border: '1px solid red'}}>
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
            {props.employeeList.map((emp, key) => {
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
                      style={{ backgroundColor: 'green' }}
                      onClick={() => props.updateEmployee(emp.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
}

export default EmployeeList;