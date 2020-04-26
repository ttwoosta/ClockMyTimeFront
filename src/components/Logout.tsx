import * as React from 'react';
import { connect } from 'react-redux';
import './styles.css';
import Utils from '../utils';

class Logout extends React.Component {

    state = {
        event: "initial"
      }

    public componentDidMount() {

      
    }

    onLogoutButtonClick(e) {
      const self = this;
      self.setState({ event: "beginLogout" });

      const transport = Utils.createApiClient();

      transport.get('/logout/')
      .then(function (response: any) {
          Utils.removeCreads();
          window.location.pathname = "/login";
      })
      .catch(function (error: any) {
          console.error(error);
          self.setState({ event: "failLogout" });
      })
    }

    render() {

        switch(this.state.event) {
            case "beginLogout":
                return (<h1>Logging out...</h1>)

            case "failLogout":
                return (<h1>Unable to log out at the moment</h1>)
        }
        
        return (<button onClick={(e) => { this.onLogoutButtonClick(e)}}>Logout</button>)
    }
}

export default connect()(Logout);