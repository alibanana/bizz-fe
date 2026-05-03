import React from 'react';
import '../../assets/css/Clients/client.css';
import '../../assets/css/Clients/home.css';
import {Helmet} from "react-helmet";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Center from 'react-center';
import axios from 'axios';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import WhatsAppButton from "../../components/Buttons/SimpleWhatsAppButton";
import { API_URL } from '../../config';

class Profile extends React.Component {

  constructor() {
    super()
    this.state = {
      userRole: '',
      displayPicture: '',
      theme: '',
      name: '',
      occupation: '',
      bio: '',
      phoneNumbers: [],
      email: '',
      address: '',
      instagramLink: '',
      linkedinLink: '',
      tiktokLink: '',
      twitterLink: '',
      facebookLink: '',
      youtubeLink: '',
      threadsLink: '',
      githubLink: '',
      snapchatLink: '',
      pinterestLink: '',
      patreonLink: '',
      twitchLink: '',
      spotifyLink: '',
      isLoading: false,
      websites: [],
      websiteName: '',
      websiteLink: '',
      theme_color: "",
      socialMediaCounter: 0,
      tableTalkerLink: ''
    }
  }

  componentDidMount() {
    this.getUserDetail();
    this.getUserWebsites();
    this.countSocialMedia();
  }

  countSocialMedia = async () => {
    const {instagramLink, linkedinLink, twitterLink, facebookLink, tiktokLink,
      youtubeLink, threadsLink, githubLink, snapchatLink,
      pinterestLink, patreonLink, twitchLink, spotifyLink} = this.state;
    let counter = 0;

    if (instagramLink) counter++;
    if (linkedinLink) counter++;
    if (twitterLink) counter++;
    if (facebookLink) counter++;
    if (tiktokLink) counter++;
    if (youtubeLink) counter++;
    if (threadsLink) counter++;
    if (githubLink) counter++;
    if (snapchatLink) counter++;
    if (pinterestLink) counter++;
    if (patreonLink) counter++;
    if (twitchLink) counter++;
    if (spotifyLink) counter++;

    this.setState({socialMediaCounter: counter});
    console.log(this.state.socialMediaCounter);
  }


