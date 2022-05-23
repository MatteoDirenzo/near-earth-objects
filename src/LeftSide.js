import ButtonHeader from "./components/ButtonsHeader";
import DiameterLegend from "./components/DiameterLegend";
import Scatterplot from "./components/Scatterplot";
import { useState, createRef, useRef } from "react";

export default function LeftSide({ date, setDate }) {
  const svgRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const buttonRef = days.map(() => createRef());

  return (
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
        className={
          isLoading
            ? "opacity-[0] transition-opacity duration-700"
            : "opacity-[1] transition-opacity duration-700"
        }
        setIsLoading={setIsLoading}
      />
    </div>
  );
}
