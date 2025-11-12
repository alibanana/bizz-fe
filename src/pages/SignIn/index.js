import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Helmet} from "react-helmet";
import Cookies from "universal-cookie"

class SignIn extends Component {

  static defaultPhoneNumber = "+6285179900181";
  static defaultMessage = "Halo Bizz! Saya lupa password..";
  static encodedMessage = encodeURIComponent(SignIn.defaultMessage);
  static whatsappUrl = `https://api.whatsapp.com/send?phone=${SignIn.defaultPhoneNumber}&text=${SignIn.encodedMessage}`;

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      submitFailed: false,
      isLoading: false,
    }
  }

  componentWillMount() {
    document.getElementById('body').style = 'background-color:#1A3B7D'
  }

  onChange = async (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  signIn = async (e) => {
    e.preventDefault()
    const cookies = new Cookies();

    this.setState({
      isLoading: true
    })
    if (this.state.email === "" || this.state.password === "") {
      this.setState({
        errorMessage: "All fields must be filled!"
      })
    } else {
      this.notify('Logging In..')

      try {
        const headers = {
          'Content-Type': 'application/json',
          'accept': '*/*'
        };
        const data = {
          email: this.state.email,
          password: this.state.password
        }

        const response = await axios.post('https://bizz-bo-prod.up.railway.app/api/login', data, {headers: headers});


        // Handle the response
        console.log(response.status); // Assuming the response contains data field with relevant information
        if (response.status === 200) {
          cookies.set("Authorization", response.data.token, {
            expires: new Date(response.data.token * 1000)
          })
          localStorage.setItem("jwt", response.data.token)
          localStorage.setItem("uid", response.data.content.ID)
          localStorage.setItem("ur", response.data.content.UserRole)
          localStorage.setItem("name", response.data.content.Name)
          window.location.href = '/dashboard/profile/' + response.data.content.ID
        }
        // Perform any additional actions after successful login
      } catch (error) {
        if (error.response) {
          this.setState({
            errorMessage: error.response.data.errorMessage
          })
        } else {
          console.error(error);
        }
      }

    }

    this.setState({
      isLoading: false
    })
  }

  /*{handleSignIn = () => {
      this.props.history.push("/dashboard");
  }}*/
  notify = (message) => toast(message);


  render() {

    return (
      <div className="container" style={{backgroundColor: '#1A3B7D'}}>
        <Helmet>
          <title>
            Bizz Login | Elevate Your Connections, Redefine Impressions.
          </title>
          <meta
            name="description"
            content="Bizz Login | Elevate Your Connections, Redefine Impressions"
          />
        </Helmet>
        {/* <!-- Outer Row --> */}
        <div className="row justify-content-center">

          <div className="col-xl-10 col-lg-12 col-md-9">

            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome To Bizz!</h1>
                        {this.state.errorMessage !== '' &&

                          <p style={{color: 'red'}}>{this.state.errorMessage}</p>

                        }
                      </div>
                      <form onSubmit={this.signIn} className="user">
                        <div className="form-group">
                          <input type="email" onChange={this.onChange} name="email"
                                 className="form-control form-control-user" id="exampleInputEmail"
                                 aria-describedby="emailHelp" placeholder="Enter Email Address..."/>
                        </div>
                        <div className="form-group">
                          <input type="password" onChange={this.onChange} name="password"
                                 className="form-control form-control-user" id="exampleInputPassword"
                                 placeholder="Password"/>
                        </div>
                        <div style={{textAlign: 'center'}}>
                          <a
                            href={SignIn.whatsappUrl}
                            target="_blank" rel="noopener noreferrer" className="font-size-16 lato-regular mb-0">
                            Forget password?
                          </a>

                        </div>
                        {this.state.isLoading === true ?

                          <button disabled type="submit" className="btn btn-primary btn-user btn-block mt-4">
                            Loading..
                          </button>
                          :
                          <button type="submit" className="btn btn-primary btn-user btn-block mt-4">
                            Login
                          </button>
                        }


                      </form>
                      {/*
                          <hr/>
                          <div className="text-center">
                            <Link className="small" to="/signup">Create an Account!</Link>
                          </div>
                          */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>


        </div>
        <ToastContainer

          autoClose={1000}
        />

      </div>
    )
  }
}

export default withRouter(SignIn);