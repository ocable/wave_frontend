export default function Hourly({ timeIncrement, setTimeIncrement,currentHour, hour, meridiem, sig_height, sig_period, sig_dir, wind_speed, wind_dir }) {
  return (
    <div className="flex flex-row h-14 drop-shadow-md bg-blue-300 rounded-3xl mt-4 mb-2">
      <section className="flex flex-row">
        <h3 className="font-radio font-normal text-3xl text-highlight self-center ml-4">{hour}</h3>
        <p className="font-radio font-normal text-xs text-highlight self-center mt-3 ml-1">{`${currentHour > 12 ? "pm" : "am"}`}</p>
        <h4 className="font-radio font-normal text-xl text-blue-100 self-center ml-4">{Math.round(sig_height * 10) / 10}</h4>
        <h4 className="font-radio font-normal text-xl text-blue-100 self-center ml-2">{sig_period}</h4>
        <h4 className="font-radio font-normal text-xs text-blue-100 self-center mt-1 ml-1">s</h4>
        <h4 className="font-radio font-normal text-xl text-blue-100 self-center ml-2">{sig_dir}°</h4>

      </section>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 stroke-blue-400 self-center"
      >
        <g id="Interface / Line_L">
          <path
            id="Vector"
            d="M12 19V5"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
      <section className="flex flex-row">
        <h4 className="font-radio font-normal text-xl text-blue-100 self-center ml-1">{Math.round(wind_speed)}</h4>
        <h4 className="font-radio font-normal text-xs text-blue-100 self-center mt-1 ml-1">mph</h4>
        <h4 className="font-radio font-normal text-xl text-blue-100 self-center ml-2 mr-4">{Math.round(wind_dir)}°</h4>




      </section>
    </div>
  );
}
