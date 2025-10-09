import { useState, useEffect, useMemo } from "react";
import LocationDateHeader from "../components/LocationDateHeader";
import ForecastSigWidget from "../components/ForecastSigWidget";
import GFSSwellComponents from "../components/GFSSwellComponents";
import PrimarySwellInfo from "../components/PrimarySwellInfo";
import PrimaryWindInfo from "../components/PrimaryWindInfo";
import WindWidget from "../components/WindWidget";
import {
  useGetSpectralDataQuery,
  useGetSignificantDataQuery,
  useGetSwellComponentDataQuery,
  useGetWindDataQuery,
  useGetGFSDataQuery,
} from "../pages/spectralSlice";

import WaveHeightGraph from "../components/WaveHeightGraph";
import WindGraph from "../components/WindGraph";

function forecast() {
  const { data: significantData, isLoading: significantDataLoading } =
    useGetSignificantDataQuery();
  const { data: GFSData, isLoading: GFSDataLoading } = useGetGFSDataQuery();
  const { data: windData, isLoading: windDataLoading } = useGetWindDataQuery();

  // state to control meridiem
  const [meridiem, setMeridiem] = useState("");
  // military time
  const [hour, setHour] = useState(0);
  // state to control time range of active forecast
  const [range, setRange] = useState(6);
  // state controlling time increment
  const [increment, setIncrement] = useState(1);
  // sliding window start (hours offset from rounded base)
  const [windowStart, setWindowStart] = useState(0);

  // Total hours available from next-hour boundary onward
  const totalForecastHours = useMemo(() => {
    if (!GFSData || !GFSData.length) return 0;
    const now = new Date();
    const nextHourUTCMS = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours() + 1,
      0,
      0,
      0
    );
    let startIndex = GFSData.findIndex(
      (d) => Date.parse(d.timestamp) >= nextHourUTCMS
    );
    if (startIndex === -1) startIndex = 0;
    return GFSData.length - startIndex;
  }, [GFSData]);

  const canSlideRight = windowStart + range < totalForecastHours;
  const canSlideLeft = windowStart > 0;

  // Clamp increment when range changes
  useEffect(() => {
    setIncrement((prev) => (prev > range ? range : prev));
  }, [range]);

  const presets = [6, 24, 72, 168];
  const nextPreset = presets.find((p) => p > range) || null;
  const handleIncrease = () => {
    if (increment < range) {
      setIncrement(increment + 1);
      return;
    }
    // At right edge: try to expand range if a larger preset exists and we have data
    if (nextPreset && nextPreset <= totalForecastHours) {
      setRange(nextPreset);
      // keep selection at the same absolute hour -> new increment equals previous range
      setIncrement(range); // old range becomes position within new bigger window
      return;
    }
    // No larger preset or insufficient data: slide if possible
    if (canSlideRight) {
      setWindowStart((prev) => prev + 1);
      setIncrement(range);
    }
  };

  const prevPreset = [...presets].reverse().find((p) => p < range) || null;
  const handleDecrease = () => {
    if (increment > 1) {
      setIncrement(increment - 1);
      return;
    }
    // At left edge. Try to shrink range to previous preset if current selection still fits.
    if (prevPreset) {
      // Ensure we don't cut off selection: clamp increment
      setRange(prevPreset);
      setIncrement(Math.min(increment, prevPreset));
      return;
    }
    if (canSlideLeft) {
      setWindowStart((prev) => Math.max(0, prev - 1));
      setIncrement(1);
    }
  };

  const nowRaw = new Date();
  const roundedBase = new Date(nowRaw);
  if (roundedBase.getMinutes() >= 30) {
    roundedBase.setHours(roundedBase.getHours() + 1);
  }
  roundedBase.setMinutes(0, 0, 0);
  const currentHour = roundedBase.getHours();
  const currentMin = 0; // rounded to top of hour

  // Calculate the target date and time based on increment from rounded base
  const targetDate = new Date(roundedBase);
  // account for sliding window offset
  targetDate.setHours(currentHour + windowStart + increment - 1);

  const targetHour = targetDate.getHours();
  const displayHour =
    targetHour === 0 ? 12 : targetHour > 12 ? targetHour - 12 : targetHour;
  const displayMeridiem = targetHour >= 12 ? "PM" : "AM";

  const targetMonth = targetDate.toLocaleString("en-US", { month: "short" });
  const targetDay = targetDate.toLocaleString("en-US", { weekday: "long" });
  const targetDateNum = targetDate.getDate();

  // Get the selected GFS data point based on increment and windowStart
  const selectedGFSData = useMemo(() => {
    if (!GFSData || GFSData.length === 0) return null;

    // Find the starting index similar to WaveHeightGraph logic
    const now = new Date();
    const nextHourUTCMS = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours() + 1,
      0,
      0,
      0
    );

    let startIndex = GFSData.findIndex((d) => {
      const ts = Date.parse(d.timestamp);
      return ts >= nextHourUTCMS;
    });

    if (startIndex === -1) {
      startIndex = 0;
    }

    // Calculate the actual index considering windowStart and increment
    const targetIndex = startIndex + windowStart + increment - 1;

    // Return the data point if it exists
    if (targetIndex >= 0 && targetIndex < GFSData.length) {
      return GFSData[targetIndex];
    }

    return null;
  }, [GFSData, windowStart, increment]);

  // Get the selected wind data based on increment and windowStart
  const selectedWindData = useMemo(() => {
    if (!windData || windData.length === 0) return null;

    // Use the same logic as WindGraph
    const now = new Date();
    const nextHourUTCMS = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours() + 1,
      0,
      0,
      0
    );

    // Find first index whose UTC timestamp >= nextHourUTCMS
    let startIndex = windData.findIndex((d) => {
      const ts = Date.parse(d.timestamp);
      return ts >= nextHourUTCMS;
    });

    if (startIndex === -1) {
      startIndex = 0;
    }

    // Calculate the target index considering windowStart and increment
    const targetIndex = startIndex + windowStart + increment - 1;

    // Return the data point if it exists
    if (targetIndex >= 0 && targetIndex < windData.length) {
      return windData[targetIndex];
    }

    return null;
  }, [windData, increment, windowStart]);

  useEffect(() => {
    setHour(displayHour);
    setMeridiem(displayMeridiem);
  }, [increment, displayHour, displayMeridiem]);

  //   console.log(range);
  return (
    <div>
      {significantDataLoading || GFSDataLoading || windDataLoading ? (
        <div className="flex flex-col h-screen bg-background"></div>
      ) : (
        <>
          <div className="flex flex-col h-screen bg-background overflow-hidden">
            {/* Sticky Header Section */}
            <div className="sticky top-0 z-10 bg-background">
              <LocationDateHeader
                day={targetDay}
                month={targetMonth}
                date={targetDateNum}
                hour={hour}
                min={currentMin}
                meridiem={meridiem}
              />

              <section className="flex flex-row justify-center items-center mt-4 mb-4 px-32">
                {/* Left Arrow - Decrease */}
                <button
                  onClick={handleDecrease}
                  disabled={increment <= 1 && !canSlideLeft}
                  className={`pr-8 rounded-full ${
                    increment <= 1 && !canSlideLeft
                      ? "text-gray cursor-not-allowed"
                      : "text-white hover:text-highlight"
                  }`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className="flex flex-row justify-center space-x-8">
                  {/* <h2
            className={`"font-bold text-white" + ${
              range === 1 ? "text-highlight" : "text-white"
            }`}
            onClick={() => setRange(1)}
          >
            1h
          </h2> */}
                  <h2
                    className={`"font-extrabold text-white" + ${
                      range === 6 ? "text-highlight" : "text-white"
                    }`}
                    onClick={() => setRange(6)}
                  >
                    6h
                  </h2>
                  <h2
                    className={`"font-extrabold text-white" + ${
                      range === 24 ? "text-highlight" : "text-white"
                    }`}
                    onClick={() => setRange(24)}
                  >
                    1d
                  </h2>
                  <h2
                    className={`"font-bold text-white" + ${
                      range === 72 ? "text-highlight" : "text-white"
                    }`}
                    onClick={() => setRange(72)}
                  >
                    3d
                  </h2>
                  <h2
                    className={`"font-bold text-white" + ${
                      range === 168 ? "text-highlight" : "text-white"
                    }`}
                    onClick={() => setRange(168)}
                  >
                    7d
                  </h2>
                </div>

                {/* Right Arrow - Increase */}
                <button
                  onClick={handleIncrease}
                  disabled={increment >= range && !canSlideRight}
                  className={`pl-8 rounded-full ${
                    increment >= range && !canSlideRight
                      ? "text-gray cursor-not-allowed"
                      : "text-white hover:text-highlight"
                  }`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </section>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto">
              <h3 className="font-radio font-bold text-sm text-white text-center">
                Wave Height
              </h3>

              <WaveHeightGraph
                GFSData={GFSData}
                range={range}
                currentHour={currentHour + windowStart}
                increment={increment}
                setIncrement={setIncrement}
                windowStart={windowStart}
              />

              {/* Primary Swell Info - One Line Display */}
              <div className="-mt-2">
                <PrimarySwellInfo selectedGFSData={selectedGFSData} />
              </div>

              {/* Wind Speed & Direction Graph */}
              <div className="mt-6">
                <h3 className="font-radio font-bold text-sm text-white text-center">
                  Wind Speed & Direction
                </h3>
                <WindGraph
                  windData={windData}
                  range={range}
                  currentHour={currentHour + windowStart}
                  increment={increment}
                  setIncrement={setIncrement}
                  windowStart={windowStart}
                />

                {/* Primary Wind Info - One Line Display */}
                {selectedWindData && (
                  <PrimaryWindInfo windData={selectedWindData} />
                )}
              </div>

              {/* <ForecastSigWidget
              significantData={significantData}
              day={targetDay}
              month={targetMonth}
              date={targetDateNum}
              hour={hour}
              min={currentMin}
              meridiem={meridiem}
            /> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default forecast;
