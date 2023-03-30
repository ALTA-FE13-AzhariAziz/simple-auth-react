import {
  FaSignInAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
// import { Menu, Transition } from "@headlessui/react";
import { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import withRouter from "@/utils/navigation";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost normal-case text-xl">
            daisyUI
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/images/shutterstock_796346011@2x.png" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/profile/testing"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link to={"/Login"}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
