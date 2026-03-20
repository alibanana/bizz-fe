import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {clickMenuOpen} from '../../../redux/actions';
import { API_URL } from '../../../config';

class Sidebar extends Component {

  constructor(){
    super()
    this.state = {
        oldPassword : '',
        newPassword : '',
        confirmNewPassword : '',
        errorMessage : '',
        isLoading : false,
    }
  }

  onChange = async (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  updatePassword = async (e) => {
    e.preventDefault()
    try{
    this.notify('Updating Password..')

    const headers = {
      'Content-Type': 'application/json',
      'accept': '*/*',
      'Authorization': 'Bearer '+ localStorage.getItem("jwt"),
    };

    const data = {
        "OldPassword"         : this.state.oldPassword,
        "NewPassword"          : this.state.newPassword,
        "ConfirmNewPassword"    : this.state.confirmNewPassword,
    }


    const response = await axios.put(API_URL + '/api/change-password/'+ localStorage.getItem("uid"), data, { headers: headers });
    if(response.status === 200){
      this.setState({
        errorMessage :''
      })
      this.notify('Password updated!')
    }
    
    }
    catch (error) {
      if (error.response) {
        this.setState({
          errorMessage : error.response.data.errorMessage
        })
      } else {
        console.error(error);
      }
    }
  }

  notify = (message) => toast(message);


  render() {
    const { clickMenuOpen, toggled } = this.props;
    return (
      <ul style={{backgroundColor:'#1A3B7D'}} className={toggled ? 'navbar-nav sidebar sidebar-dark accordion toggled' : 'navbar-nav  sidebar sidebar-dark accordion'} id="accordionSidebar">

        {/* <!-- Sidebar - Brand --> */}
        <p className="sidebar-brand d-flex align-items-center justify-content-center" >
          <div className="sidebar-brand-icon rotate-n-15">
            <img src="/images/BIZZ_NAME_LOGO_WHITE.png" class="img-fluid" style={{width:'50%'}} alt="Bizz"/>
          </div>
        </p>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item">
          <Link className="nav-link" to={"/dashboard/profile/"+localStorage.getItem("uid")}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></Link>
        </li>

        {/* <!-- Nav Item - Users --> */}
        {localStorage.getItem("ur") === "admin"
        &&
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard/users">
            <i className="fas fa-fw fa-user-alt"></i>
            <span>Users Data</span></Link>
        </li>
        }

        
        

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */}
        {/* 
        <div className="sidebar-heading">
          Interface
        </div>

        <!-- Nav Item - Pages Collapse Menu --> 
        <li className="nav-item">
          <a className='nav-link collapsed' href="#" data-toggle="collapse" data-target="#collapseTwo"  aria-controls="collapseTwo">
            <i className="fas fa-fw fa-cog"></i>
            <span>Components</span>
          </a>
          <div id="collapseTwo" className='collapse' aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Components:</h6>
              <a className="collapse-item" href="buttons.html">Buttons</a>
              <Link className="collapse-item" to="/cards">Cards</Link>
            </div>
          </div>
        </li>
        /*}

         {/* Modal Change Password*/}
                  <div className="modal fade" id="changePasswordModal" tabIndex={-1} role="dialog" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
                    <form action="" method="PUT" onSubmit={(e) => this.updatePassword(e)}>

                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="changePasswordModalLabel">Change Password</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">x</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <div className='col-12 pt-1'>
                            <h5 style={{color:'red'}}>{this.state.errorMessage}</h5>
                          </div>
                          <div className='col-12 pt-1'>
                            <label style={{color:'grey'}}>Old Password</label> <br></br>
                            <input type="password" value={this.state.oldPassword} onChange={this.onChange} name="oldPassword" required className="form-control"   />
                          </div>
                          <div className='col-12 pt-1'>
                            <label style={{color:'grey'}}>New Password</label> <br></br>
                            <input type="password" value={this.state.newPassword} onChange={this.onChange} name="newPassword" required className="form-control"   />
                          </div>
                          <div className='col-12 pt-1'>
                            <label style={{color:'grey'}}>Confirm New Password</label> <br></br>
                            <input type="password" value={this.state.confirmNewPassword} onChange={this.onChange} name="confirmNewPassword" required className="form-control"   />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">CANCEL</button>
                          <button  type="submit" className="btn btn-primary">CONFIRM</button>
                        </div>
                      </div>
                    </div>
                    </form>
                  </div>


        {/* <!-- Sidebar Toggler (Sidebar) --> */}
        <div className="text-center d-none d-md-inline">
          <button onClick={() => { clickMenuOpen() }} className="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

      </ul>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickMenuOpen }, dispatch);

const mapStateToProps = store => ({
  toggled: store.menuState.menuOpen
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);