import React from 'react'
import HeaderUser from '../../Components/HeaderUser/HeaderUser'
import TopEmpCard from '../../Components/TopEmpCard/TopEmpCard'
import axios  from 'axios'
import './User.css'
const User = () => {
  const [employees, setEmployees] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [userInfo, setUserInfo] = React.useState({});

  React.useEffect(() => {
    // Fetch user info from backend
    axios.get('http://localhost:5000/api/homeuser-info', { withCredentials: true })
      .then(res => setUserInfo(res.data))
      .catch(() => setUserInfo({}));
    // Fetch all employee data from backend
    axios.get('http://localhost:5000/api/employees',{ withCredentials: true })
      .then(res => setEmployees(res.data))
      .catch(() => setEmployees([]));
  }, []);

  const fetchEmployees = async (search = "") => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees', {
        params: { search },
        withCredentials: true
      });
      setEmployees(response.data);
    } catch (error) {
      setEmployees([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    fetchEmployees(searchTerm);
  };

  return (
    <div className='User'>
      <div className="header">
        <HeaderUser userInfo={userInfo} />
      </div>
      <div className="userArea">
        <div className="searchPart">
          <form onSubmit={handleSearch}>
            <input
              type='text'
              placeholder='Search Employees by Name'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button type='submit'>Search</button>
          </form>
        </div>
        <div className="cardPart">
          {employees.map((employee) => (
            <TopEmpCard key={employee._id} employee={employee} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default User