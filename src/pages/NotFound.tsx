import { FC } from "react";

import Layout from "@/components/Layout";

const NotFound: FC = () => {
  return (
    <Layout>
      <div className="hero  min-h-full bg-base-200">
        <div id="error-page" className="hero-content text-center">
          <div className="max-w-md">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>Page not found</i>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
