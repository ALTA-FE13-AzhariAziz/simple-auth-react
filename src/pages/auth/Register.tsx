import React, { Component } from "react";
import Layout from "../../components/Layout";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Input } from "../../components/Input";

export class Register extends Component {
  render() {
    return (
      <Layout>
        <div className=" container">
          <div className="card-body flex-shrink-0">
            <div className="form-control flex-row  justify-between">
              <div className="form-control mr-5 w-1/2">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Retype Password</span>
              </label>
              <input
                type="password"
                placeholder="retype password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Register;
