import { Component, ReactNode } from "react";

import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

class Layout extends Component<Props> {
  render() {
    return (
      <div className="w-full h-screen overflow-auto flex flex-col text-slate-600 bg-slate-200 dark:bg-slate-600 transition-all">
        <Navbar />
        <div className="h-full p-3">{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;
