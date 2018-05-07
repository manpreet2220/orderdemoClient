import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navigation from "./Navigation";

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      serviceOrder: [],
      customer:[]
    }
    ;
  }

  componentDidMount() {
    axios.get('http://localhost:8086//orderplacement/serviceOrders/'+this.props.match.params.id)
      .then(res => {
        this.setState({ serviceOrder: res.data ,
        customer:res.data.customer});
        console.log(this.state.serviceOrder);
      });
  }

  delete(id){
    console.log(id);
    axios.delete('http://localhost:8086/orderplacement/serviceOrders/delete/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
             Order Details
            </h3>
          </div>
          <div class="panel-body">
          <Navigation/>

            <dl>
              <dt>Customer Name:</dt>
              <dd>{this.state.customer.name}</dd>
              <dt>Email:</dt>
              <dd>{this.state.customer.email}</dd>
              <dt>Phone number:</dt>
              <dd>{this.state.customer.phoneNumber}</dd>
              <dt>From address:</dt>
              <dd>{this.state.serviceOrder.fromAddress}</dd>
              <dt>To Address:</dt>
              <dd>{this.state.serviceOrder.toAddress}</dd>
              <dt>Service Type</dt>
              <dd>{this.state.serviceOrder.serviceType}</dd>
              <dt>Note:</dt>
              <dd>{this.state.serviceOrder.note}</dd>
              <dt>Service Date</dt>
              <dd>{this.state.serviceOrder.serviceDate}</dd>

            </dl>
            <Link to={`/edit/${this.state.serviceOrder.serviceOrderId}`} class="btn btn-info">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.serviceOrder.serviceOrderId)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
