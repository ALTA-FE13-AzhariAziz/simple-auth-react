import React, { Component, FormEvent } from "react";
import axios from "axios";

import Layout from "@/components/Layout";

import { Input } from "@/components/Input";

interface PropsType {}

interface StateType {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  loading: boolean;
}

export class Register extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      loading: false,
    };
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = {
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
    };
    axios
      .post("register", body)
      .then((response) => {
        const { data } = response;
        console.log(data);
      })
      .catch((error) => {
        alert(error.toString);
      });
  }

  render() {
    return (
      <Layout>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <div className="container flex flex-shrink-0 items-center justify-center">
            <div className="w-[50%]">
              <div className="card-body">
                <div className="form-control flex-row  justify-between">
                  <div className="form-control mr-5 w-1/2">
                    <label className="label">
                      <span className="label-text">First Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="input input-bordered"
                      onChange={(event) =>
                        this.setState({ firstname: event.target.value })
                      }
                    />
                  </div>
                  <div className="form-control w-1/2">
                    <label className="label">
                      <span className="label-text">Last Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="input input-bordered"
                      onChange={(event) =>
                        this.setState({ lastname: event.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered"
                    onChange={(event) =>
                      this.setState({ username: event.target.value })
                    }
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered"
                    onChange={(event) =>
                      this.setState({ password: event.target.value })
                    }
                  />
                </div>

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Layout>
    );
  }
}

export default Register;
