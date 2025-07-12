function LocationDateHeader({ day, month, date, hour, min, meridiem }) {
  return (
    <section className="flex flex-col mx-8">
      {/* <div className="flex flex-row justify-between"> */}
      <div className="flex flex-row align-middle mt-6">
        <svg
          width="800px"
          height="800px"
          viewBox="-3 0 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          className="w-4 h-4 fill-highlight mt-2 mr-1 p-0"
        >
          <g id="Page-1" stroke="none" stroke-width="1">
            <g
              id="Dribbble-Light-Preview"
              transform="translate(-383.000000, -5439.000000)"
            >
              <g id="icons" transform="translate(56.000000, 160.000000)">
                <path
                  d="M334,5297 C332.178,5297 329,5290.009 329,5286 C329,5283.243 331.243,5281 334,5281 C336.757,5281 339,5283.243 339,5286 C339,5290.009 335.822,5297 334,5297 M334,5279 C330.134,5279 327,5282.134 327,5286 C327,5289.866 330.134,5299 334,5299 C337.866,5299 341,5289.866 341,5286 C341,5282.134 337.866,5279 334,5279 M334,5287.635 C333.449,5287.635 333,5287.187 333,5286.635 C333,5286.084 333.449,5285.635 334,5285.635 C334.551,5285.635 335,5286.084 335,5286.635 C335,5287.187 334.551,5287.635 334,5287.635 M334,5283.635 C332.343,5283.635 331,5284.979 331,5286.635 C331,5288.292 332.343,5289.635 334,5289.635 C335.657,5289.635 337,5288.292 337,5286.635 C337,5284.979 335.657,5283.635 334,5283.635"
                  id="pin_rounded_circle-[#620]"
                ></path>
              </g>
            </g>
          </g>
        </svg>

        <h2 className="font-radio text-2xl font-bold text-white">
          Higgins Beach
        </h2>
        {/* </div> */}
      </div>
      <p className="font-radio text-md ml-1 font-normal text-white">
        {day}, {month} {date}, {hour}:{min} {meridiem}
      </p>
    </section>
  );
}
export default LocationDateHeader;
