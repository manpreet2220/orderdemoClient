import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navigation from "./Navigation";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const querystring = require('querystring');
const serviceTypes = [
  'Moving',
  'Packing',
  'Cleaning'
];

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      serviceOrder: [],
      customer: [],
      serviceTypesValues: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8086//orderplacement/serviceOrders/' + this.props.match.params.id)
        .then(res => {
          this.setState({
            serviceOrder: res.data,
            customer: res.data.customer,
            serviceTypesValues: res.data.serviceType
          });
          console.log(this.state.serviceOrder);
        });
  }

  onChangeCustomer = (e) => {
    const state = this.state.customer
    state[e.target.name] = e.target.value;
    this.setState({customer: state});
  }
  onChangeServiceOrder = (e) => {
    const serviceOrderstate = this.state.serviceOrder
    serviceOrderstate[e.target.name] = e.target.value;
    this.setState({serviceOrder: serviceOrderstate});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {fromAddress, toAddress, serviceDate, serviceType, note, serviceTypesValues} = this.state.serviceOrder;
    const {name, phone, email} = this.state.customer;

    axios.put('http://localhost:8086//orderplacement/serviceOrders/' + this.props.match.params.id,
        querystring.stringify(
            {
              'name': name,
              'phone': phone,
              'email': email,
              'fromAddress': fromAddress,
              'toAddress': toAddress,
              'serviceDate': serviceDate,
              'serviceTypes': serviceTypesValues,
              'note': note
            }))
        .then((result) => {
          this.props.history.push("/show/" + this.props.match.params.id)
        });
  }
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
    return (
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">
                Edit order
              </h3>&nbsp;
            </div>
            <div class="panel-body">
              <Navigation/>
              <form onSubmit={this.onSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" name="name" value={this.state.customer.name}
                           onChange={this.onChangeCustomer}
                           placeholder="Name"/>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" className="form-control" name="phone" value={this.state.customer.phoneNumber}
                           onChange={this.onChangeCustomer}
                           placeholder="Phone Number"/>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" name="email" value={this.state.customer.email}
                           onChange={this.onChangeCustomer}
                           placeholder="Email Address"/>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="serviceDate">Service date</label>
                    <input type="text" className="form-control" name="serviceDate"
                           value={this.state.serviceOrder.serviceDate}
                           onChange={this.onChangeServiceOrder}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="fromAddress">From Address:</label>
                  <input type="text" className="form-control" name="fromAddress"
                         value={this.state.serviceOrder.fromAddress}
                         onChange={this.onChangeServiceOrder}
                         placeholder="From Address"/>
                </div>
                <div className="form-group">
                  <label htmlFor="toAddress">To Address:</label>
                  <input type="text" className="form-control" name="toAddress" value={this.state.serviceOrder.toAddress}
                         onChange={this.onChangeServiceOrder}
                         placeholder="To Address"/>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <MuiThemeProvider>
                    <label htmlFor="serviceType">Service type:</label><br/>
                      <SelectField
                          multiple={true}
                          value={this.state.serviceOrder.serviceType}
                          onChange={this.handleChange}
                      >
                        {this.menuItems(this.state.serviceTypesValues)}
                      </SelectField> </MuiThemeProvider>
                  </div>


                  <div className="form-group col-md-4">
                    <label htmlFor="note">Note</label>
                    <input type="text" className="form-control" name="note"
                           value={this.state.serviceOrder.note} onChange={this.onChangeServiceOrder}
                           placeholder="Note"/>
                  </div>
                </div>

                <button type="submit" className="btn btn-info">Update</button>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default Edit;
