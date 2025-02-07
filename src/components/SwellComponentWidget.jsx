export default function SwellComponentWidget({ componentData }) {
  return (
    <section className="flex flex-row justify-evenly mx-8 mt-3 mb-1 pt-1 bg-gray rounded-3xl ">
      <div className="flex flex-col">
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 32 32"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 fill-highlight mx-2"
        >
          <rect x="24" y="2" width="6" height="2" />
          <rect x="24" y="8" width="4" height="2" />
          <rect x="24" y="14" width="6" height="2" />
          <rect x="24" y="20" width="4" height="2" />
          <path
            d="M30,28H24a10.0349,10.0349,0,0,1-6.9268-17.2622A11.9629,11.9629,0,0,0,12.9937,10a6.9027,6.9027,0,0,0-6.0308,3.42C4.9966,16.4348,4,21.34,4,28H2c0-7.0542,1.106-12.3274,3.2871-15.6726A8.906,8.906,0,0,1,12.9937,8h.0068a14.762,14.762,0,0,1,6.4619,1.592,1,1,0,0,1,.0869,1.7222A8.0249,8.0249,0,0,0,24,26h6Z"
            transform="translate(0 0)"
          />
        </svg>
        <h5 className="font-radio font-semibold text-lg text-white self-center">
          {componentData.wave_height.toFixed(1)}
        </h5>
      </div>

      <div className="flex flex-col">
        <svg
          viewBox="0 0 32 32"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 fill-highlight self-center mx-2"
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
        <div className="flex flex-row">
          <h5 className="font-radio font-semibold text-lg text-white self-center">
            {componentData.period.toFixed(1)}
          </h5>
          <h6 className="font-radio font-semibold text-xs text-white self-center ml-1 mt-1">
            sec
          </h6>
        </div>
      </div>

      <div className="flex flex-col">
        <svg
          viewBox="0 0 32 32"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 fill-highlight self-center mx-2"
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
        <h5 className="font-radio font-semibold text-lg text-white self-center">
          {componentData.angle}°
        </h5>
      </div>

      <div className="flex flex-col">
        <svg
          viewBox="0 0 32 32"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 fill-highlight self-center mx-2"
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
        <div className="flex flex-row">
          <h5 className="font-radio font-semibold text-lg text-white self-center">
            {componentData.energy.toFixed(1)}
          </h5>
          <h6 className="font-radio font-semibold text-xs text-white self-center ml-1 mt-1">
            kJ
          </h6>
        </div>
      </div>
    </section>
  );
}
