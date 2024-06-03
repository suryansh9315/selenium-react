import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ProgressBar } from "react-loader-spinner";

const App = () => {
  const [scapeResult, setScapeResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
      });
      const json = await res.json();
      setLoading(false);
      if (json.data === "error") {
        toast.error("Something went wrong!");
      } else {
        setScapeResult(json);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="bg-black text-white h-screen w-screen px-20 py-20 flex items-center justify-center">
        <ProgressBar
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen px-20 py-20 flex flex-col gap-5">
      <span
        className="cursor-pointer hover:text-blue-300 text-blue-400 transition-all duration-200"
        onClick={handleClick}
      >
        Click here to run the script
      </span>
      {scapeResult && (
        <div className="flex flex-col gap-1">
          <span className="mb-5">
            These are the most happening topics as on {scapeResult.data.date}
          </span>
          <div className="font-semibold text-2xl">
            {scapeResult.data.nameoftrend1}
          </div>
          <div className="font-semibold text-2xl">
            {scapeResult.data.nameoftrend2}
          </div>
          <div className="font-semibold text-2xl">
            {scapeResult.data.nameoftrend3}
          </div>
          <div className="font-semibold text-2xl">
            {scapeResult.data.nameoftrend4}
          </div>
          <div className="font-semibold text-2xl">
            {scapeResult.data.nameoftrend5}
          </div>
          <span className="my-5">
            The IP address used for this query was{" "}
            <span className="underline cursor-pointer">
              {scapeResult.data.ip}
            </span>
            .
          </span>
          <span className="mb-5">
            Here’s a JSON extract of this record from the MongoDB:
          </span>
          <div className="mb-5"><pre>{JSON.stringify(scapeResult, null, 2)}</pre></div>
          <span
            className="cursor-pointer hover:text-blue-300 text-blue-400 transition-all duration-200"
            onClick={handleClick}
          >
            Click here to run the script again
          </span>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default App;
