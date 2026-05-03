import React, {Component} from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import PageHeading from '../../components/PageHeading';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Helmet} from "react-helmet";
import { API_URL } from '../../config';

class Dashboard extends Component {

  componentWillMount() {
    document.getElementById('body').className = 'page-top'
    this.getUserDetail()

  }

  componentDidMount() {
    this.getUserWebsites()
  }

  constructor() {
    super()
    this.state = {
      displayPicture: '',
      userRole: '',
      theme: '',
      name: null,
      occupation: null,
      bio: null,
      phoneNumbers: [],
      email: null,
      address: null,
      instagramLink: null,
      linkedinLink: null,
      tiktokLink: null,
      twitterLink: null,
      facebookLink: null,
      youtubeLink: null,
      threadsLink: null,
      githubLink: null,
      snapchatLink: null,
      pinterestLink: null,
      patreonLink: null,
      twitchLink: null,
      spotifyLink: null,
      submitFailed: false,
      isLoading: false,
      image: null,
      websites: [],
      websiteName: '',
      websiteLink: '',
      tableTalkerLink: '',
    }
  }

  handleChange = (event) => {
    this.setState({
      image: event.target.files[0]
    });
  };

  handleImageSubmit = (event) => {
    event.preventDefault();
    this.notify('Uploading Image..')
    const {image} = this.state;
    if (image) {
      this.uploadImage(image);
    } else {
      // Handle case when no image is selected
    }
  };

  onChange = async (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ?
      target.checked :
      target.value;
    this.setState({
      [e.target.name]: value
    })
  }

  addPhoneNumber = () => {
    this.setState(prev => ({
      phoneNumbers: [...prev.phoneNumbers, { Number: '', Label: '', LinkToWhatsapp: false }]
    }))
  }

