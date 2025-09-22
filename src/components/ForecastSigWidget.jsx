import { NavLink } from "react-router-dom";

export default function SignificantWidget({
  significantData,
  day,
  month,
  date,
  hour,
  min,
  meridiem
}) {
  return (
    <div>

      <div className="flex flex-col justify-center items-center">
        <section className="flex flex-row justify-center items-center mt-4">
          <h1 className="font-radio font-bold text-9xl text-white">
            {significantData.sig_wave_height.toFixed(1)}
          </h1>
          <h5 className="self-end font-radio font-bold text-2xl text-white ml-2 mb-3">
            ft
          </h5>
        </section>
        <div className="flex flex-row h-24 sm:w-1/3 w-10/12 bg-background self-center pt-2 px-8 justify-between">
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
