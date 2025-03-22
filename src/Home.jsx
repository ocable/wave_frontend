import { useEffect, useState } from "react";
import {
  useGetSpectralDataQuery,
  useGetSignificantDataQuery,
  useGetSwellComponentDataQuery,
  useGetWindDataQuery,
  useGetGFSDataQuery,
} from "./pages/spectralSlice";

import SignificantWidget from "./components/SignificantWidget";
import Hourly from "./components/Hourly";
import WindWidget from "./components/WindWidget";
import SwellComponentWidget from "./components/SwellComponentWidget";
import FrequencySpectra from "./components/FrequencySpectra";
import DirectionalSpectra from "./components/DirectionalSpectra";

import { LineChart } from "@mui/x-charts/LineChart";
import { current } from "@reduxjs/toolkit";

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
  console.log("current hour:", currentHour);
  // for hourly render
  const hoursleftDay = 24 - currentHour;
  // console.log(currentHour);
  // console.log(hoursLeft);
  const month = today.toLocaleString("en-US", { month: "short" });
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

  useEffect(() => {
    setHour(currentHour > 12 ? currentHour - 12 : currentHour);
    setMeridiem(currentHour >= 12 ? "PM" : "AM");
    console.log("meridiem:", meridiem);
  }, []);

  let hoursDay = [];
  let hoursTomorrow = [];
  let nextThreeDays = [];
  let nextWeek = [];

  if (!GFSDataLoading && !windDataLoading) {
    const cycle = GFSData[0].hour;
    console.log("cycle:", cycle);

    hourlyMap(hoursDay, hoursleftDay, currentHour, cycle);
    console.log("hoursLeft:", hoursleftDay);
    console.log(currentHour + 1 - cycle);
    // hourlyMap(11, hoursTomorrow, 12, cycle);

    function hourlyMap(outputArray, range, startHour, cycle) {
      for (let i = startHour + 1 - cycle; i <= startHour - cycle + range; i++) {
        outputArray.push(
          <Hourly
            timeIncrement={timeIncrement}
            setTimeIncrement={setTimeIncrement}
            currentHour={startHour}
            hour={startHour + i > 12 ? startHour - 12 + i : startHour + 1 + j}
            meridiem={hour + 1 + i >= 12 ? "AM" : "PM"}
            sig_height={GFSData[i].significant_wave_height * 3.28084}
            sig_period={GFSData[i].comp1_period}
            sig_dir={GFSData[i].comp1_dir}
            wind_speed={windData[currentHour + i + 1].speed}
            wind_dir={windData[currentHour + i + 1].direction}
          />
        );
      }
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
    // console.log(val);
    return dir[val - 1];
  }

  if (!spectralDataLoading) {
    const frequencies = spectralData.frequencies;
    const densities = spectralData.densities;
    const series = [];
    for (let i = 0; i < frequencies.length; i++) {
      series.push({ period: 1.0 / frequencies[i], density: densities[i] });
    }

    console.log(series);
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {significantDataLoading ||
      swellComponentDataLoading ||
      spectralDataLoading ||
      windDataLoading ||
      GFSDataLoading ? (
        <div className="flex flex-col h-screen bg-background"></div>
      ) : (
        <>
          <div className="flex flex-col bg-background">
            {/* Header Section */}

            <SignificantWidget
              significantData={significantData}
              day={day}
              month={month}
              date={date}
            />

            {/* Wind Widget */}

            <WindWidget windData={currentWindData} />

            {/* Swell Component Widget */}

            {swellComponentData.length === 1 ? (
              <SwellComponentWidget componentData={comp1} />
            ) : (
              <>
                <div className="flex flex-col justify-self-start">
                  <div>
                    <button
                      onClick={toggleDropdown}
                      className="inline-flex items-center justify-center w-full text-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    >
                      Swell Components
                      <svg
                        className="ml-1 mr-1 h-4 w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  {isOpen && (
                    <div>
                      <SwellComponentWidget componentData={comp1} />
                      <SwellComponentWidget componentData={comp2} />
                    </div>
                  )}
                </div>
              </>
            )}

            <section className="flex flex-col justify-center items-center mt-2 mb-10">
              <h2 className="font-radio font-bold text-xl text-white mb-2">
                Frequency Spectra
              </h2>
              <div className="flex absolute bottom-[1.5rem]">
                <h3 className="font-radio font-normal text-[9px] text-white">
                  m<sup>2</sup> / Hz vs period (sec)
                </h3>
              </div>
              <FrequencySpectra
                frequencies={spectralData.frequencies}
                densities={spectralData.densities}
              />
              {/* <DirectionalSpectra/> */}
            </section>

            {/* Timeframe labels */}
            {/* <section className="flex flex-row justify-between mx-8 mt-4">
              <section className="flex flex-col items-center">
                <h3
                  className={`"font-radio font-normal" + ${
                    timeIncrement === "today"
                      ? "text-highlight font-radio font-semibold"
                      : "text-blue-100 font-radio font-semibold"
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
                      ? "text-highlight font-radio font-semibold"
                      : "text-blue-100 font-radio font-semibold"
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
                      ? "text-highlight font-radio font-semibold"
                      : "text-blue-100 font-radio font-semibold"
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
                      ? "text-highlight font-radio font-semibold"
                      : "text-blue-100 font-radio font-semibold"
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
            </section> */}

            {/* Hourly Scroll */}
            {/* <section className="flex flex-col mx-8 mb-14 h-min-full overflow-auto">
              {hoursDay.map((hour) => hour)}
              {hoursTomorrow.map((hour) => hour)}
            </section> */}
          </div>
        </>
      )}
    </div>
  );
}
export default Home;
