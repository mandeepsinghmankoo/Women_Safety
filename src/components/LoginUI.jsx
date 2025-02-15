import axios from "axios";

function App() {
  const handleCam1Click = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/start-camera", {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Server Error:", error.response.status, error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Network Error: No response from server.");
      } else {
        // Other errors
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="btns flex flex-wrap">
      <button
        className="m-20 bg-gray-300 w-1/3 flex justify-center items-center h-52 rounded-xl text-3xl font-bold shadow-md shadow-white transition-all duration-300 hover:w-[35%]"
        onClick={handleCam1Click}
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
  );
}

export default App;
