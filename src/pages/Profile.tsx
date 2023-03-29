import { Component, FormEvent } from "react";
import axios from "axios";

import Layout from "@/components/Layout";
import { Spinner } from "../components/Loading";
import { UserEdit } from "@/utils/types/user";

interface PropsType {}

interface StateType {
  data: Partial<UserEdit>;
  loading: boolean;
  isEdit: boolean;
  image: string;
  objSubmit: Partial<UserEdit>;
}

class Profile extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      objSubmit: {},
      image: "",
      data: {},
      loading: true,
      isEdit: false,
    };
  }

  componentDidMount(): void {
    this.fetchData();
  }

  fetchData() {
    axios
      .get("users/testing")
      .then((response) => {
        const { data } = response.data;
        this.setState({ data: data, image: data.image });
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      })
      .finally(() => this.setState({ loading: false }));
  }

  handleChange(value: string | File, key: keyof typeof this.state.objSubmit) {
    let temp = { ...this.state.objSubmit };
    temp[key] = value;
    this.setState({ objSubmit: temp });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    let key: keyof typeof this.state.objSubmit;
    for (key in this.state.objSubmit) {
      formData.append(key, this.state.objSubmit[key]);
    }
    axios
      .put("users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { data } = response;
        console.log(data);
        this.setState({ isEdit: false });
      })
      .catch((error) => alert(error.toString()))
      .finally(() => this.fetchData());
  }

  handleEditMode = () => {
    this.setState({ isEdit: !this.state.isEdit });
  };

  render() {
    // tulis destructuring dari state data agar penulisan code jadi lebih ringkas
    return (
      <Layout>
        <div className="hero-content flex-col sm:flex-row justify-around  items-center  h-full">
          <img
            src={this.state.image}
            alt={`${this.state.data.username}'s profile picture`}
            className=" max-w-xs rounded-lg shadow-2xl flex-1"
          />
          <div className="">
            {this.state.isEdit ? (
              <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Selec Image</span>
                    </label>
                    <input
                      type="file"
                      placeholder="Select Image"
                      className="file-input w-full max-w-xs"
                      onChange={(event) => {
                        if (!event.currentTarget.files) {
                          return;
                        }
                        this.setState({
                          image: URL.createObjectURL(
                            event.currentTarget.files[0]
                          ),
                        });
                        this.handleChange(
                          event.currentTarget.files[0],
                          "image"
                        );
                      }}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">First Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      defaultValue={this.state.data.first_name}
                      onChange={(event) =>
                        this.handleChange(event.target.value, "first_name")
                      }
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Last Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      defaultValue={this.state.data.last_name}
                      onChange={(event) =>
                        this.handleChange(event.target.value, "last_name")
                      }
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Username"
                      defaultValue={this.state.data.username}
                      onChange={(event) =>
                        this.handleChange(event.target.value, "username")
                      }
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      defaultValue={this.state.data.password}
                      onChange={(event) =>
                        this.handleChange(event.target.value, "password")
                      }
                      type="password"
                      placeholder="password"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div>
                <h1 className="text-5xl font-bold">
                  {this.state.data.first_name} {this.state.data.last_name}
                </h1>
                <p className="py-6">{this.state.data.username}</p>
              </div>
            )}

            <button
              className="btn btn-primary"
              id="button-edit"
              onClick={this.handleEditMode}
            >
              Edit
            </button>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Profile;
