import {
  useGetSpectralDataQuery,
  useGetSignificantDataQuery,
  useGetSwellComponentDataQuery,
  useGetWindDataQuery,
} from "./pages/spectralSlice";

function Home() {
  const { data: spectralData, isLoading: spectralDataLoading } =
    useGetSpectralDataQuery();
  const { data: significantData, isLoading: significantDataLoading } =
    useGetSignificantDataQuery();
  const { data: swellComponentData, isLoading: swellComponentDataLoading } =
    useGetSwellComponentDataQuery();
  const { data: windData, isLoading: windDataLoading } = useGetWindDataQuery();

  const currentHour = new Date().getHours();
  console.log("currentHour", currentHour);
  const currentWindData = windDataLoading ? null : windData[currentHour];
  console.log("currentWindData", currentWindData);

  return (
    <div>
      {significantDataLoading ||
      swellComponentDataLoading ||
      spectralDataLoading ||
      windDataLoading ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          <div className="flex flex-col bg-blue-100 h-screen">
            <div className="flex flex-row bg-blue-200 p-4 m-6 w-auto h-40 rounded-2xl ">
              <h1>Home</h1>
            </div>

            <ul>
              <li>Wave height: {significantData.sig_wave_height}</li>
              <li>Period: {significantData.period}</li>
              <li>Direction: {significantData.direction}</li>
              <li>Energy: {significantData.energy}</li>
              <li>Wind Direction: {currentWindData.direction}</li>
              <li>Wind Speed: {currentWindData.speed}</li>
              <li>Wind direction type: {currentWindData.directionType}</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
export default Home;
