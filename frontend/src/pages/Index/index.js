import React from 'react';
import './index.css'
import DefaultLayout from '../../layouts/index';
import axios from 'axios';
import HomeAdCard from '../../components/HomeAdCard';
import Cookies from 'js-cookie';
import {MDBAlert, MDBIcon} from 'mdbreact';
import HomeCard from '../../components/HomeCard';
import { Link } from "react-router-dom";
class index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      loggedIn: false,
      token: Cookies.get('access_token')
     };
    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount = () => {
    this.getUser();
  }

  updateUser = (userObject) => {
    this.setState(userObject)
  }

  getUser = () => {
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': this.state.token
    };
      axios.get('http://localhost:5000/users/auth/user', {headers})
      .then(response => {
        if (response.status === 200) {
          this.setState({
            loggedIn: true,
            username: response.data.firstName
          })
        } else {
          console.log('Get user: no user');
          this.setState({
            loggedIn: false,
            username: null
          })
        }
      })
    }

  render() {
    return (
      <DefaultLayout>
        {this.state.loggedIn &&
          <MDBAlert color="success" className="margin">
            <MDBIcon icon="user"/> {this.state.username}
            <Link to='/car-card' className="spacing">
              <MDBIcon icon="cog" />
            </Link>
          </MDBAlert>
        }
        <HomeCard />
        <HomeAdCard />
      </DefaultLayout >
    );
  }
}

export default index;
