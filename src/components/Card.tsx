import { Component } from "react";

interface Props {
  image: string;
  username: string;
  first_name: string;
  last_name: string;
}

class Card extends Component<Props> {
  render() {
    const { image, username, first_name, last_name } = this.props;

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
            {first_name} {last_name}
          </h2>
          <p>{username}</p>
          <div className="card-actions">
            <button className="btn btn-primary">Check Profile</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
