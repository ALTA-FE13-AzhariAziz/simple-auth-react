import { Component } from "react";

import Layout from "../components/Layout";

class Home extends Component {
  render() {
    return (
      <Layout>
        <p className="text-3xl font-bold">Homepage</p>
        <button>Button</button>
      </Layout>
    );
  }
}

export default Home;
