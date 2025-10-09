export default function PrimaryWindInfo({ windData }) {
  if (!windData) return null;

  // Function to determine color based on wind direction
  const getDirectionColor = (directionType) => {
    if (!directionType) return "text-white";

    const direction = directionType.toLowerCase();

    if (direction.includes("onshore")) {
      return "text-red-500";
    } else if (direction.includes("cross") || direction.includes("side")) {
      return "text-orange-500";
    } else if (direction.includes("offshore")) {
      return "text-green-500";
    }

    return "text-white";
  };

  return (
    <div className="flex flex-row justify-center items-center gap-3 text-gray max-w-[350px] mx-auto">
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-semibold text-white">
          {Math.round(windData.speed * 1.15078)}
        </span>
        <span className="text-sm font-medium">mph</span>
      </div>
      
      <div className="w-px h-5 bg-darkGray"></div>
      
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-semibold text-white">
          {Math.round(windData.direction)}
        </span>
        <span className="text-sm font-medium">°</span>
      </div>
      
      <div className="w-px h-5 bg-darkGray"></div>
      
      <div className="flex items-baseline">
        <span className={`text-lg font-semibold ${getDirectionColor(windData.directionType)}`}>
          {windData.directionType}
        </span>
      </div>
    </div>
  );
}
