import { FC, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { RootState } from "@/utils/types/redux";
import Layout from "@/components/Layout";
import { useTitle } from "@/utils/hooks";

interface ObjSubmitType {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}

const Register: FC = () => {
  const { token, uname } = useSelector((state: RootState) => state.data);

  const [objSubmit, setObjSubmit] = useState<ObjSubmitType>({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
  });

  const navigate = useNavigate();
  useTitle("Login | User Management");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(objSubmit);
    axios
      .post("register", objSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { data } = response;
        console.log(data);
        alert(data.message);
        navigate("/Login");
      })
      .catch((error) => {
        alert(error.toString);
      });
  }

  return (
    <Layout>
      <form onSubmit={(event) => handleSubmit(event)}>
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
                      setObjSubmit({
                        ...objSubmit,
                        firstname: event.target.value,
                      })
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
                      setObjSubmit({
                        ...objSubmit,
                        lastname: event.target.value,
                      })
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
                    setObjSubmit({ ...objSubmit, username: event.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  onChange={(event) =>
                    setObjSubmit({ ...objSubmit, password: event.target.value })
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
};

export default Register;
