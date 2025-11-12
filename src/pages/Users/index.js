import React, {Component} from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageHeading from '../../components/PageHeading';

class Users extends Component {
  componentWillMount() {
    document.getElementById('body').className = 'page-top'
    if(localStorage.getItem("ur") !== "admin"){
      window.location.href = "/dashboard/profile/"+localStorage.getItem("uid");

    }
  }

  componentDidMount(){
    this.getUsers()
  }

  constructor(){
    super()
    this.state = {
        isLoading : false,
        users : [],
        email: '',
        password: '',
        user_role: ''
    }
  }

  onChange = async (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  addNewUser = async (e) => {
    e.preventDefault()
    try{
    this.notify('Creating User..')

    const headers = {
      'Content-Type': 'application/json',
      'accept': '*/*',
      'Authorization': 'Bearer '+ localStorage.getItem("jwt"),
    };

    const data = {
        "Email"         : this.state.email,
        "Password"          : this.state.password,
        "UserRole"          : this.state.user_role,
    }


    const response = await axios.post('https://bizz-bo-prod.up.railway.app/api/signup', data, { headers: headers });
    if(response.status === 200){
      this.setState({
        errorMessage :''
      })
      this.notify('User created!')
    }
    
    }
    catch (error) {
      console.log("error!")
      if (error.response) {
        console.log( error.response.data.errorMessage)
        this.setState({
          errorMessage : error.response.data.errorMessage
        })
      } else {
        console.error(error);
      }
    }
  }
  

  getUsers = async () => {
    this.notify('Getting users data..')

    try {
      const headers = {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': 'Bearer '+ localStorage.getItem("jwt"),
      };
  
  
      const response = await axios.get('https://bizz-bo-prod.up.railway.app/api/user/all', { headers: headers });

  
      // Handle the response
      // Assuming the response contains data field with relevant information
      if(response.status === 200){
        this.setState({
          users : response.data.content,
        })
      }
      // Perform any additional actions after successful login
    } catch (error) {
      if (error.response) {
        this.setState({
          errorMessage : error.response.data.errorMessage
        })
      } else {
        console.error(error);
      }
    }
  }

  deleteUser = async(uid) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) {
      return;
    }
    this.notify('Deleting user..')

