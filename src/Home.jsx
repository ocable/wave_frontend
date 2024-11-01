import { useEffect, useState } from "react";
import {
  useGetSpectralDataQuery,
  useGetSignificantDataQuery,
  useGetSwellComponentDataQuery,
  useGetWindDataQuery,
  useGetGFSDataQuery,
} from "./pages/spectralSlice";

import Hourly from "./components/Hourly";

import { LineChart } from "@mui/x-charts/LineChart";

function Home() {
  const [timeIncrement, setTimeIncrement] = useState("today");
  const [hour, setHour] = useState(0);
  const [meridiem, setMeridiem] = useState("");

  const { data: spectralData, isLoading: spectralDataLoading } =
    useGetSpectralDataQuery();
  const { data: significantData, isLoading: significantDataLoading } =
    useGetSignificantDataQuery();
  const { data: swellComponentData, isLoading: swellComponentDataLoading } =
    useGetSwellComponentDataQuery();
  const { data: windData, isLoading: windDataLoading } = useGetWindDataQuery();
  useGetGFSDataQuery();
  const { data: GFSData, isLoading: GFSDataLoading } = useGetGFSDataQuery();

  const today = new Date();
  const currentHour = today.getHours();
  // for hourly render
  const hoursLeft = 24 - (currentHour + 1) + 23;
  console.log(currentHour);
  console.log(hoursLeft);
  const month = today.toLocaleString("en-US", { month: "long" });
  const day = today.toLocaleString("en-US", { weekday: "long" });
  const date = today.getDate();
  const currentWindData = windDataLoading ? null : windData[currentHour];
  const comp1 = swellComponentDataLoading ? null : swellComponentData[0];
  const comp2 = swellComponentDataLoading ? null : swellComponentData[1];
  const freq = [];
  if (!spectralDataLoading) {
    for (let i = 0; i < spectralData.frequencies.length; i++) {
      if (1 / spectralData.frequencies[i] < 20) {
        freq.push(1 / spectralData.frequencies[i]);
      }
    }
  }

  const denst = [];
  for (let i = 0; i < freq.length; i++) {
    denst.push(spectralData.densities[i]);
  }

  useEffect(() => {
    setHour(currentHour > 12 ? currentHour - 12 : currentHour);
    setMeridiem(currentHour >= 12 ? "PM" : "AM");
  }, []);

  let hoursArray = [];

  if (!GFSDataLoading && !windDataLoading) {
    for (let i = 0; i <= hoursLeft; i++) {
      hoursArray.push(
        <Hourly
          timeIncrement={timeIncrement}
          setTimeIncrement={setTimeIncrement}
          hour={hour + 1 + i > 12 ? hour + 1 + i -12 : hour + 1 + i}
          meridiem={hour + 1 + i >= 12 ? "AM" : "PM"}
          sig_height={GFSData[i].significant_wave_height}
          sig_period={GFSData[i].comp1_period}
          sig_dir={GFSData[i].comp1_dir}
          wind_speed={windData[currentHour + 1].speed}
          wind_dir={windData[currentHour + 1].direction}
        />
      );
    }
  }

  function degToCardinal(deg) {
    const dir = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const val = Math.round(deg / 22.5);
    return dir[val];
  }

  return (
    <div>
      {significantDataLoading ||
      swellComponentDataLoading ||
      spectralDataLoading ||
      windDataLoading ||
      GFSDataLoading ? (
        <div className="flex flex-col h-screen bg-gradient-to-r from-blue-400 from-43% to-blue-500"></div>
      ) : (
        <>
          <div className="flex flex-col max-h-svh bg-gradient-to-r from-blue-400 from-43% to-blue-500">
            <section className="flex flex-row justify-between mx-8 mt-12">
              <div>
                <h2 className="font-radio text-2xl font-bold text-blue-100">
                  Higgins Beach
                </h2>
                <p className="font-radio text-md font-normal text-blue-100">
                  {day}, {month} {date}
                </p>
              </div>
              <div className="flex flex-col w-36 h-20 drop-shadow-md bg-blue-200 rounded-3xl">
                <h3 className="self-center mt-2 font-radio font-bold text-xl text-blue-100">
                  {currentWindData.directionType}
                </h3>

                {/* windspeed */}
                <section className="flex flex-row mx-2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-blue-100 self-center mr-1 mb-1"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 5C7 2.79086 8.79086 1 11 1C13.2091 1 15 2.79086 15 5C15 7.20914 13.2091 9 11 9H3C2.44772 9 2 8.55228 2 8C2 7.44772 2.44772 7 3 7H11C12.1046 7 13 6.10457 13 5C13 3.89543 12.1046 3 11 3C9.89543 3 9 3.89543 9 5V5.1C9 5.65228 8.55228 6.1 8 6.1C7.44772 6.1 7 5.65228 7 5.1V5ZM16.9 6C16.9 5.44772 17.3477 5 17.9 5H18C20.2091 5 22 6.79086 22 9C22 11.2091 20.2091 13 18 13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H18C19.1046 11 20 10.1046 20 9C20 7.89543 19.1046 7 18 7H17.9C17.3477 7 16.9 6.55228 16.9 6ZM0 12C0 11.4477 0.447715 11 1 11H2C2.55228 11 3 11.4477 3 12C3 12.5523 2.55228 13 2 13H1C0.447715 13 0 12.5523 0 12ZM4 16C4 15.4477 4.44772 15 5 15H6C6.55228 15 7 15.4477 7 16C7 16.5523 6.55228 17 6 17H5C4.44772 17 4 16.5523 4 16ZM8 16C8 15.4477 8.44772 15 9 15H13C15.2091 15 17 16.7909 17 19C17 21.2091 15.2091 23 13 23C10.7909 23 9 21.2091 9 19V18.9C9 18.3477 9.44771 17.9 10 17.9C10.5523 17.9 11 18.3477 11 18.9V19C11 20.1046 11.8954 21 13 21C14.1046 21 15 20.1046 15 19C15 17.8954 14.1046 17 13 17H9C8.44772 17 8 16.5523 8 16Z"
                    />
                  </svg>
                  <h4 className="mr-1 font-radio font-semibold text-lg text-highlight">
                    {Math.round(currentWindData.speed)}
                  </h4>
                  <h5 className="font-radio font-semibold text-xs text-highlight self-center">
                    mph
                  </h5>

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 fill-blue-100 self-center mx-1 mb-0.5"
                  >
                    <path d="M15.94 7.61999L11.06 9.61999C10.7251 9.75225 10.421 9.95185 10.1664 10.2064C9.91185 10.461 9.71225 10.7651 9.57999 11.1L7.57999 15.98C7.54715 16.0636 7.54869 16.1567 7.58429 16.2392C7.61988 16.3216 7.68664 16.3866 7.76999 16.42C7.85065 16.4499 7.93934 16.4499 8.02 16.42L12.9 14.42C13.2348 14.2877 13.539 14.0881 13.7936 13.8336C14.0481 13.579 14.2477 13.2748 14.38 12.94L16.38 8.05999C16.4128 7.97643 16.4113 7.88326 16.3757 7.80082C16.3401 7.71839 16.2733 7.65338 16.19 7.61999C16.1093 7.59013 16.0207 7.59013 15.94 7.61999ZM12 13C11.8022 13 11.6089 12.9413 11.4444 12.8315C11.28 12.7216 11.1518 12.5654 11.0761 12.3827C11.0004 12.2 10.9806 11.9989 11.0192 11.8049C11.0578 11.6109 11.153 11.4327 11.2929 11.2929C11.4327 11.153 11.6109 11.0578 11.8049 11.0192C11.9989 10.9806 12.2 11.0004 12.3827 11.0761C12.5654 11.1518 12.7216 11.28 12.8315 11.4444C12.9413 11.6089 13 11.8022 13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13Z" />
                    <path d="M12 21C10.22 21 8.47991 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89472 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17294C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36628 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C21 14.387 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.387 21 12 21ZM12 4.5C10.5166 4.5 9.0666 4.93987 7.83323 5.76398C6.59986 6.58809 5.63856 7.75943 5.07091 9.12988C4.50325 10.5003 4.35473 12.0083 4.64411 13.4632C4.9335 14.918 5.64781 16.2544 6.6967 17.3033C7.7456 18.3522 9.08197 19.0665 10.5368 19.3559C11.9917 19.6453 13.4997 19.4968 14.8701 18.9291C16.2406 18.3614 17.4119 17.4001 18.236 16.1668C19.0601 14.9334 19.5 13.4834 19.5 12C19.5 10.0109 18.7098 8.10323 17.3033 6.6967C15.8968 5.29018 13.9891 4.5 12 4.5Z" />
                  </svg>
                  <h4 className="font-radio font-semibold text-md text-highlight self-center">
                    {Math.round(currentWindData.direction)}°
                  </h4>
                </section>
              </div>
            </section>

            <section className="flex flex-row">
              <h1 className="font-radio font-bold text-9xl text-blue-100 ml-8">
                {significantData.sig_wave_height.toFixed(1)}
              </h1>
              <h5 className="self-end font-radio font-bold text-2xl text-blue-100 mb-3">
                ft
              </h5>
            </section>

            <div className="flex flex-row h-24 w-10/12 drop-shadow-md bg-blue-300 rounded-3xl self-center pt-3 px-8 mt-4 justify-between">
              <section className="flex flex-col">
                <svg
                  viewBox="0 0 32 32"
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 fill-blue-100 self-center mx-2 mb-2"
                >
                  <path
                    d="M22,30H17a7.0078,7.0078,0,0,1-7-7,6.6832,6.6832,0,0,1,2.0244-4.6967A6.7935,6.7935,0,0,0,10.0093,18C5.0425,18.0466,4,24.5513,4,30H2C2,18.4907,6.3452,16.0342,9.9907,16a10.0717,10.0717,0,0,1,4.4785,1.117,1,1,0,0,1,.0616,1.73A4.8773,4.8773,0,0,0,17,28h5Z"
                    transform="translate(0 0)"
                  />
                  <rect x="17" y="8" width="2" height="8" />
                  <path
                    d="M28,5.4141,26.5859,4,24.3242,6.2617A9.95,9.95,0,0,0,19,4.0508V2H17V4.0508A10.0132,10.0132,0,0,0,8,14h2a8,8,0,1,1,8,8v2A9.9928,9.9928,0,0,0,25.7383,7.6758Z"
                    transform="translate(0 0)"
                  />
                </svg>
                <section className="flex flex-row">
                  <h4 className="font-radio font-semibold text-3xl text-highlight self-center">
                    {Math.round(significantData.period)}
                  </h4>
                  <p className="font-radio font-semibold text-xs text-highlight self-end ml-1 mb-1">
                    sec
                  </p>
                </section>
              </section>
              <section className="flex flex-col">
                <svg
                  viewBox="0 0 32 32"
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 fill-blue-100 self-center mx-2 mb-2"
                >
                  <path
                    d="M22,30H17a7.0078,7.0078,0,0,1-7-7,6.6832,6.6832,0,0,1,2.0244-4.6967A6.7126,6.7126,0,0,0,10.0093,18C5.0425,18.0466,4,24.5513,4,30H2C2,18.4907,6.3452,16.0342,9.9907,16a10.0962,10.0962,0,0,1,4.4785,1.117,1,1,0,0,1,.0616,1.73A4.8773,4.8773,0,0,0,17,28h5Z"
                    transform="translate(0 0)"
                  />
                  <path
                    d="M18,24V22a8,8,0,1,0-8-8H8A10,10,0,1,1,18,24Z"
                    transform="translate(0 0)"
                  />
                  <circle cx="18" cy="8" r="1" />
                  <path
                    d="M23,17.5859l-2.3-2.3007A2.9665,2.9665,0,0,0,21,14a3.0033,3.0033,0,0,0-3-3,2.9609,2.9609,0,0,0-1.2854.3008L14.4141,9,13,10.4141l2.3,2.3007A2.9665,2.9665,0,0,0,15,14a3.0033,3.0033,0,0,0,3,3,2.9609,2.9609,0,0,0,1.2854-.3008L21.5859,19ZM17,14a1,1,0,1,1,1,1A1.0009,1.0009,0,0,1,17,14Z"
                    transform="translate(0 0)"
                  />
                </svg>
                <h4 className="font-radio font-semibold text-3xl text-highlight self-center">
                  {degToCardinal(significantData.direction)}°
                </h4>
              </section>
              <section className="flex flex-col">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 fill-blue-100 self-center mt-1 mb-2"
                >
                  <path d="M19,8H14.724l3.144-5.5A1,1,0,0,0,17,1H10a1,1,0,0,0-.895.553l-5,10A1,1,0,0,0,5,13H9.656L7.042,21.713a1,1,0,0,0,1.722.933l11-13A1,1,0,0,0,19,8Zm-8.663,9.689,1.621-5.4A1,1,0,0,0,11,11H6.618l4-8h4.658L12.132,8.5A1,1,0,0,0,13,10h3.844Z" />
                </svg>
                <section className="flex flex-row">
                  <h4 className="font-radio font-semibold text-3xl text-highlight self-center">
                    {Math.round(significantData.energy)}
                  </h4>
                  <p className="font-radio font-semibold text-xs text-highlight self-end ml-1 mb-1">
                    kJ
                  </p>
                </section>
              </section>
            </div>

            <section className="flex flex-row justify-between mx-8 mt-4">
              <section className="flex flex-col items-center">
                <h3
                  className={`"font-radio font-normal" + ${
                    timeIncrement === "today"
                      ? "text-highlight"
                      : "text-blue-100"
                  }`}
                >
                  Today
                </h3>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`"w-5 h-5 fill-highlight self-start" + ${
                    timeIncrement === "today" ? "visible" : "invisible"
                  }`}
                >
                  <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" />
                </svg>
              </section>

              <section className="flex flex-col items-center">
                <h3
                  className={`"font-radio font-normal" + ${
                    timeIncrement === "tomorrow"
                      ? "text-highlight"
                      : "text-blue-100"
                  }`}
                >
                  Tomorrow
                </h3>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`"w-5 h-5  fill-highlight self-start" + ${
                    timeIncrement === "tomorrow" ? "visible" : "invisible"
                  }`}
                >
                  <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" />
                </svg>
              </section>

              <section className="flex flex-col items-center">
                <h3
                  className={`"font-radio font-normal" + ${
                    timeIncrement === "3days"
                      ? "text-highlight"
                      : "text-blue-100"
                  }`}
                >
                  Next 3 Days
                </h3>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`"w-5 h-5 fill-highlight self-start" + ${
                    timeIncrement === "3days" ? "visible" : "invisible"
                  }`}
                >
                  <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" />
                </svg>
              </section>

              <section className="flex flex-col items-center">
                <h3
                  className={`"font-radio font-normal" + ${
                    timeIncrement === "week"
                      ? "text-highlight"
                      : "text-blue-100"
                  }`}
                >
                  Week
                </h3>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`"w-5 h-5 fill-highlight self-start" + ${
                    timeIncrement === "week" ? "visible" : "invisible"
                  }`}
                >
                  <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" />
                </svg>
              </section>
            </section>

            <section className="flex flex-col mx-8 mb-20 h-min-full overflow-auto">
              {hoursArray.map((hour) => hour)}
            </section>
          </div>
        </>
      )}
    </div>
  );
}
export default Home;
