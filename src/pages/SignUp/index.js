import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {Helmet} from "react-helmet";


class SignUp extends Component {
    componentWillMount(){
        document.getElementById('body').style='background-color:#1A3B7D'
      }

      handleSignIn = () => {
        this.props.history.push("/dashboard");
    }

    render() {
        return (
          
            <div className="container" style={{backgroundColor:'#1A3B7D'}}>
            <Helmet>
                <title>
                    Bizz Sign Up | Elevate Your Connections, Redefine Impressions.
                </title>
                <meta
                    name="description"
                    content="Bizz | Elevate Your Connections, Redefine Impressions"
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
                            <h1 className="h4 text-gray-900 mb-4">Create Bizz Account</h1>
                          </div>
                          <form onSubmit={this.handleSignIn} className="user">
                            <div className="form-group">
                              <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..."/>
                            </div>
                            <div className="form-group">
                              <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password"/>
                            </div>
                            <button  type="submit" className="btn btn-primary btn-user btn-block">
                              Login
                            </button>
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
        
          </div>
        )
    }
}

export default withRouter(SignUp);