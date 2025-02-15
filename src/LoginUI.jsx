import axios from "axios";

function App() {
  const handleCam1Click = () => {
    axios.get("http://127.0.0.1:5000/start-camera")
      .then(response => console.log(response.data))
      .catch(error => console.error("Error:", error));
  };

  return (
    <>
      <div className="btns flex flex-wrap">
        <button
          className="m-20 bg-gray-300 w-1/3 flex justify-center items-center h-52 rounded-xl text-3xl font-bold shadow-md shadow-white transition-all duration-300 hover:w-[35%]"
          onClick={handleCam1Click}  // 👈 Added event handler
        >
          Cam 1
        </button>
        <button className="m-20 bg-gray-300 w-1/3 flex justify-center items-center h-52 rounded-xl text-3xl font-bold shadow-md shadow-white transition-all duration-300 hover:w-[35%]">
          Cam 2
        </button>
        <button className="m-20 bg-gray-300 w-1/3 flex justify-center items-center h-52 rounded-xl text-3xl font-bold shadow-md shadow-white transition-all duration-300 hover:w-[35%]">
          Cam 3
        </button>
        <button className="m-20 bg-gray-300 w-1/3 flex justify-center items-center h-52 rounded-xl text-3xl font-bold shadow-md shadow-white transition-all duration-300 hover:w-[35%]">
          Cam 4
        </button>
      </div>
    </>
  );
}

export default App;
