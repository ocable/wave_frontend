export default function GFSSwellWidget({ gfsData, componentNumber = 1 }) {
  if (!gfsData) return null;

  const METERS_TO_FEET = 3.28084;

  // Extract the component data based on componentNumber
  const getComponentData = () => {
    const safeParseFloat = (value) => {
      if (value === null || value === undefined || value === "") return 0;
      const parsed = Number(value);
      return isNaN(parsed) ? 0 : parsed;
    };

    switch (componentNumber) {
      case 1:
        return {
          height: safeParseFloat(gfsData.comp1_height) * METERS_TO_FEET,
          period: safeParseFloat(gfsData.comp1_period),
          direction: safeParseFloat(gfsData.comp1_dir),
          energy: safeParseFloat(gfsData.comp1_energy),
        };
      case 2:
        return {
          height: safeParseFloat(gfsData.comp2_height) * METERS_TO_FEET,
          period: safeParseFloat(gfsData.comp2_period),
          direction: safeParseFloat(gfsData.comp2_dir),
          energy: safeParseFloat(gfsData.comp2_energy),
        };
      case 3:
        return {
          height: safeParseFloat(gfsData.comp3_height) * METERS_TO_FEET,
          period: safeParseFloat(gfsData.comp3_period),
          direction: safeParseFloat(gfsData.comp3_dir),
          energy: safeParseFloat(gfsData.comp3_energy),
        };
      default:
        return {
          height: 0,
          period: 0,
          direction: 0,
          energy: 0,
        };
    }
  };

  const componentData = getComponentData();

  // Convert direction to cardinal direction
  const degToCardinal = (deg) => {
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
    return dir[Math.round(deg / 22.5) % 16];
  };

  return (
    <section className="flex flex-col items-center mx-8 mt-2 mb-1 pt-4 pb-3 bg-gray rounded-3xl">
      {/* Large wave height display */}
      <div className="flex flex-row items-end mb-4">
        <h1 className="font-radio font-bold text-5xl text-white">
          {componentData.height.toFixed(1)}
        </h1>
        <h3 className="font-radio font-semibold text-lg text-white ml-1 mb-1">
          ft
        </h3>
      </div>

      {/* Bottom row with period, direction, and energy */}
      <div className="flex flex-row justify-center items-center space-x-8">
        {/* Period */}
        <div className="flex flex-col items-center">
          <svg
            viewBox="0 0 32 32"
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-highlight mb-1"
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
          <div className="flex flex-row items-center">
            <h5 className="font-radio font-semibold text-lg text-white">
              {componentData.period.toFixed(0)}
            </h5>
            <h6 className="font-radio font-semibold text-xs text-white ml-1">
              sec
            </h6>
          </div>
        </div>

        {/* Direction */}
        <div className="flex flex-col items-center">
          <svg
            viewBox="0 0 32 32"
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-highlight mb-1"
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
          <h5 className="font-radio font-semibold text-lg text-white">
            {componentData.direction.toFixed(0)}°
          </h5>
        </div>

        {/* Energy */}
        <div className="flex flex-col items-center">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-highlight mb-1"
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <div className="flex flex-row items-center">
            <h5 className="font-radio font-semibold text-lg text-white">
              {componentData.energy.toFixed(0)}
            </h5>
            <h6 className="font-radio font-semibold text-xs text-white ml-1">
              kJ
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
}
