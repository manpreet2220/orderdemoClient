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
  compenentDid

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
                Order Placement application
              </h3>
            </div>
            <div class="panel-body">

              <h4><Link to="/create"><button class="btn btn-info">Place Order</button></Link></h4>
              <br/>
              <div className="panel-heading">
                <h3 className="panel-title">
                  List of all orders
                </h3>
              </div>
              <table class="table table-stripe table-bordered">
                <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Customer name</th>
                  <th>Phone</th>
                  <th>Service type</th>
                  <th>From Address</th>
                  <th>To Address</th>
                  <th>View order</th>
                </tr>
                </thead>
                <tbody>
                {this.state.serviceOrders.map(c =>
                    <tr>
                     <td>{c[0]}</td>
                      <td>{c[1]}</td>
                      <td>{c[2]}</td>
                      <td>{c[3]}</td>
                      <td>{c[4]}</td>
                      <td>{c[5]}</td>
                      <td><Link to={`/show/${c[0]}`}>View</Link> <a href="#" onClick={this.delete.bind(this, c[0])}>Delete</a></td>


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
