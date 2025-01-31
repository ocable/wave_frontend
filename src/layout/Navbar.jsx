import { useNavigate } from "react-router-dom";

export default function Navbar({ activePage, setActivePage }) {
  const navigate = useNavigate();

  const navHome = () => {
    setActivePage("/");
    navigate("/");
  };

  const navBuoy = () => {
    setActivePage("/buoy");
    navigate("/buoy");
  };

  const navWeather = () => {
    setActivePage("/weather");
    navigate("/weather");
  };
  // console.log(activePage);

  return (
    <div className="flex flex-row fixed w-full justify-between h-14 pb-1 bg-blue-300 bottom-0 shadow-inner">
      <section
        className="flex flex-col items-center w-8 ml-10 mt-2"
        onClick={navHome}
      >
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={`"w-10 h-10" + ${
            activePage === "/" ? "fill-highlight" : "fill-blue-100"
          }`}
        >
          <path d="M8,11a1,1,0,0,1,1-1h6a1,1,0,0,1,0,2H9A1,1,0,0,1,8,11ZM21.832,9.555A1,1,0,0,1,21,10H20V21a1,1,0,0,1-.293.707,60.628,60.628,0,0,1-.318.214A.99.99,0,0,1,19,22H5a1,1,0,0,1-1-1V10H3a1.054,1.054,0,0,1-.829-.441l0,0a1,1,0,0,1,.278-1.387L6,5.8V3A1,1,0,0,1,8,3V4.465l3.445-2.3h0A1,1,0,0,1,12,2h0a1,1,0,0,1,.555.168l8.249,5.5.75.5A1,1,0,0,1,21.832,9.555ZM14,16H10v4h4Zm4-7.8-6-4-6,4V20H8V15a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v5h2Z" />
        </svg>
        <p
          className={`"font-radio font-normal" + ${
            activePage === "/"
              ? "text-highlight font-radio font-semibold"
              : "text-blue-100 font-radio font-semibold"
          }`}
        >
          Home
        </p>
      </section>
      <section
        className="flex flex-col items-center w-8 mx-8 mt-2"
        onClick={navBuoy}
      >
        <svg
          viewBox="0 0 32 32"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          className={`"w-10 h-10" + ${
            activePage === "/buoy" ? "fill-highlight" : "fill-blue-100"
          }`}
        >
          <path
            d="M28,22a3.4376,3.4376,0,0,1-3.0513-2.3164,1,1,0,0,0-1.8955-.0049A3.44,3.44,0,0,1,20,22a3.4376,3.4376,0,0,1-3.0513-2.3164A1.007,1.007,0,0,0,16,19a.9894.9894,0,0,0-.9468.6787A3.44,3.44,0,0,1,12,22a3.4376,3.4376,0,0,1-3.0513-2.3164A1.007,1.007,0,0,0,8,19a.971.971,0,0,0-.9468.6787A3.44,3.44,0,0,1,4,22H2v2H4a4.9316,4.9316,0,0,0,4-1.9873,5.5965,5.5965,0,0,0,1,.9912,7,7,0,0,0,14,0,5.5965,5.5965,0,0,0,1-.9912A4.9316,4.9316,0,0,0,28,24h2V22ZM16,28a5.0021,5.0021,0,0,1-4.9075-4.0854A5.2252,5.2252,0,0,0,12,24a4.9316,4.9316,0,0,0,4-1.9873A4.9316,4.9316,0,0,0,20,24a5.2252,5.2252,0,0,0,.9075-.0854A5.0021,5.0021,0,0,1,16,28Z"
            transform="translate(0 0)"
          />
          <path
            d="M20.07,7.8345A2.0116,2.0116,0,0,0,18.0771,6H17V2H15V6H13.9175a1.9949,1.9949,0,0,0-1.9859,1.7715L10.2805,19h2.021l.7346-5h5.9212l.7351,5h2.021ZM13.33,12l.5877-4,4.167.0625L18.6633,12Z"
            transform="translate(0 0)"
          />
        </svg>
        <p
          className={`"font-radio font-normal" + ${
            activePage === "/buoy"
              ? "text-highlight font-radio font-semibold"
              : "text-blue-100 font-radio font-semibold"
          }`}
        >
          Buoy
        </p>
      </section>
      <section
        className="flex flex-col items-center w-8 mr-10 mt-2"
        onClick={navWeather}
      >
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={`"w-10 h-10" + ${
            activePage === "/weather" ? "fill-highlight" : "fill-blue-100"
          }`}
        >
          <g id="Artwork">
            <path d="M12,8.48A3.52,3.52,0,1,1,8.48,12,3.53,3.53,0,0,1,12,8.48M12,7a5,5,0,1,0,5,5,5,5,0,0,0-5-5Z" />
            <path d="M12,22a.76.76,0,0,1-.75-.75V18.67a.75.75,0,0,1,1.5,0v2.58A.76.76,0,0,1,12,22Z" />
            <path d="M22,12a.76.76,0,0,1-.75.75H18.67a.75.75,0,0,1,0-1.5h2.58A.76.76,0,0,1,22,12Z" />
            <path d="M6.08,12a.76.76,0,0,1-.75.75H2.75a.75.75,0,0,1,0-1.5H5.33A.76.76,0,0,1,6.08,12Z" />
            <path d="M12,6.08a.76.76,0,0,1-.75-.75V2.75a.75.75,0,0,1,1.5,0V5.33A.76.76,0,0,1,12,6.08Z" />
            <path d="M4.92,19.07a.75.75,0,0,1,0-1.06l1.82-1.82a.74.74,0,0,1,1.06,0,.75.75,0,0,1,0,1.06L6,19.07A.75.75,0,0,1,4.92,19.07Z" />
            <path d="M19.06,19.07a.75.75,0,0,1-1.06,0l-1.82-1.82a.75.75,0,0,1,1.06-1.06L19.06,18A.75.75,0,0,1,19.06,19.07Z" />
            <path d="M7.8,7.81a.75.75,0,0,1-1.06,0L4.92,6a.75.75,0,0,1,0-1.06A.74.74,0,0,1,6,4.93L7.8,6.75A.75.75,0,0,1,7.8,7.81Z" />
            <path d="M16.18,7.81a.74.74,0,0,1,0-1.06L18,4.93a.74.74,0,0,1,1.06,0,.75.75,0,0,1,0,1.06L17.24,7.81A.75.75,0,0,1,16.18,7.81Z" />
          </g>
        </svg>
        <p
          className={`"font-radio font-normal" + ${
            activePage === "/weather"
              ? "text-highlight font-radio font-semibold"
              : "text-blue-100 font-radio font-semibold"
          }`}
        >
          Weather
        </p>
      </section>
    </div>
  );
}
