export default function Hourly({ timeIncrement, setTimeIncrement, hour, meridiem }) {
  return (
    <div className="flex flex-row h-14 drop-shadow-md bg-blue-300 rounded-3xl mt-8">
      <section className="flex flex-row">
        <h3 className="font-radio font-normal text-xl text-highlight self-center ml-4">{hour}</h3>
        <p className="font-radio font-normal text-xs text-highlight self-center ml-1">{`${meridiem === 'AM' ? "am" : "pm"}`}</p>
        <h4>{}</h4>
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
      <section></section>
    </div>
  );
}
