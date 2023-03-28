import { Component } from "react";

import Layout from "../components/Layout";
import { Spinner } from "../components/Loading";
import { UserType } from "../utils/types/user";

interface PropsType {}

interface StateType {
  data: UserType;
}

class Profile extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      data: {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        username: "john_doe1",
        image: "images/shutterstock_796346011@2x.png",
      },
    };
  }

  render() {
    // tulis destructuring dari state data agar penulisan code jadi lebih ringkas
    return (
      <Layout>
        <div className="hero-content flex-col sm:flex-row justify-around  items-center  h-full">
          <img
            src={this.state.data.image}
            className=" max-w-xs rounded-lg shadow-2xl flex-1"
          />
          <div className="">
            <h1 className="text-5xl font-bold">
              {this.state.data.first_name} {this.state.data.last_name}
            </h1>
            <p className="py-6">{this.state.data.username}</p>
            <button className="btn btn-primary">Edit</button>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Profile;