  getUserDetail = async (e) => {

    this.setState({
      isLoading: true
    })

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

        if (this.state.userRole === 'table-talker') {
          window.location.href = this.state.tableTalkerLink
          return
        }

        this.countSocialMedia()

        if (this.state.theme === "black-and-white") {
          this.setState({
            theme_color: "#060D0D"
          })
        } else if (this.state.theme === "blue") {
          this.setState({
            theme_color: "#0F547E"
          })
        } else if (this.state.theme === "green") {
          this.setState({
            theme_color: "#1D3108"
          })
        } else if (this.state.theme === "light-green") {
          this.setState({
            theme_color: "#41b549"
          })
        }
      }
      // Perform any additional actions after successful login
    } catch (error) {
      if (error.response) {
        this.setState({
          errorMessage: error.response.data.errorMessage
        })
        window.location.href = '/404'

      } else {
        console.error(error);
      }
    }


    this.setState({
      isLoading: false
    })
  }

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


  handleContactClick = async (e) => {
    var contact = {
      name: this.state.name,
      phoneNumbers: this.state.phoneNumbers,
      email: this.state.email,
      occupation: this.state.occupation,
      address: this.state.address
    };

    const telLines = contact.phoneNumbers
      .map(p => 'TEL;TYPE=cell:' + p.Number)
      .join('\n')

    var vcardContent =
      'BEGIN:VCARD\n' +
      'VERSION:3.0\n' +
      'N:' + contact.name + '\n' +
      telLines + '\n' +
      'EMAIL:' + contact.email + '\n' +
      'ROLE:' + contact.occupation + '\n' +
      'TITLE:' + contact.occupation + '\n' +
      'ADR:' + contact.address + '\n' +
      'END:VCARD';

    var blob = new Blob([vcardContent], {type: 'text/vcard'});
    var url = URL.createObjectURL(blob);

    const newLink = document.createElement('a');
    newLink.download = contact.name + '.vcf';
    newLink.textContent = contact.name;
    newLink.href = url;

    newLink.click();
  }


  render() {

    return (
      <div className="body-container">
        <Helmet>
          <title>
            Bizz Profile - {this.state.name}
          </title>
          <meta
            name="description"
            content="Bizz | Elevate Your Connections, Redefine Impressions"
          />
        </Helmet>

        <Center>
          {this.state.isLoading !== true ?

            <div style={{width: '500px'}} className="pb-5">

              {/* START OF WHATSAPP FLOATING BUTTON */}
              {(() => {
                const wa = this.state.phoneNumbers.find(p => p.LinkToWhatsapp)
                return wa ? <WhatsAppButton phoneNumber={wa.Number}/> : null
              })()}
              {/* END OF WHATSAPP FLOATING BUTTON */}

              {/* START OF PROFILE*/}
              <div className='row m-0'>
                <div className='col-12 p-0'>
                  <img src={this.state.displayPicture} className='img-fluid' id="profile-picture" alt="Profile"
                       style={{height: '320px', width: '100%', objectFit: 'cover'}}/>
                  {this.state.theme === "black-and-white" ?
                    <img src="/images/Wave_Border.png" className='img-fluid' alt="Wave"
                         style={{height: 'auto', width: '100%', objectFit: 'cover', marginTop: '-60px'}}/>
                    :
                    this.state.theme === "blue" ?
                      <img src="/images/Wave_Border_Blue.png" className='img-fluid' alt="Wave"
                           style={{height: 'auto', width: '100%', objectFit: 'cover', marginTop: '-60px'}}/>
                      :
                      this.state.theme === "green" ?
                        <img src="/images/Wave_Border_Green.png" className='img-fluid' alt="Wave"
                             style={{height: 'auto', width: '100%', objectFit: 'cover', marginTop: '-60px'}}/>
                        :
                        <img src="/images/Wave_Border_Light_Green.png" className='img-fluid' alt="Wave"
                             style={{height: 'auto', width: '100%', objectFit: 'cover', marginTop: '-60px'}}/>
                  }
                </div>
                <div className='col-12 px-4 pb-5 pt-2'>
                  {[{
                    content: this.state.name, classes: "font-size-24 raleway-bold", style: {color: '#252525'}
                  }, this.state.occupation && {
                    content: this.state.occupation,
                    classes: "font-size-18 lato-regular",
                    style: {color: '#252525', fontStyle: 'italic'}
                  }, this.state.bio && {
                    content: this.state.bio, classes: "font-size-16 lato-regular", style: {color: '#252525'}
                  }].filter(Boolean).map((section, index, array) => (<p
                    key={index}
                    className={`${section.classes} ${index === array.length - 1 ? 'pb-2' : 'mb-1'}`}
                    style={section.style}
                  >
                    {section.content}
                  </p>))}

                  {this.state.phoneNumbers.map((p, index) => (
                    <div key={index} className='mt-4'>
                      <div className='d-flex align-items-center justify-content-start'>
                        <div style={{width: '10%'}}>
                          <div className='circle  d-flex align-items-center justify-content-center'
                               style={{background: this.state.theme_color}}>
                            <i className="fas fa-phone font-size-18" style={{color: 'white'}}></i>
                          </div>
                        </div>
                        <div className='ml-3'>
                          <p className="font-size-18 lato-regular mb-0" style={{color: '#252525'}}>{p.Number}</p>
                          {p.Label && (
                            <p className="font-size-14 lato-regular mb-0" style={{color: '#777'}}>{p.Label}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className='mt-4'>
                    <div className='d-flex align-items-center justify-content-start'>
                      <div style={{width: '10%'}}>
                        <div className='circle  d-flex align-items-center justify-content-center'
                             style={{background: this.state.theme_color}}>
                          <i className="fas fa-envelope font-size-18" style={{color: 'white'}}></i>
                        </div>
                      </div>
                      <p className="font-size-18 lato-regular mb-0 ml-3"
                         style={{color: '#252525'}}>{this.state.email}</p>
                    </div>
                  </div>

                  {this.state.address !== "" &&


                    <div className='mt-4'>
                      <div className='d-flex align-items-center justify-content-start'>
                        <div style={{width: '10%'}}>
                          <div className='circle  d-flex align-items-center justify-content-center'
                               style={{background: this.state.theme_color}}>
                            <FontAwesomeIcon icon={faLocationDot} className="font-size-18" style={{color: 'white'}}/>
                          </div>

                        </div>
                        <p className="font-size-18 lato-regular mb-0 ml-3"
                           style={{color: '#252525'}}>{this.state.address}</p>
                      </div>
                    </div>
                  }


                  <button onClick={(e) => this.handleContactClick(e)}
                          className='client-squared-button raleway-semibold font-size-18 mt-4 py-3'
                          style={{backgroundColor: this.state.theme_color}}>
                  <span>
                    <i className="fa fa-solid fa-user-plus font-size-18 mr-3" style={{color: 'white'}}></i>
                  </span>
                    Save Contact
                  </button>

                </div>

              </div>
              {/* END OF PROFILE*/}

              {/* START OF SOCIAL MEDIA*/}
              {(this.state.instagramLink !== "" || this.state.twitterLink !== "" || this.state.linkedinLink !== "" ||
                  this.state.tiktokLink !== "" || this.state.facebookLink !== "" || this.state.youtubeLink !== "" ||
                  this.state.threadsLink !== "" || this.state.githubLink !== "" || this.state.snapchatLink !== "" ||
                  this.state.pinterestLink !== "" || this.state.patreonLink !== "" || this.state.twitchLink !== "" ||
                  this.state.spotifyLink !== "") &&
                <div className='row m-0 px-4 py-4'>
                  <div className='col-12 p-0 mb-3'>
                    <p className="font-size-24 raleway-semibold mb-1"
                       style={{color: '#252525', textDecoration: 'underline'}}>SOCIAL MEDIA</p>
                  </div>

                  <div className='col-12 p-0' style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 55px)',
                    justifyContent: 'space-between',
                    rowGap: '18px'
                  }}>
                    {this.state.instagramLink !== "" &&
                      <div onClick={() => window.open(this.state.instagramLink, '_blank')}
                           className='d-flex align-items-center justify-content-center' style={{
                        backgroundColor: this.state.theme_color,
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        height: '55px',
                        width: '55px',
                        borderRadius: '10px'
                      }}>
                        <i className="fab fa-instagram font-size-36" style={{color: 'white'}}></i>
                      </div>
                    }
                    {this.state.twitterLink !== "" &&
                      <div onClick={() => window.open(this.state.twitterLink, '_blank')}
                           className='d-flex align-items-center justify-content-center'
                           style={{
                             backgroundColor: this.state.theme_color,
                             boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                             height: '55px',
                             width: '55px',
                             borderRadius: '10px'
                           }}>
                        <i className="fab fa-twitter font-size-36" style={{color: 'white'}}></i>
                      </div>
                    }
                    {this.state.linkedinLink !== "" &&
                      <div onClick={() => window.open(this.state.linkedinLink, '_blank')}
                           className='d-flex align-items-center justify-content-center'
                           style={{
                             backgroundColor: this.state.theme_color,
                             boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                             height: '55px',
                             width: '55px',
                             borderRadius: '10px'
                           }}>
                        <i className="fab fa-linkedin-in font-size-36" style={{color: 'white'}}></i>
                      </div>
                    }
                    {this.state.tiktokLink !== "" &&
                      <div onClick={() => window.open(this.state.tiktokLink, '_blank')}
                           className='d-flex align-items-center justify-content-center'
                           style={{
                             backgroundColor: this.state.theme_color,
                             boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                             height: '55px',
                             width: '55px',
                             borderRadius: '10px'
                           }}>
                        <i className="fab fa-tiktok font-size-36" style={{color: 'white'}}></i>
                      </div>
                    }
                    {this.state.facebookLink !== "" &&
                      <div onClick={() => window.open(this.state.facebookLink, '_blank')}
                           className='d-flex align-items-center justify-content-center'
                           style={{
                             backgroundColor: this.state.theme_color,
                             boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                             height: '55px',
                             width: '55px',
                             borderRadius: '10px'
                           }}>
                        <i className="fab fa-facebook-f font-size-36" style={{color: 'white'}}></i>
                      </div>
                    }
                    {this.state.youtubeLink !== "" &&
                      <div onClick={() => window.open(this.state.youtubeLink, '_blank')}
                           className='d-flex align-items-center justify-content-center'
                           style={{
                             backgroundColor: this.state.theme_color,
                             boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                             height: '55px',
                             width: '55px',
                             borderRadius: '10px'
                           }}>
                        <i className="fab fa-youtube font-size-36" style={{color: 'white'}}></i>
                      </div>
                    }
                    {this.state.threadsLink !== "" &&
                      <div onClick={() => window.open(this.state.threadsLink, '_blank')}
                           className='d-flex align-items-center justify-content-center'
                           style={{
                             backgroundColor: this.state.theme_color,
                             boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                             height: '55px',
                             width: '55px',
                             borderRadius: '10px'
                           }}>
                        <i className="fab fa-threads font-size-36" style={{color: 'white'}}></i>
                      </div>
                    }
                    {this.state.githubLink !== "" &&
                      <div onClick={() => window.open(this.state.githubLink, '_blank')}
                           className='d-flex align-items-center justify-content-center'
                           style={{
                             backgroundColor: this.state.theme_color,
                             boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                             height: '55px',
                             width: '55px',
                             borderRadius: '10px'
                           }}>
                        <i className="fab fa-github font-size-36" style={{color: 'white'}}></i>
                      </div>
                    }
                    {this.state.snapchatLink !== "" &&
                      <div onClick={() => window.open(this.state.snapchatLink, '_blank')}
                           className='d-flex align-items-center justify-content-center'
                           style={{
                             backgroundColor: this.state.theme_color,
                             boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                             height: '55px',
                             width: '55px',
                             borderRadius: '10px'
                           }}>
                        <i className="fab fa-snapchat-ghost font-size-36" style={{color: 'white'}}></i>
                      </div>
                    }
                    {this.state.pinterestLink !== "" &&
                      <div onClick={() => window.open(this.state.pinterestLink, '_blank')}
                           className='d-flex align-items-center justify-content-center'
                           style={{
                             backgroundColor: this.state.theme_color,
                             boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                             height: '55px',
                             width: '55px',
                             borderRadius: '10px'
                           }}>
                        <i className="fab fa-pinterest font-size-36" style={{color: 'white'}}></i>
                      </div>
                    }
                    {this.state.patreonLink !== "" &&
                      <div onClick={() => window.open(this.state.patreonLink, '_blank')}
                           className='d-flex align-items-center justify-content-center'
                           style={{
                             backgroundColor: this.state.theme_color,
                             boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                             height: '55px',
                             width: '55px',
                             borderRadius: '10px'
                           }}>
                        <i className="fab fa-patreon font-size-36" style={{color: 'white'}}></i>
                      </div>
                    }
                    {this.state.twitchLink !== "" &&
                      <div onClick={() => window.open(this.state.twitchLink, '_blank')}
                           className='d-flex align-items-center justify-content-center'
                           style={{
                             backgroundColor: this.state.theme_color,
                             boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                             height: '55px',
                             width: '55px',
                             borderRadius: '10px'
                           }}>
                        <i className="fab fa-twitch font-size-36" style={{color: 'white'}}></i>
                      </div>
                    }
                    {this.state.spotifyLink !== "" &&
                      <div onClick={() => window.open(this.state.spotifyLink, '_blank')}
                           className='d-flex align-items-center justify-content-center'
                           style={{
                             backgroundColor: this.state.theme_color,
                             boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                             height: '55px',
                             width: '55px',
                             borderRadius: '10px'
                           }}>
                        <i className="fab fa-spotify font-size-36" style={{color: 'white'}}></i>
                      </div>
                    }
                  </div>
                </div>
              }
              {/* END OF SOCIAL MEDIA*/}

              {/* START OF WEBSITES*/}
              {this.state.websites.length > 0 &&

                <div className='row m-0 px-4 py-4'>
                  <div className='col-12 p-0 mb-3'>
                    <p className="font-size-24 raleway-semibold mb-1"
                       style={{color: '#252525', textDecoration: 'underline'}}>WEBSITES</p>
                  </div>
                  <div className='col-12 p-0'>
                    {
                      this.state.websites.map((e, index) => {
                        return (
                          <React.Fragment>
                            {
                              <div onClick={() => window.open(e.WebsiteLink, '_blank')} style={{
                                backgroundColor: this.state.theme_color,
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                borderRadius: '10px',
                                textAlign: 'center'
                              }} className="py-3 mb-3">
                                <p className="font-size-18 raleway-semibold mb-1"
                                   style={{color: '#FFFFFF'}}>{e.WebsiteName}</p>
                              </div>
                            }
                          </React.Fragment>
                        )
                      })
                    }

                  </div>
                </div>
              }
              {/* END OF WEBSITES*/}

              {/* FOOTER */}
              <div className='row m-0 px-4 py-4 mt-5' style={{borderTop: '1px solid #252525'}}>
                <div className='col-12 p-0 mb-3 d-flex align-items-center justify-content-center'>
                  <img src="/images/BIZZ_NAME_LOGO.png" className='img-fluid' alt="Bizz Logo" style={{width: '25%'}}/>
                </div>
                <div className='col-12 p-0 mb-3 d-flex align-items-center justify-content-center'>
                  <a href="http://smartbizz.id/" target="_blank" rel="noreferrer"
                     className="font-size-18 raleway-semibold mb-1"
                     style={{color: '#252525', textDecoration: 'underline'}}>POWERED BY &copy; BIZZ 2023</a>
                </div>
              </div>


            </div>
            :
            <p>Redirecting..</p>
          }
        </Center>

      </div>
    )
  }
}

export default Profile;