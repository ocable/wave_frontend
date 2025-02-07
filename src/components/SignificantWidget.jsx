export default function SignificantWidget({
  significantData,
  day,
  month,
  date,
}) {
  return (
    <div>
      <section className="flex flex-col mx-8">
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
        </div>
        <p className="font-radio text-md ml-1 font-normal text-white">
          {day}, {month} {date}
        </p>
      </section>

      <div className="flex flex-col justify-center items-center">
        <section className="flex flex-row justify-center items-center mt-4">
          <h1 className="font-radio font-bold text-9xl text-white">
            {significantData.sig_wave_height.toFixed(1)}
          </h1>
          <h5 className="self-end font-radio font-bold text-2xl text-white ml-2 mb-3">
            ft
          </h5>
        </section>
        <div className="flex flex-row h-24 sm:w-1/3 w-10/12 bg-background self-center pt-3 px-8 mt-2 pb-2 justify-between">
          <section className="flex flex-col">
            <svg
              viewBox="0 0 32 32"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 fill-highlight self-center mx-2 mb-1"
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
              <h4 className="font-radio font-semibold mt-1 text-3xl text-white self-center">
                {Math.round(significantData.period)}
              </h4>
              <p className="font-radio font-semibold text-xs text-white self-end ml-1 mb-1">
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
              className="h-6 w-6 fill-highlight self-center mx-2 mb-1"
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
            <h4 className="font-radio font-semibold text-3xl mt-1 text-white self-center">
              {significantData.direction}°
            </h4>
            {/* {console.log(degToCardinal(significantData.direction))} */}
          </section>
          <section className="flex flex-col">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-highlight self-center mt-1 mb-1"
            >
              <path d="M19,8H14.724l3.144-5.5A1,1,0,0,0,17,1H10a1,1,0,0,0-.895.553l-5,10A1,1,0,0,0,5,13H9.656L7.042,21.713a1,1,0,0,0,1.722.933l11-13A1,1,0,0,0,19,8Zm-8.663,9.689,1.621-5.4A1,1,0,0,0,11,11H6.618l4-8h4.658L12.132,8.5A1,1,0,0,0,13,10h3.844Z" />
            </svg>
            <section className="flex flex-row">
              <h4 className="font-radio font-semibold mt-1 text-3xl text-white self-center">
                {Math.round(significantData.energy)}
              </h4>
              <p className="font-radio font-semibold text-xs text-white self-end ml-1 mb-1">
                kJ
              </p>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}
