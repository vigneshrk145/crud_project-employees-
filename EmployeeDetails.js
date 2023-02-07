import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link} from 'react-router-dom';

 
function EmployeeDetail()
{
  const [search,setSearch] =useState('');
  const [record,setRecord] = useState([]);
 
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    salary: ""
  });
  
    //  Object Destructuring 
    const { fname, lname, email,phone,salary} = user;
    const onInputChange = e => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
     
    // On Page load display all records 
    const loadEmployeeDetail = async () =>  
    {
      var response = fetch('http://localhost:5000/api/v1/employee')
         .then(function(response){
            return response.json();
          })
         .then(function(response) {
            setRecord(response);
          });
    }
    useEffect(() => {
      loadEmployeeDetail();
    }, []);
 
    // Insert Employee Records 
    const submitEmployeeRecord = async (e) => {
        e.preventDefault();
        e.target.reset();
        await axios.post("http://localhost:5000/api/v1/employee",user);
        loadEmployeeDetail();
    };


    // Search Records here 
    const searchRecords = () =>
    {
       
        axios.get(`http://localhost:5000/api/v1/employee/searchRecord/${search}`)
        .then(response => {
          setRecord(response.data);
        });
    }
     
    // Delete Employee Record
    const deleteRecord = (EmployeesId) =>
    {
      axios.delete(`http://localhost:5000/api/v1/employee/${EmployeesId}`)
      .then((result)=>{
        loadEmployeeDetail();
      })
      .catch(()=>{
        alert('Error in the Code');
      });
    };
 
  return(
    <section>  
     <nav class="navbar navbar-expand-lg navbar-light " style={{backgroundColor:'#778899',fontFamily:"Noto"}}>
     <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
       
        <center>
          <center><a class="nav-link text-white" href="#"><center>DATA MANAGEMENT SYSTEM </center><span class="sr-only">(current)</span></a></center>
        </center>
        </ul>
     </div>   
    </nav>  
    
   
    <div class="container">  
    <h4 className="col-sm-4 text-center mt-4 " style ={{backgroundColor:"	#708090", fontFamily:"Verdana"}}>CRUD PROJECT</h4>
    
    <div class="row mt-3">
       <div class="col-sm-4">
          <div className="box p-3 mb-3 mt-5 " style ={{backgroundColor:"#808080"}} > 
            <form onSubmit={submitEmployeeRecord}> 
            <h5 className="mb-3">Insert Employee Records</h5>
                <div class="form-group">
                   <input type="text" class="form-control  mb-4" name="fname"   value={fname} onChange={e => onInputChange(e)} placeholder="Enter Firstname" required/>
                </div>
                  
                <div class="form-group">
                   <input type="text" class="form-control  mb-4" name="lname" value={lname} onChange={e => onInputChange(e)}  placeholder="Enter Lastname" required/>
                </div>
     
                <div class="form-group">
                   <input type="text" class="form-control mb-4" name="email" value={email} onChange={e => onInputChange(e)}  placeholder="Enter Email" required/>
                </div>
               
                <div class="form-group">
                   <input type="text" class="form-control mb-4" name="phone" value={phone} onChange={e => onInputChange(e)}  placeholder="Enter Phone" required/>
                </div>
 
                <div class="form-group">
                   <input type="text" class="form-control mb-2" name="salary" value={salary} onChange={e => onInputChange(e)} placeholder="Enter Salary" required/>
                </div>
                <button type="submit" class="btn btn-primary btn-block mt-4" >Insert Record</button>
             </form>
        </div>
      </div>


      <div class="col-sm-8">
        <h5 class="text-center  ml-4 mt-4  mb-5 bg-secondary"  style={{marginLeft:'55%',textAlign:'center',fontFamily:"Arial narrow",}}>View Records</h5>
        
        <div class="input-group mb-4 mt-3">
          <div class="form-outline">
           <input type="text" id="form1" onChange={(e)=>setSearch(e.target.value)} class="form-control" placeholder="Search Employee Here" />
        </div>
        <button type="button" onClick={searchRecords}  class="btn btn-success">search
            <i class="fa fa-search" aria-hidden="true"></i>
        </button>
        </div>  
        <table class=" table border-dark"style={{backgroundColor:"#a9a9a9"}} >
            <thead class ="  box border-dark" style={{backgroundColor:"#808080",color:""}}>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Salary</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
     
            {record.map((name)=>
                <tr>
                <td>{name.first_name}</td>
                <td>{name.last_name}</td>
                <td>{name.email}</td>
                <td>{name.phone}</td>
                <td>{name.salary}</td>
                <td>
                      <Link style={
                       {
                         padding:2,
                         backgroundColor:'red',
                         color:'white',
                         borderRadius: '5px',
                         margin:5,
                         textDecoration:'none'
                       }
                     }
                  
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you really want to delete "+ name.first_name
                          )
                          if (confirmBox === true) {
                            deleteRecord(name.id)
                          }
                        }}>delete </Link>
                   
                    <Link style={
                       {
                         padding:2,
                         backgroundColor:'green',
                         color:'white',
                         borderRadius: '5px',
                         margin:5,
                         textDecoration:'none'
                       }
                     }
                    
                    to={`/EditEmployee/editID/${name.id}`}>update
                       <i class="fa fa-edit" aria-hidden="true"></i> 
                    </Link>
                </td>
                </tr>
                )} 
            </tbody>
        </table>
      </div>
      </div>
    </div>
   </section>
  )
}
 
export default EmployeeDetail;