import { useState } from "react";
import GFSSwellWidget from "./GFSSwellWidget";

export default function GFSSwellComponents({ selectedGFSData }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (!selectedGFSData) return null;

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

  // Find the component with highest energy
  const getPrimaryComponent = () => {
    const components = [];
    if (hasComp1) components.push({ number: 1, energy: comp1Energy });
    if (hasComp2) components.push({ number: 2, energy: comp2Energy });
    if (hasComp3) components.push({ number: 3, energy: comp3Energy });

    if (components.length === 0) return null;

    // Sort by energy (highest first)
    components.sort((a, b) => b.energy - a.energy);
    return components[0];
  };

  // Get remaining components (excluding primary)
  const getSecondaryComponents = (primaryNumber) => {
    const remaining = [];
    if (hasComp1 && primaryNumber !== 1)
      remaining.push({
        number: 1,
        energy: comp1Energy,
        label: "Swell Component 1",
      });
    if (hasComp2 && primaryNumber !== 2)
      remaining.push({
        number: 2,
        energy: comp2Energy,
        label: "Swell Component 2",
      });
    if (hasComp3 && primaryNumber !== 3)
      remaining.push({
        number: 3,
        energy: comp3Energy,
        label: "Swell Component 3",
      });

    // Sort remaining by energy (highest first)
    return remaining.sort((a, b) => b.energy - a.energy);
  };

  const primaryComponent = getPrimaryComponent();
  const secondaryComponents = primaryComponent
    ? getSecondaryComponents(primaryComponent.number)
    : [];
  const hasMultipleComponents = secondaryComponents.length > 0;

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      {/* Primary Component (highest energy) */}
      {primaryComponent && (
        <div className="mb-2">
          <h3 className="font-radio font-bold text-lg text-white text-center mb-2">
            Primary Swell ({primaryComponent.energy.toFixed(0)} kJ)
          </h3>
          <GFSSwellWidget
            gfsData={selectedGFSData}
            componentNumber={primaryComponent.number}
          />
        </div>
      )}

      {/* Additional Components (collapsible) */}
      {hasMultipleComponents && (
        <div className="flex flex-col justify-center w-full">
          <div className="flex justify-center">
            <button
              onClick={toggleDropdown}
              className="inline-flex items-center justify-center text-white px-4 py-2 text-sm font-medium hover:bg-gray-700 focus:outline-none rounded-lg transition-colors"
            >
              Additional Swell Components
              <svg
                className={`ml-2 h-4 w-4 transform transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {isOpen && (
            <div className="mt-2 space-y-2">
              {secondaryComponents.map((component, index) => (
                <div key={component.number}>
                  <h4 className="font-radio font-semibold text-md text-white text-center mb-1">
                    {component.label} ({component.energy.toFixed(0)} kJ)
                  </h4>
                  <GFSSwellWidget
                    gfsData={selectedGFSData}
                    componentNumber={component.number}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