  removePhoneNumber = (index) => {
    this.setState(prev => ({
      phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== index)
    }))
  }

  onPhoneChange = (index, field, value) => {
    this.setState(prev => {
      const updated = prev.phoneNumbers.map((p, i) => {
        if (field === 'LinkToWhatsapp' && value === true && i !== index) {
          return { ...p, LinkToWhatsapp: false }
        }
        return i === index ? { ...p, [field]: value } : p
      })
      return { phoneNumbers: updated }
    })
  }

  getUserDetail = async (e) => {
    this.setState({
      isLoading: true
    })

    this.notify('Getting user detail..')

    try {
      const headers = {
        'Content-Type': 'application/json',
        'accept': '*/*',
      };

      const response = await axios.get(API_URL + '/api/user/' + this.props.match.params.id, {headers: headers});

      // Handle the response
      // Assuming the response contains data field with relevant information
      if (response.status === 200) {
        this.setState({
          userRole: response.data.content.UserRole,
          displayPicture: response.data.content.DisplayPicture,
          theme: response.data.content.Theme,
          name: response.data.content.Name,
          occupation: response.data.content.Occupation,
          bio: response.data.content.Bio,
          phoneNumbers: response.data.content.PhoneNumbers ?? [],
          email: response.data.content.DisplayedEmail,
          address: response.data.content.Address,
          instagramLink: response.data.content.InstagramLink,
          linkedinLink: response.data.content.LinkedinLink,
          tiktokLink: response.data.content.TiktokLink,
          twitterLink: response.data.content.TwitterLink,
          facebookLink: response.data.content.FacebookLink,
          youtubeLink: response.data.content.YoutubeLink,
          threadsLink: response.data.content.ThreadsLink,
          githubLink: response.data.content.GithubLink,
          snapchatLink: response.data.content.SnapchatLink,
          pinterestLink: response.data.content.PinterestLink,
          patreonLink: response.data.content.PatreonLink,
          twitchLink: response.data.content.TwitchLink,
          spotifyLink: response.data.content.SpotifyLink,
          tableTalkerLink: response.data.content.TableTalkerLink,
        })
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
      console.log(this.state.userRole)
    }

    this.setState({
      isLoading: false
    })
  }

  updateTableTalkerProfile = async (e) => {
    e.preventDefault()
    try {
      this.notify('Updating User..')

      const headers = {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
      };

      const data = {
        "TableTalkerLink": this.state.tableTalkerLink,
      }


      const response = await axios.put(API_URL + '/api/user/update-table-talker/' + this.props.match.params.id, data, {headers: headers});
      if (response.status === 200) {
        this.setState({
          errorMessage: ''
        })
        this.notify('Profile updated!')
      }

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

  updateProfile = async (e) => {
    e.preventDefault()
    try {
      this.notify('Updating User..')

      const headers = {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
      };

      const data = {
        "Theme": this.state.theme,
        "Name": this.state.name,
        "Occupation": this.state.occupation,
        "Bio": this.state.bio,
        "PhoneNumbers": this.state.phoneNumbers.map(({ Number, Label, LinkToWhatsapp }) => ({ Number, Label, LinkToWhatsapp })),
        "Email": this.state.email,
        "Address": this.state.address,
        "InstagramLink": this.state.instagramLink,
        "LinkedinLink": this.state.linkedinLink,
        "TiktokLink": this.state.tiktokLink,
        "TwitterLink": this.state.twitterLink,
        "FacebookLink": this.state.facebookLink,
        "YoutubeLink": this.state.youtubeLink,
        "ThreadsLink": this.state.threadsLink,
        "GithubLink": this.state.githubLink,
        "SnapchatLink": this.state.snapchatLink,
        "PinterestLink": this.state.pinterestLink,
        "PatreonLink": this.state.patreonLink,
        "TwitchLink": this.state.twitchLink,
        "SpotifyLink": this.state.spotifyLink,
      }


      const response = await axios.put(API_URL + '/api/user/update/' + this.props.match.params.id, data, {headers: headers});
      if (response.status === 200) {
        this.setState({
          errorMessage: ''
        })
        this.notify('Profile updated!')
      }

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

  uploadImage = async (file) => {
    try {
      this.setState({
        isLoading: true
      })
      const formData = new FormData();
      formData.append("data", file);

      const response = await axios.post(API_URL + "/api/user/update-image/" + this.props.match.params.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'accept': '*/*',
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      // Handle the response
      // Assuming the response contains the uploaded image information
      if (response.status === 200) {
        this.setState({
          errorMessage: '',
          displayPicture: response.data.content.DisplayPicture,
        })
        this.notify('Profile updated!')
      }
      // Perform any additional actions after successful upload
    } catch (error) {
      if (error.response) {
        // Handle specific error cases if needed
        this.setState({
          errorMessage: error.response.data.errorMessage
        })
      } else {
        console.error(error);
      }
    }
    this.setState({
      isLoading: false
    })
  };

  getUserWebsites = async () => {
    this.setState({
      isLoading: true
    })
    try {
      const headers = {
        'Content-Type': 'application/json',
        'accept': '*/*',
      };


      const response = await axios.get(API_URL + '/api/user/websites/' + this.props.match.params.id, {headers: headers});


      // Handle the response
      // Assuming the response contains data field with relevant information
      if (response.status === 200) {
        this.setState({
          websites: response.data.content,
        })
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

  deleteWebsite = async (wid) => {
    this.notify('Deleting website..')

    this.setState({
      isLoading: true
    })
    try {
      const headers = {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
      };


      const response = await axios.delete(API_URL + '/api/website/delete/' + wid, {headers: headers});


      // Handle the response
      // Assuming the response contains data field with relevant information
      if (response.status === 200) {
        this.notify('Delete successfull!..')

        this.getUserWebsites()
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

  addWebsite = async (e) => {
    e.preventDefault()
    try {
      this.notify('Adding new website..')

      const headers = {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
      };

      const data = {
        "UserID": this.props.match.params.id,
        "WebsiteName": this.state.websiteName,
        "WebsiteLink": this.state.websiteLink,
      }


      const response = await axios.post(API_URL + '/api/website/create/' + this.props.match.params.id, data, {headers: headers});
      if (response.status === 200) {
        this.setState({
          errorMessage: ''
        })
        this.notify('Website created!')
        this.getUserWebsites()
      }

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

  notify = (message) => toast(message);

  render() {
    return (
      <div>
        <Helmet>
          <title>
            Bizz Dashboard | Elevate Your Connections, Redefine Impressions.
          </title>
          <meta
            name="description"
            content="Bizz | Elevate Your Connections, Redefine Impressions"
          />
        </Helmet>
        {/* <!-- Page Wrapper --> */}
        <div id="wrapper">

          {/* <!-- Sidebar --> */}
          <Sidebar/>
          {/* <!-- End of Sidebar --> */}

          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">

            {/* <!-- Main Content --> */}
            <div id="content">

              {/* <!-- Topbar --> */}
              <Topbar/>
              {/* <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              {this.state.userRole !== 'table-talker' ?

                <div className="container-fluid">

                  {/* <!-- Page Heading --> */}
                  <div className="row">
                    {/* START OF DISPLAY PICTURE */}
                    <div className='col-12 d-flex align-items-center justify-content-between'>
                      <PageHeading title="Dashboard"/>
                      <button
                        onClick={() => window.open('https://www.smartbizz.id/profile/' + localStorage.getItem("uid"), '_blank')}
                        class="btn btn-primary">VIEW PROFILE
                      </button>

                    </div>
                  </div>

                  {/* <!-- Content Row --> */}
                  <form onSubmit={this.handleImageSubmit}>

                    <div className="row pl-2 pr-2 pb-5">
                      {/* START OF DISPLAY PICTURE */}
                      <div className='col-12 pt-4'>
                        <h5>Display Picture</h5>
                        <div className='pt-2'>
                          <div className="custom-file">
                            {this.state.isLoading === true ?
                              <input type="file" disabled onChange={this.handleChange} name="image"
                                     className="custom-file-label" accept="image/*"/>
                              :
                              <input type="file" onChange={this.handleChange} name="image" className="custom-file-label"
                                     accept="image/*"/>}

                          </div>
                        </div>
                        <div className='pt-2'>
                          <img style={{width: '50%', height: '350px', objectFit: 'contain'}}
                               src={this.state.displayPicture} alt="User Profile" className="img-thumbnail"/>
                        </div>
                        <div className='pt-3'>
                          {this.state.isLoading === true ?
                            <button type="submit" disabled class="btn btn-primary">LOADING..</button>
                            :
                            <button type="submit" class="btn btn-primary">UPDATE DISPLAY PICTURE</button>
                          }
                        </div>
                      </div>
                      {/* END OF DISPLAY PICTURE */}
                    </div>
                  </form>

                  <form action="" method="PUT" onSubmit={(e) => this.updateProfile(e)}>
                    <div className="row pl-2 pr-2 pb-5">


                      {/* START OF THEME SELECTION */}
                      <div className='col-12 pt-5'>
                        {/* THEME SELECTION */}
                        <h5>Theme Selection</h5>
                        <div className='pt-2'>
                          <select value={this.state.theme} onChange={this.onChange} name="theme" required
                                  className="form-select form-control">
                            <option selected disabled>Select theme</option>
                            <option value={"black-and-white"}>Black and White</option>
                            <option value={"blue"}>Dark Blue</option>
                            <option value={"green"}>Dark Green</option>
                            <option value={"light-green"}>Light Green</option>
                          </select>
                        </div>
                        {/* THEME SELECTION */}
                      </div>
                      {/* END OF THEME SELECTION */}

                      {/* START OF PERSONAL INFO SECTION */}
                      <div className='col-12 pt-5'>
                        <h5>Personal Information</h5>
                      </div>
                      <div className='col-lg-6 col-md-6 col-xs-12 pt-3'>
                        <div>
                          <label>Full Name</label> <br></br>
                          <input type="text" value={this.state.name} onChange={this.onChange} name="name"
                                 className="form-control" placeholder="e.g. John Doe" aria-label="full_name"/>
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6 col-xs-12 pt-3'>
                        <div>
                          <label>Occupation</label> <br></br>
                          <input type="text" value={this.state.occupation} onChange={this.onChange} name="occupation"
                                 className="form-control" placeholder="e.g. John Doe" aria-label="full_name"/>
                        </div>
                      </div>

                      <div className='col-12 pt-3'>
                        <div>
                          <label>Bio</label> <br></br>
                          <textarea className="form-control" value={this.state.bio} onChange={this.onChange}
                                    name="bio"
                                    placeholder="e.g. Just someone figuring things out as I go. I like learning new stuff, exploring different interests, and keeping life a bit unpredictable. Always open to new ideas and good conversations."
                                    aria-label="bio"></textarea>
                        </div>
                      </div>

                      <div className='col-12 pt-3'>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <label className="mb-0">Phone Numbers</label>
                          <button type="button" className="btn btn-sm btn-outline-secondary"
                                  onClick={this.addPhoneNumber}>
                            + Add Phone
                          </button>
                        </div>

                        {this.state.phoneNumbers.map((p, index) => (
                          <div key={index} className="border rounded p-2 mb-2">
                            <div className="row">
                              <div className="col-7">
                                <input type="text" className="form-control form-control-sm mb-1"
                                       placeholder="e.g. +628111377893"
                                       value={p.Number}
                                       onChange={e => this.onPhoneChange(index, 'Number', e.target.value)} />
                                <input type="text" className="form-control form-control-sm"
                                       placeholder="Label (e.g. Work, Personal)"
                                       value={p.Label}
                                       onChange={e => this.onPhoneChange(index, 'Label', e.target.value)} />
                              </div>
                              <div className="col-5 d-flex flex-column align-items-start justify-content-between">
                                <div className="form-check form-switch">
                                  <input className="form-check-input" type="checkbox" role="switch"
                                         checked={p.LinkToWhatsapp}
                                         onChange={e => this.onPhoneChange(index, 'LinkToWhatsapp', e.target.checked)} />
                                  <label className="form-check-label">WhatsApp</label>
                                </div>
                                <button type="button" className="btn btn-sm btn-outline-danger mt-1"
                                        onClick={() => this.removePhoneNumber(index)}>
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}

                        {this.state.phoneNumbers.length === 0 &&
                          <p className="text-muted small">No phone numbers added.</p>
                        }
                      </div>

                      <div className='col-lg-6 col-md-6 col-xs-12 pt-3'>
                        <div>
                          <label>Displayed Email</label> <br></br>
                          <input type="email" value={this.state.email} onChange={this.onChange} name="email"
                                 className="form-control" placeholder="e.g. john@doe.com" aria-label="email"/>
                        </div>
                      </div>
                      <div className='col-12 pt-3'>
                        <div>
                          <label>Address</label> <br></br>
                          <textarea className="form-control" value={this.state.address} onChange={this.onChange}
                                    name="address" placeholder="e.g. Jl. John Doe" aria-label="address"></textarea>
                        </div>
                      </div>
                      {/* END OF PERSONAL INFO SECTION */}


                      {/* START OF SOCIAL MEDIA SECTION */}
                      <div className='col-12 pt-5'>
                        <h5>Social Media</h5>
                      </div>
                      <div className='col-lg-6 col-md-6 col-xs-12 pt-3'>
                        <div>
                          <label>Instagram Link</label> <br></br>
                          <input type="text" value={this.state.instagramLink} onChange={this.onChange}
                                 name="instagramLink" className="form-control"
                                 placeholder="e.g. https://www.instagram.com/johndoe/"/>
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6  col-xs-12 pt-3'>
                        <div>
                          <label>LinkedIn Link</label> <br></br>
                          <input type="text" value={this.state.linkedinLink} onChange={this.onChange}
                                 name="linkedinLink" className="form-control"
                                 placeholder="e.g. https://www.linkedin.com/in/john-doe/" aria-label="linked_in_link"/>
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6 col-xs-12 pt-3'>
                        <div>
                          <label>TikTok Link</label> <br></br>
                          <input type="text" value={this.state.tiktokLink} onChange={this.onChange} name="tiktokLink"
                                 className="form-control" placeholder="e.g. https://www.tiktok.com/@johndoe"
                                 aria-label="tiktok_link"/>
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6 col-xs-12 pt-3'>
                        <div>
                          <label>Twitter Link</label> <br></br>
                          <input type="text" value={this.state.twitterLink} onChange={this.onChange} name="twitterLink"
                                 className="form-control" placeholder="e.g. https://twitter.com/johndoe"
                                 aria-label="twitter_link"/>
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6 col-xs-12 pt-3'>
                        <div>
                          <label>Facebook Link</label> <br></br>
                          <input type="text" value={this.state.facebookLink} onChange={this.onChange}
                                 name="facebookLink" className="form-control"
                                 placeholder="e.g. https://facebook.com/johndoe" aria-label="facebook_link"/>
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6 col-xs-12 pt-3'>
                        <div>
                          <label>YouTube Link</label> <br></br>
                          <input type="text" value={this.state.youtubeLink} onChange={this.onChange}
                                 name="youtubeLink" className="form-control"
                                 placeholder="e.g. https://www.youtube.com/channel/johndoe" aria-label="youtube_link"/>
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6 col-xs-12 pt-3'>
                        <div>
                          <label>Threads Link</label> <br></br>
                          <input type="text" value={this.state.threadsLink} onChange={this.onChange}
                                 name="threadsLink" className="form-control"
                                 placeholder="e.g. https://www.threads.net/@johndoe" aria-label="thread_link"/>
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6 col-xs-12 pt-3'>
                        <div>
                          <label>GitHub Link</label> <br></br>
                          <input type="text" value={this.state.githubLink} onChange={this.onChange}
                                 name="githubLink" className="form-control"
                                 placeholder="e.g. https://github.com/johndoe" aria-label="github_link"/>
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6 col-xs-12 pt-3'>
                        <div>
                          <label>Snapchat Link</label> <br></br>
                          <input type="text" value={this.state.snapchatLink} onChange={this.onChange}
                                 name="snapchatLink" className="form-control"
                                 placeholder="e.g. https://www.snapchat.com/add/johndoe" aria-label="snapchat_link"/>
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6 col-xs-12 pt-3'>
                        <div>
                          <label>Pinterest Link</label> <br></br>
                          <input type="text" value={this.state.pinterestLink} onChange={this.onChange}
                                 name="pinterestLink" className="form-control"
                                 placeholder="e.g. https://www.pinterest.com/johndoe" aria-label="pinterest_link"/>
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6 col-xs-12 pt-3'>
                        <div>
                          <label>Patreon Link</label> <br></br>
                          <input type="text" value={this.state.patreonLink} onChange={this.onChange}
                                 name="patreonLink" className="form-control"
                                 placeholder="e.g. https://www.patreon.com/johndoe" aria-label="patreon_link"/>
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6 col-xs-12 pt-3'>
                        <div>
                          <label>Twitch Link</label> <br></br>
                          <input type="text" value={this.state.twitchLink} onChange={this.onChange}
                                 name="twitchLink" className="form-control"
                                 placeholder="e.g. https://www.twitch.tv/johndoe" aria-label="twitch_link"/>
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6 col-xs-12 pt-3'>
                        <div>
                          <label>Spotify Link</label> <br></br>
                          <input type="text" value={this.state.spotifyLink} onChange={this.onChange}
                                 name="spotifyLink" className="form-control"
                                 placeholder="e.g. https://open.spotify.com/user/johndoe" aria-label="spotify_link"/>
                        </div>
                      </div>
                      {/* END OF SOCIAL MEDIA SECTION */}
                      <div className='col-12 d-flex align-items-center justify-content-center pt-4'>
                        <h5 style={{color: 'red'}}>{this.state.errorMessage}</h5>
                      </div>
                      <div className='col-12 d-flex flex-row-reverse pt-3'>
                        <button type="submit" class="btn btn-primary">UPDATE PROFILE</button>
                      </div>

                      {/* START OF WEBSITES*/}
                      <div className='col-12  mt-5'>
                        <h5>Websites</h5>
                        {this.state.websites.length === 0 &&
                          <p style={{color: 'orange'}}>You have no websites! added</p>
                        }
                      </div>
                      {
                        this.state.websites.map((e, index) => {
                          return (
                            <React.Fragment>
                              {
                                <div className='row m-0 pl-3 pr-3 pb-3 mt-3 w-100'
                                     style={{backgroundColor: '#1A3B7D', borderRadius: '10px'}}>
                                  <div className='col-12 pt-3'>
                                    <label style={{color: 'white'}}>#{index + 1} Website Name</label> <br></br>
                                    <input type="text" className="form-control" placeholder="e.g. Tokopedia" disabled
                                           value={e.WebsiteName} aria-label="tiktok_link"/>
                                  </div>
                                  <div className='col-12 pt-3'>
                                    <label style={{color: 'white'}}>#{index + 1} Website Link</label> <br></br>
                                    <input type="text" className="form-control"
                                           placeholder="e.g. https://www.tokopedia.com/" disabled value={e.WebsiteLink}
                                           aria-label="tiktok_link"/>
                                  </div>
                                  <div className='col-12 pt-3 d-flex align-items-center justify-content-end'>

                                    <button type="button" onClick={() => this.deleteWebsite(e.ID)}
                                            className="btn btn-danger pt-2 ml-2">
                                      DELETE
                                    </button>
                                  </div>
                                </div>
                              }
                            </React.Fragment>
                          )
                        })
                      }
                      <div className='col-12 d-flex flex-row-reverse pt-4'>
                        {this.state.websites.length < 2 ?
                          <button type="button" className="btn btn-primary" data-toggle="modal"
                                  data-target="#addWebsiteModal">
                            ADD WEBSITE
                          </button>
                          :
                          <p style={{color: 'orange'}}>You have reached maximum websites! Please contact our team to add
                            more.</p>
                        }
                      </div>


                      {/* END OF WEBSITES*/}


                    </div>

                  </form>

                  {/* Modal Add Website */}
                  <div className="modal fade" id="addWebsiteModal" tabIndex={-1} role="dialog"
                       aria-labelledby="addWebsiteModalLabel" aria-hidden="true">
                    <form action="" method="POST" onSubmit={(e) => this.addWebsite(e)}>

                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="addWebsiteModalLabel">Add New Website</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">x</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div className='col-12 pt-1'>
                              <h5 style={{color: 'red'}}>{this.state.errorMessage}</h5>
                            </div>
                            <div className='col-12 pt-1'>
                              <label style={{color: 'grey'}}>Website Name</label> <br></br>
                              <input type="text" value={this.state.websiteName} onChange={this.onChange}
                                     name="websiteName" required className="form-control" placeholder="e.g. Tokopedia"
                                     aria-label="tiktok_link"/>
                            </div>
                            <div className='col-12 pt-3'>
                              <label style={{color: 'grey'}}>Website Link</label> <br></br>
                              <input type="text" value={this.state.websiteLink} onChange={this.onChange}
                                     name="websiteLink" required className="form-control"
                                     placeholder="e.g. https://www.tokopedia.com/" aria-label="tiktok_link"/>
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
                :
                <div className="container-fluid">

                  {/* <!-- Page Heading --> */}
                  <div className="row">
                    {/* START OF DISPLAY PICTURE */}
                    <div className='col-12 d-flex align-items-center justify-content-between'>
                      <PageHeading title="Dashboard"/>
                      <button
                        onClick={() => window.open('https://www.smartbizz.id/profile/' + localStorage.getItem("uid"), '_blank')}
                        class="btn btn-primary">VIEW PROFILE
                      </button>

                    </div>
                  </div>

                  {/* <!-- Content Row --> */}
                  <form action="" method="PUT" onSubmit={(e) => this.updateTableTalkerProfile(e)}>

                    <div className="row pl-2 pr-2 pb-5">
                      <div className='col-12 pt-4'>
                        <h5>Table Talker Link</h5>
                        <div className='pt-2'>
                          <div>

                            <input type="text" value={this.state.tableTalkerLink} onChange={this.onChange}
                                   name="tableTalkerLink" className="form-control"
                                   placeholder="e.g. https://www.google.com"/>

                          </div>
                        </div>
                        <div className='pt-3'>
                          <button type="submit" class="btn btn-primary">UPDATE LINK</button>

                        </div>
                      </div>
                    </div>
                  </form>


                </div>
              }
              {/* <!-- /.container-fluid --> */}

            </div>
            {/* <!-- End of Main Content --> */}

            {/* <!-- Footer --> */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Bizz 2023</span>
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

          autoClose={10000}
        />
      </div>
    )
  }
}

export default Dashboard;