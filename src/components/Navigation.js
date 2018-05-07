import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {

  }

  render() {
    return (
        <p>
          <h4><Link to="/">
            <button className="btn btn-info">Back to main page</button>
          </Link>&nbsp;
            <Link to="/create">
              <button className="btn btn-info">Place Order</button>
            </Link></h4>
        </p>
    );
  }
}

export default Navigation;
