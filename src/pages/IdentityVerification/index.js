import React, {Component} from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import PageHeading from '../../components/PageHeading';

class IdentityVerification extends Component {
  componentWillMount() {
    document.getElementById('body').className = 'page-top'
  }

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

                <PageHeading title="Identity Verification" />

                {/* <!-- Content Row --> */}
                <div className="row">
                    <div style={{width:"100%"}} className="mb-4">
                      <div class="dropdown show">
                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Sort by
                        </a>

                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                          <a class="dropdown-item" href="#">Newest records</a>
                          <a class="dropdown-item" href="#">Latest records</a>
                        </div>
                      </div>
                    </div>
                    <div style={{width:'100%'}}>
                        <table className="table table-hover table-responsive">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Date Requested</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Birthdate</th>
                                <th scope="col">ID Image</th>
                                <th scope="col">Selfie Image</th>
                                <th scope="col">Action</th>
                                <th scope="col">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>18 Maret 2023</td>
                                <td>Fernandha Dzaky Saputra</td>
                                <td>20 April 2023</td>
                                <td>
                                  <img src="/images/Dummy_ID.jpeg" className='img-fluid' alt="ID" style={{height:'200px'}} />

                                </td>
                                <td>
                                  <img src="/images/Dummy_ID.jpeg" className='img-fluid' alt="ID" style={{height:'200px'}} />
                                </td>
                                <td>
                                  <div className='d-flex'>
                                  <button type="button" class="btn btn-success">Accept</button>
                                  <button type="button" class="btn btn-danger ml-3">Reject</button>
                                  </div>
                                </td>
                                <td>Waiting for Confirmation</td>
                            </tr>
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
        </a></div>
    )
  }
}

export default IdentityVerification;