import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const querystring = require('querystring');

const serviceTypes = [
  'Moving',
  'Packing',
  'Cleaning'
];

class Create extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      fromAddress: '',
      toAddress: '',
      phone: '',
      email: '',
      serviceDate: new Date(),
      serviceType: '',
      note: '',
      serviceTypesValues: []
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {name, fromAddress, toAddress, phone, email, serviceDate, serviceType, note,serviceTypesValues} = this.state;
    axios.post('http://localhost:8086/orderplacement/save',
        querystring.stringify(
            {
              'name': name,
              'fromAddress': fromAddress,
              'toAddress': toAddress,
              'phone': phone,
              'email': email,
              'serviceDate': serviceDate,
              'serviceTypes': serviceTypesValues,
              'note': note,
            }
            )
    )
        .then((result) => {
          this.props.history.push("/")
        });
  }

  handleDateChange = (event, value) => {
    this.setState({
      serviceDate: new Date(value)
    });
  };
  handleChange = (event, index, serviceTypesValues) => this.setState({serviceTypesValues});

  menuItems(serviceTypesValues) {
    return serviceTypes.map((serviceType) => (
        <MenuItem
            key={serviceType}
            insetChildren={true}
            checked={serviceTypesValues && serviceTypesValues.indexOf(serviceType) > -1}
            value={serviceType}
            primaryText={serviceType}
        />
    ));
  }

  render() {
    const {name, fromAddress, toAddress, phone, email, serviceDate, serviceType, note,serviceTypesValues} = this.state;
    return (
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">
                Place Order
              </h3>
            </div>
            <div class="panel-body">
              <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Contacts List</Link>
              </h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-row">
                  <div class="form-group col-md-4">
                    <label for="name">Name:</label>
                    <input type="text" class="form-control" name="name" value={name} onChange={this.onChange}
                           placeholder="Name"/>
                  </div>
                  <div className="form-group col-md-4">
                    <label for="phone">Phone:</label>
                    <input type="text" className="form-control" name="phone" value={phone} onChange={this.onChange}
                           placeholder="Phone Number"/>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label for="email">Email:</label>
                    <input type="email" className="form-control" name="email" value={email} onChange={this.onChange}
                           placeholder="Email Address"/>
                  </div>
                  <div className="form-group col-md-4">
                    <label for="serviceDate">Service date</label>
                    <MuiThemeProvider>
                      <DatePicker
                          onChange={this.handleDateChange}
                          autoOk={true}
                          hintText="Date"
                          value={serviceDate}
                          className="time-options-picker"
                      /></MuiThemeProvider>
                  </div>
                </div>

                <div className="form-group">
                  <label for="fromAddress">From Address:</label>
                  <input type="text" class="form-control" name="fromAddress" value={fromAddress}
                         onChange={this.onChange}
                         placeholder="From Address"/>
                </div>
                <div className="form-group">
                  <label for="toAddress">To Address:</label>
                  <input type="text" class="form-control" name="toAddress" value={toAddress} onChange={this.onChange}
                         placeholder="To Address"/>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-3">
                    <label for="serviceType">Service type:</label>
                    <MuiThemeProvider>
                      <SelectField
                          multiple={true}
                          floatingLabelText="Service type"
                          value={serviceTypesValues}
                          onChange={this.handleChange}
                      >
                        {this.menuItems(this.state.serviceTypesValues)}
                      </SelectField> </MuiThemeProvider>
                  </div>
                  <div className="form-group col-md-4">
                    <label for="note">Note</label>
                    <input type="text" className="form-control" name="note" value={note} onChange={this.onChange}
                           placeholder="Note"/>
                  </div>
                </div>

                <button type="submit" class="btn btn-default">Submit</button>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default Create;
