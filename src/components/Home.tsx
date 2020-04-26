import * as React from 'react';
import { connect } from 'react-redux';
import { createStore, Action } from 'redux';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Utils from '../utils';
import Spinner from "./Spinner";
import './homeStyles.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Home extends React.Component {

  state = {
    event: "initial",
    date: '',
    timeIn: '',
    timeOut: ''
  };

  constructor(props: Readonly<{}>) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.onFormTimeSubmit = this.onFormTimeSubmit.bind(this);
    this.onTryAgainButtonClick = this.onTryAgainButtonClick.bind(this);
    this.onSubmitAnotherButtonClick = this.onSubmitAnotherButtonClick.bind(this);
  }

  // This method is called when the component is first added to the document
  public componentDidMount() {
      
      const self = this;
      self.setState({ event: "beginGetProfile" });

      const transport = Utils.createApiClient();

      transport.get('/accounts/profile/')
      .then(function (response: any) {
          console.log(response);
          
          Utils.setUsername(response.data["username"]);
          Utils.setEmail(response.data["email"]);
          Utils.setFullName(response.data[Utils.kFullname])
          self.setState({ event: "endedGetProfile" });
      })
      .catch(function (error: any) {
          console.error(error);
          
          if (error.response && error.response.status === 401)
            Utils.removeCreads();

          self.setState({ event: "failGetProfile" });
          window.location.pathname = "/login";
      })

      const d = new Date();
      this.state.date = this.dateToDateString(d);
      this.state.timeIn = this.dateToTimeString(d);
      this.state.timeOut = this.dateToTimeString(d);
  }

  dateToDateString(d: Date) {
    // https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

    let dateValue = `${ye}-${mo}-${da}`;
    return dateValue;
  }

  dateToTimeString(d: Date) {
    var formatter = new Intl.DateTimeFormat('en-us', { hour: 'numeric', minute: 'numeric', hour12: false});
    let timeValue = formatter.format(d);
    return timeValue;
  }

  onFormTimeSubmit(e) {
    e.preventDefault();

    if (window.confirm("Are you ready to submit the time?")) {
      
      const transport = Utils.createApiClient();
      var token = Utils.getCsrfToken();

      const self = this;
      self.setState({ event: "beginSubmitTime" });

      transport.post('/schedules/', {
        date: this.state.date,
        timeIn: this.state.timeIn,
        timeOut: this.state.timeOut
      })
      .then(function (response: any) {
          console.log(response);          
          self.setState({ event: "endedSubmitTime" });
      })
      .catch(function (error: any) {
          console.error(error);
          self.setState({ event: "failSubmitTime" });
      })
    }
    else {
      e.preventDefault();
    }
  }

  handleChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({
      [name]: value,
    });
    
  }

  onTryAgainButtonClick(e) {
    this.setState({event: "endedGetProfile"})
  }

  onSubmitAnotherButtonClick(e) {
    const d = new Date();
    this.state.date = this.dateToDateString(d);
    this.state.timeIn = this.dateToTimeString(d);
    this.state.timeOut = this.dateToTimeString(d);
    this.setState({event: "endedGetProfile"})
  }

  render() {

    switch(this.state.event) {
      case "beginGetProfile":

        return (
          <div className="spinner-parent">
            <Spinner></Spinner>
          </div>
        );

        break;

      case "endedGetProfile":
        
        let username = Utils.getFullName();
        
        return (
          <div className="home-content">
            <h1>Welcome {username} to Clock My Time</h1>
            <p>Please select a date a clock in</p>
    
            <Form className="form-calendar" onSubmit={this.onFormTimeSubmit} >
              
              <FormGroup>
                <Label>Date:</Label>
                <Input type="date" id="tf-date" name="date" value={this.state.date} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label>Time In:</Label>
                <Input type="time" id="tf-time-in" name="timeIn" value={this.state.timeIn} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label>Time Out:</Label>
                <Input type="time" id="tf-time-out" name="timeOut" value={this.state.timeOut}  onChange={this.handleChange} />
              </FormGroup>
              <div className="text-container">
              <Button type="submit">Submit</Button>
              </div>
            </Form>
          </div>
        );

        break;

      case "failGetProfile":
        return (<h1>Unauthorize</h1>);
        break;

      case "endedSubmitTime":
        return (
          <div className="text-container">
            <h1>The time has been submit successfully.</h1>
            <Button type="button" onClick={this.onSubmitAnotherButtonClick}>Submit Another</Button>
          </div>);
        break;

      case "failSubmitTime":
        return (
          <div className="text-container">
            <h1>Unable to submit the Time at the moment.</h1>
            <Button type="button" onClick={this.onTryAgainButtonClick}>Try Again</Button>
          </div>);
        break;
    }

    return (
      <div className="spinner-parent">
        <Spinner></Spinner>
      </div>
    );

  }
}

export default connect()(Home);
