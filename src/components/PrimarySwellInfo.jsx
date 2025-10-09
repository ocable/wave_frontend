import { useState } from "react";

export default function PrimarySwellInfo({ selectedGFSData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!selectedGFSData) return null;

  const METERS_TO_FEET = 3.28084;

  // Safe parsing function
  const safeParseFloat = (value) => {
    if (value === null || value === undefined || value === "") return 0;
    const parsed = Number(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Get energy values for all components
  const comp1Energy = safeParseFloat(selectedGFSData.comp1_energy);
  const comp2Energy = safeParseFloat(selectedGFSData.comp2_energy);
  const comp3Energy = safeParseFloat(selectedGFSData.comp3_energy);

  // Check if we have meaningful data for each component
  const hasComp1 = safeParseFloat(selectedGFSData.comp1_height) > 0;
  const hasComp2 = safeParseFloat(selectedGFSData.comp2_height) > 0;
  const hasComp3 = safeParseFloat(selectedGFSData.comp3_height) > 0;

  // Find all valid components sorted by energy
  const getAllComponents = () => {
    const components = [];
    if (hasComp1) {
      components.push({
        number: 1,
        energy: comp1Energy,
        height: safeParseFloat(selectedGFSData.comp1_height) * METERS_TO_FEET,
        period: safeParseFloat(selectedGFSData.comp1_period),
        direction: safeParseFloat(selectedGFSData.comp1_dir),
      });
    }
    if (hasComp2) {
      components.push({
        number: 2,
        energy: comp2Energy,
        height: safeParseFloat(selectedGFSData.comp2_height) * METERS_TO_FEET,
        period: safeParseFloat(selectedGFSData.comp2_period),
        direction: safeParseFloat(selectedGFSData.comp2_dir),
      });
    }
    if (hasComp3) {
      components.push({
        number: 3,
        energy: comp3Energy,
        height: safeParseFloat(selectedGFSData.comp3_height) * METERS_TO_FEET,
        period: safeParseFloat(selectedGFSData.comp3_period),
        direction: safeParseFloat(selectedGFSData.comp3_dir),
      });
    }

    // Sort by energy (highest first)
    components.sort((a, b) => b.energy - a.energy);
    return components;
  };

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

  const allComponents = getAllComponents();

  if (allComponents.length === 0) return null;

  const primaryComponent = allComponents[0];
  const secondaryComponent = allComponents.length > 1 ? allComponents[1] : null;
  const tertiaryComponent = allComponents.length > 2 ? allComponents[2] : null;

  const renderSwellRow = (component) => (
    <div className="flex flex-row justify-center items-center gap-3 text-gray max-w-[350px] mx-auto py-1">
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-semibold text-white">
          {component.height.toFixed(1)}
        </span>
        <span className="text-sm font-medium">ft</span>
      </div>

      <div className="w-px h-5 bg-darkGray"></div>

      <div className="flex items-baseline gap-1">
        <span className="text-lg font-semibold text-white">
          {component.period.toFixed(0)}
        </span>
        <span className="text-sm font-medium">sec</span>
      </div>

      <div className="w-px h-5 bg-darkGray"></div>

      <div className="flex items-baseline gap-1">
        <span className="text-lg font-semibold text-white">
          {degToCardinal(component.direction)}
        </span>
        <span className="text-sm font-medium">
          ({component.direction.toFixed(0)}°)
        </span>
      </div>

      <div className="w-px h-5 bg-darkGray"></div>

      <div className="flex items-baseline gap-1">
        <span className="text-lg font-semibold text-white">
          {component.energy.toFixed(0)}
        </span>
        <span className="text-sm font-medium">kJ</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-[350px] mx-auto">
      {/* Primary Swell Row */}
      <div className="relative">
        {renderSwellRow(primaryComponent)}

        {/* Dropdown Toggle Button - Only show if there are additional components */}
        {(secondaryComponent || tertiaryComponent) && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray hover:text-white transition-colors"
            aria-label="Toggle secondary swells"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transform transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Expanded Secondary/Tertiary Swells */}
      {isExpanded && (
        <div className="mt-2">
          {secondaryComponent && renderSwellRow(secondaryComponent)}
          {tertiaryComponent && renderSwellRow(tertiaryComponent)}
        </div>
      )}
    </div>
  );
}
