import { FC, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Spinner } from "../components/Loading";
import { UserEdit } from "@/utils/types/user";
import Layout from "@/components/Layout";

const Profile: FC = () => {
  const [objSubmit, setObjSubmit] = useState<Partial<UserEdit>>({});
  const [data, setData] = useState<Partial<UserEdit>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    const { username } = params;
    console.log(username);
    axios
      .get(`users/${username}`)
      .then((response) => {
        const { data } = response.data;
        document.title = `${data.username} | User Management`;
        setData(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  }

  function handleChange(value: string | File, key: keyof typeof objSubmit) {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    let key: keyof typeof objSubmit;
    for (key in objSubmit) {
      formData.append(key, objSubmit[key]);
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
        setIsEdit(false);
      })
      .catch((error) => alert(error.toString()))
      .finally(() => fetchData());
  }

  const handleEditMode = () => {
    console.log(isEdit);
    setIsEdit(!isEdit);
  };

  // tulis destructuring dari state data agar penulisan code jadi lebih ringkas
  return (
    <Layout>
      <div className="hero-content flex-col sm:flex-row justify-around  items-center  h-full">
        <img
          src={data.image}
          alt={`${data.username}'s profile picture`}
          className=" max-w-xs rounded-lg shadow-2xl flex-1"
        />
        <div className="">
          {isEdit ? (
            <form onSubmit={(event) => handleSubmit(event)}>
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
                      setData({
                        ...data,
                        image: URL.createObjectURL(
                          event.currentTarget.files[0]
                        ),
                      });
                      handleChange(event.currentTarget.files[0], "image");
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
                    defaultValue={data.first_name}
                    onChange={(event) =>
                      handleChange(event.target.value, "first_name")
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
                    defaultValue={data.last_name}
                    onChange={(event) =>
                      handleChange(event.target.value, "last_name")
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
                    defaultValue={data.username}
                    onChange={(event) =>
                      handleChange(event.target.value, "username")
                    }
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    defaultValue={data.password}
                    onChange={(event) =>
                      handleChange(event.target.value, "password")
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
                <button
                  className="btn btn-primary"
                  id="button-edit"
                  onClick={handleEditMode}
                >
                  Back
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h1 className="text-5xl font-bold">
                {data.first_name} {data.last_name}
              </h1>
              <p className="py-6">{data.username}</p>
              <button
                className="btn btn-primary"
                id="button-edit"
                onClick={handleEditMode}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
