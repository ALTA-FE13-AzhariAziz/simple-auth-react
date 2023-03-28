import { Component } from "react";

interface Props {
  type: string;
  placeholder: string;
}

export class Input extends Component<Props> {
  render() {
    const { type, placeholder } = this.props;

    return (
      <input
        className="input input-bordered input-primary w-full max-w-xs"
        {...this.props}
      />
    );
  }
}

export class TextArea extends Component {
  render() {
    return (
      <textarea
        className="border rounded-lg bg-slate-200 text-black p-2 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
        {...this.props}
      />
    );
  }
}
