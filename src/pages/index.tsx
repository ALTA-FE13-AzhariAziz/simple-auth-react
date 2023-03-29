import { Component } from "react";
import Card from "@/components/Card";
import axios from "axios";

import Layout from "@/components/Layout";
import { Spinner } from "@/components/Loading";
import { UserType } from "@/utils/types/user";

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
    // this.fetchAlternatif();
  }

  fetchData() {
    // let temp: UserType[] = [];
    // for (let i = 1; i <= 8; i++) {
    //   const obj = {
    //     id: i,
    //     first_name: "John",
    //     last_name: "Doe",
    //     username: `john_doe${i}`,
    //     image: "/images/portrait_oval.png",
    //   };
    //   temp.push(obj);
    // }
    // setTimeout(() => {
    //   // setState = updater, untuk merubah nilai dari sebuah state
    //   this.setState({
    //     datas: temp,
    //     loading: false,
    //   });
    // }, 1000);
    axios
      .get("users")
      .then((response) => {
        const { data } = response.data;
        this.setState({ datas: data });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      })
      .finally(() => this.setState({ loading: false }));
  }

  fetchAlternatif() {
    fetch(
      "https://virtserver.swaggerhub.com/devanada/hells-kitchen/1.1.0/users"
    )
      .then((result) => result.json())
      .then((response) => {
        const { data } = response;
        this.setState({ datas: data });
        console.log(data);
      })
      .catch((error) => {
        // Akan reject ketika server memberikan response failed ke Frontend
        console.log(error);
      })
      .finally(() => this.setState({ loading: false }));

    // Akan resolve ketika server dapat memberikan jawaban/response kepada Frontend
    // Akan reject ketika server tidak memberikan response sama sekali ke Frontend
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
