import React, {Component} from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import PageHeading from '../../components/PageHeading';

class Advertisements extends Component {
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

                <PageHeading title="Advertisements" />
                <button type="button" className="btn btn-info">Add New Advertisement</button>

                {/* <!-- Content Row --> */}
                <div className="row">
                    <div className='col-lg-4 col-xs-12 pt-5'>
                      <img src="images/dummy_ads_1.jpg" class="img-fluid" />
                      <div className="pt-2">
                      <button type="button" className="mr-3 btn btn-secondary">Update</button>
                        <button type="button" className="btn btn-danger">Delete</button>
                      </div>
                    </div>
                    <div className='col-lg-4 col-xs-12 pt-5'>
                      <img src="images/dummy_ads_2.jpg" class="img-fluid" />
                      <div className="pt-2">
                        <button type="button" className="mr-3 btn btn-secondary">Update</button>
                        <button type="button" className="btn btn-danger">Delete</button>
                      </div>
                    </div>
                </div>

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

export default Advertisements;