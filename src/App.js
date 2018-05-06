import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      serviceOrders: []
    };
  }
  componentDidMount() {
    axios.get('http://localhost:8086//orderplacement/serviceOrders')
        .then(res => {
          this.setState({ serviceOrders: res.data });
          console.log(this.state.serviceOrders);
        });
  }

  render() {
    return (
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">
                Order list
              </h3>
            </div>
            <div class="panel-body">
              <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>Place Order</Link></h4>
              <table class="table table-stripe">
                <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Customer name</th>
                  <th>Phone</th>
                  <th>Service type</th>
                </tr>
                </thead>
                <tbody>
                {this.state.serviceOrders.map(c =>
                    <tr>
                     <td><Link to={`/show/${c[0]}`}>{c[0]}</Link></td>
                      <td>{c[1]}</td>
                      <td>{c[2]}</td>
                      <td>{c[3]}</td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
