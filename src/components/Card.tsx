import withRouter, { NavigateParam } from "@/utils/navigation";
import { Component } from "react";
import { Link } from "react-router-dom";
import { FC } from "react";

interface Props extends NavigateParam {
  image: string;
  username: string;
  first_name: string;
  last_name: string;
}

const Card: FC<Props> = (props) => {
  const { image, username, first_name, last_name } = props;

  return (
    <div className="card w-60 bg-base-100 shadow-xl mb-10 mt-10">
      <figure className="px-10 pt-10">
        <img
          src={image}
          alt={`${username}'s picture`}
          className="rounded-xl w-48"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          <Link to={`profile/${username}`}>
            {first_name} {last_name}{" "}
          </Link>
        </h2>
        <p>{username}</p>
        <div className="card-actions">
          <button
            onClick={() => props.navigate(`/profile/${username}`)}
            className="btn btn-primary"
          >
            Check Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Card);
