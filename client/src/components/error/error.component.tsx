import { Button } from "antd";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import { AlertOutlined, LeftOutlined } from "@ant-design/icons";

function ErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    if (error.status === 404)
      return (
        <section className="h-screen centered bg-primary">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
            <div className="mx-auto max-w-screen-sm text-center centered flex-col">
              <AlertOutlined className="w-3/4 h-auto" />
              <div className="space-y-6 -mt-6">
                <h1 className="text-white text-2xl lg:text-4xl">
                  Looks like we both got lost there!
                </h1>
                <Button className="rounded-lg" href="/">
                  Let me take you home
                </Button>
              </div>
            </div>
          </div>
        </section>
      );

    return (
      <div className="w-full h-screen flex flex-col items-center justify-center px-4">
        {error.status === 404 && <AlertOutlined />}
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 dark:text-casagray-100 mt-12">
            {error.status === 404 ? "Page Not Found" : error.data}
          </p>
          <p className="md:text-lg lg:text-xl text-casagray-600 dark:text-casagray-200 mt-8">
            {error.status === 404
              ? "Sorry, the page you are looking for could not be found."
              : "Sorry, An error Occured. You can not proceed."}
          </p>
          <Link
            to="/"
            className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-gray-100 px-4 py-2 mt-12 rounded transition duration-150"
            title="Return Home"
          >
            <LeftOutlined className="h-5 w-5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 dark:text-casagray-100 mt-12">
            Oops! Unexpected Error
          </p>
          <p className="md:text-lg lg:text-xl text-casagray-600 dark:text-casagray-200 mt-8">
            {error.message}
          </p>
          <div className="flex items-center gap-2  mt-12">
            <Link
              to="/"
              className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-gray-100 px-4 py-2 rounded transition duration-150"
              title="Return Home"
            >
              <LeftOutlined className="h-5 w-5" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 dark:text-casagray-100 mt-12">
            Oops! Unexpected Error
          </p>
          <p className="md:text-lg lg:text-xl text-casagray-600 dark:text-casagray-200 mt-8">
            Sorry, An error Occured please try again later.
          </p>
          <Link
            to="/"
            className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-gray-100 px-4 py-2 mt-12 rounded transition duration-150"
            title="Return Home"
          >
            <LeftOutlined className="h-5 w-5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
