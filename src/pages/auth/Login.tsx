import { Component, FormEvent } from "react";
import axios from "axios";

import Layout from "../../components/Layout";
import { LockClosedIcon } from "@heroicons/react/20/solid";

interface PropsType {}

interface StateType {
  username: string;
  password: string;
  loading: boolean;
}

class Login extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
    };
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post("login", body)
      .then((response) => {
        const { data } = response;
        console.log(data);
      })
      .catch((error) => {
        alert(error.toString());
      });
  }

  render() {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={(event) => this.handleSubmit(event)}>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered"
                    onChange={(event) =>
                      this.setState({
                        username: event.target.value,
                      })
                    }
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
                    onChange={(event) =>
                      this.setState({
                        password: event.target.value,
                      })
                    }
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={
                      this.state.username === "" || this.state.password === ""
                    }
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
