import { Component } from "react";
import Card from "../components/Card";

import Layout from "../components/Layout";
import { Spinner } from "../components/Loading";
import { UserType } from "../utils/types/user";

interface PropsType {}

interface StateType {
  datas: UserType[];
  loading: boolean;
}

class Home extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      datas: [],
      loading: true,
    };
  }

  componentDidMount(): void {
    this.fetchData();
  }

  fetchData() {
    let temp: UserType[] = [];
    for (let i = 1; i <= 8; i++) {
      const obj = {
        id: i,
        first_name: "John",
        last_name: "Doe",
        username: `john_doe${i}`,
        image: "/images/portrait_oval.png",
      };
      temp.push(obj);
    }
    setTimeout(() => {
      // setState = updater, untuk merubah nilai dari sebuah state
      this.setState({
        datas: temp,
        loading: false,
      });
    }, 1000);
  }

  render() {
    return (
      <Layout>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {this.state.loading ? (
            <Spinner />
          ) : (
            this.state.datas.map((data, index) => {
              return (
                <Card
                  key={data.id} // <~~ wajib ada sebagai pengenal satu sama lain
                  first_name={data.first_name}
                  last_name={data.last_name}
                  username={data.username}
                  image={data.image}
                />
              );
            })
          )}
        </div>
      </Layout>
    );
  }
}

export default Home;
