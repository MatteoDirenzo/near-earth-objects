export default function ListItem({ dat }) {
  const maxMagnitude = 34;
  console.log(dat[0]);

  function calculateMagnitude(magnitude) {
    const proportion = (magnitude * 100) / maxMagnitude;
    console.log(proportion);
    return Math.round(Math.round(proportion)) + "%";
  }

  return (
    <>
      <div
        className={`w-[34px] h-[34px] rotate-45 border-white border-[1px] mr-[24px] flex items-center justify-center`}
      >
        <div
          style={{
            width: calculateMagnitude(dat[0]),
            height: calculateMagnitude(dat[0]),
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="w-[2px] h-[2px] bg-black rounded-full"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="font-avenir font-[13px] font-light text-white tracking-[0.5px]">{`Name: ${dat[1]}`}</h3>
        <h3 className="font-avenir font-[13px] font-light text-white tracking-[0.5px]">{`Diameter: ${dat[2].toFixed(
          5
        )} km`}</h3>
        <h3 className="font-avenir font-[13px] font-light text-white tracking-[0.5px]">{`Magnitude: ${dat[0]} h`}</h3>
      </div>
    </>
  );
}
