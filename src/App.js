import { useEffect, useRef, useState, useMemo, createRef } from "react";
import DiameterLegend from "./DiameterLegend";
import Arealegend from "./AreaLegend";
import Scatterplot from "./Scatterplot";
import ButtonHeader from "./ButtonsHeader";

export default function App() {
  const api_key = "";
  const svgRef = useRef();
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const buttonRef = days.map(() => createRef());
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);

  return (
    <>
      <main className="min-h-screen w-screen grid  grid-cols-asteorids grid-rows-1 gap-x-[1px] ">
        <div className="bg-blueToDark flex flex-col" id="right">
          <h1 className="underline text-white font-avenir text-[20px] mt-[42px] font-extra-bold ml-[26px]">
            Asteroids of the day
          </h1>
          <div className="w-full flex justify-between" id="header">
            <div>
              <h2 className="text-white font-avenir text-[13px] mt-[39px] ml-[24px]">
                Select one day to update the chart:
              </h2>
              <ButtonHeader
                days={days}
                date={date}
                buttonRef={buttonRef}
                setDate={setDate}
              />
            </div>
            <DiameterLegend />
          </div>
          <Scatterplot
            data={data}
            setData={setData}
            svgRef={svgRef}
            date={date}
            api_key={api_key}
          />
        </div>
        <div className="bg-blueToDark flex flex-col" id="left">
          <h1 className="underline text-white font-avenir text-[20px] mt-[42px] font-extra-bold ml-[70px]">
            Brightest of the week
          </h1>
          <h2 className="text-white font-avenir text-[13px] mt-[41.5px] font-extra-bold self-start ml-[70px]">
            MAGNITUDE
          </h2>
          <Arealegend />
        </div>
      </main>
    </>
  );
}