    this.setState({
      isLoading : true
    })
    try {
      const headers = {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': 'Bearer '+ localStorage.getItem("jwt"),
      };
  
  
      const response = await axios.delete('https://bizz-bo-prod.up.railway.app/api/user/delete/'+ uid, { headers: headers });

  
      // Handle the response
      // Assuming the response contains data field with relevant information
      if(response.status === 200){
        this.notify('Delete successfull!..')

        this.getUsers()
      }
      // Perform any additional actions after successful login
    } catch (error) {
      if (error.response) {
        this.setState({
          errorMessage : error.response.data.errorMessage
        })
      } else {
        console.error(error);
      }
    }
  }

  resetPassword = async (email) => {
    const confirmed = window.confirm('Are you sure you want to reset the password?');
    if (!confirmed) {
      return;
    }
  
    this.notify('Resetting password...');
    this.setState({
      isLoading: true
    });
  
    try {
      const headers = {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      };
      
      const data = {
        'email': email
      };
  
      const response = await axios.put('https://bizz-bo-prod.up.railway.app/api/reset-password', data, { headers: headers });

      // Handle the response
      // Assuming the response contains a data field with relevant information
      if (response.status === 200) {
        this.notify('Reset password successful!');
        this.getUsers();
      }
      // Perform any additional actions after successful password reset
    } catch (error) {
      if (error.response) {
        this.setState({
          errorMessage: error.response.data.errorMessage
        });
      } else {
        console.error(error);
      }
    }
  };
  notify = (message) => toast(message);

  render() {
    return (
      <div>
        {/* <!-- Page Wrapper --> */}
        <div id="wrapper">

          {/* <!-- Sidebar --> */}
          <Sidebar />
          {/* <!-- End of Sidebar --> */}

          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">

            {/* <!-- Main Content --> */}
            <div id="content">

              {/* <!-- Topbar --> */}
              <Topbar />
              {/* <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div className="container-fluid">

                {/* <!-- Page Heading --> */}
                <div className='d-flex justify-content-between w-100'>
                  <PageHeading title="Users" />
                  <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addNewUserModal">
                    Create New User
                  </button>
                  {/* Modal Add New User */}
                  <div className="modal fade" id="addNewUserModal" tabIndex={-1} role="dialog" aria-labelledby="addNewUserModalLabel" aria-hidden="true">
                    <form action="" method="POST" onSubmit={(e) => this.addNewUser(e)}>

                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="addNewUserModalLabel">Add New User</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">x</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <div className='col-12 pt-1'>
                            <label style={{color:'grey'}}>Email</label> <br></br>
                            <input type="email" value={this.state.email} onChange={this.onChange} name="email" required className="form-control" placeholder="e.g. johndoe@gmail.com"   />
                          </div>
                          <div className='col-12 pt-3'>
                            <label style={{color:'grey'}}>Password</label> <br></br>
                            <input type="password" value={this.state.password} onChange={this.onChange} name="password" required className="form-control" placeholder=""   />
                          </div>
                          <div className='col-12 pt-3'>
                            <label style={{color:'grey'}}>User Role</label> <br></br>
                            <select onChange={this.onChange} name="user_role" required className="form-control" value={this.state.user_role} >
                              <option value="user">Normal User</option>
                              <option value="table-talker">Table Talker</option>
                            </select>
                          </div>
                          <div className='col-12 pt-3'>
                            <p style={{color:'red'}}>{this.state.errorMessage}</p>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">CANCEL</button>
                          <button type="submit" className="btn btn-primary">CONFIRM</button>
                        </div>
                      </div>
                    </div>
                    </form>
                  </div>

                </div>

                {/* <!-- Content Row --> */}
                <div className="row pt-4">
                    <div style={{width:'100%'}}>
                        <table className="table table-hover table-responsive">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">UID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Registered At</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                    this.state.users.map( (e , index) => {
                      return(
                        <React.Fragment>
                            {
                              <tr>
                                  <th scope="row">{index+1} </th>
                                  <td>{e.ID}</td>
                                  <td>{e.Name}</td>
                                  <td>{e.Email}</td>
                                  <td>{e.Phone}</td>
                                  <td>{e.CreatedAt}</td>
                                  <td>
                                    <div className='d-flex'>
                                    <button type="button" onClick={() => this.deleteUser(e.ID)}  className="btn btn-danger pt-2 ml-2">
                                      Delete
                                    </button>
                                    <button type="button" onClick={() => this.resetPassword(e.Email)}  className="btn btn-info pt-2 ml-2">
                                      Reset Password
                                    </button>
                                    </div>

                                  </td>
                              </tr>
                               } 
                               </React.Fragment>
                             )
                           })              
                         } 
                            </tbody>
                        </table>
                    </div>
                </div>
                {/*
                <div className="row">
                  <div className="col-xl-8 col-lg-6">
                    <ChartLine />
                  </div>
                  <div className="col-xl-4 col-lg-6">
                    <ChartDonut />
                  </div>

                </div>
                 */}

              </div>
              {/* <!-- /.container-fluid --> */}

            </div>
            {/* <!-- End of Main Content --> */}

            {/* <!-- Footer --> */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; MewCom 2023</span>
                </div>
              </div>
            </footer>
            {/* <!-- End of Footer --> */}

          </div>
          {/* <!-- End of Content Wrapper --> */}

        </div>
        {/* <!-- End of Page Wrapper --> */}

        {/* <!-- Scroll to Top Button--> */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>

        <ToastContainer
            
            autoClose={5000}
            />
        
        </div>
    )
  }
}

export default Users;