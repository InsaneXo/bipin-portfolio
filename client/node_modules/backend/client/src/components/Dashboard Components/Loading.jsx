import React from "react";


const Loading = () => {
  return (
    <div className="h-screen flex-1 flex flex-col items-center justify-center gap-2 ">
      <div className="loader"></div>
      <h1 className="font-medium">Please Wait</h1>
      <p className="text-sm text-center">Just Wait For a Second...</p>
    </div>
  );
};

export default Loading;
