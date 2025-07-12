import { useState, useEffect } from "react";
import LocationDateHeader from "../components/LocationDateHeader";
function forecast() {
  // state to control meridiem
  const [meridiem, setMeridiem] = useState("");
  // military time
  const [hour, setHour] = useState(0);
  // state to control time range of active forecast
  const [range, setRange] = useState(3);
  // state controlling time increment
  const [increment, setIncrement] = useState(1);

  const handleIncrease = () => {
    setIncrement(increment + 1);
  };

  const handleDecrease = () => {
    setIncrement(increment - 1);
  };

  const today = new Date();
  const month = today.toLocaleString("en-US", { month: "short" });
  const day = today.toLocaleString("en-US", { weekday: "long" });
  const date = today.getDate();
  const currentHour = today.getHours();
  const currentMin = today.getMinutes();

  useEffect(() => {
    setHour(currentHour > 12 ? currentHour - 12 : currentHour);
    setMeridiem(currentHour >= 12 ? "PM" : "AM");
  }, []);

  useEffect(() => {
    setHour(hour + increment);
  }, [increment]);

  //   console.log(range);
  return (
    <div className="flex flex-col h-screen bg-background">
      <LocationDateHeader
        day={day}
        month={month}
        date={date}
        hour={currentHour}
        min={currentMin}
        meridiem={meridiem}
      />

      <section className="flex flex-row justify-between items-center mt-4 px-32">
        {/* <h2
          className={`"font-bold text-white" + ${
            range === 1 ? "text-highlight" : "text-white"
          }`}
          onClick={() => setRange(1)}
        >
          1h
        </h2> */}
        <h2
          className={`"font-bold text-white" + ${
            range === 3 ? "text-highlight" : "text-white"
          }`}
          onClick={() => setRange(3)}
        >
          3h
        </h2>
        <h2
          className={`"font-bold text-white" + ${
            range === 6 ? "text-highlight" : "text-white"
          }`}
          onClick={() => setRange(6)}
        >
          6h
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
            range === 144 ? "text-highlight" : "text-white"
          }`}
          onClick={() => setRange(144)}
        >
          6d
        </h2>
      </section>
    </div>
  );
}

export default forecast;
