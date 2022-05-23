export default function Arealegend() {
  return (
    <legend>
      <div className="ml-[70px] mt-[32.5px] flex items-baseline">
        <div className="w-[10px] h-[10px] mr-[11px] rotate-45 bg-white"></div>
        <h3 className="text-white font-avenir text-[12px] font-light">
          Filled area: magnitude
        </h3>
      </div>
      <div className="ml-[70px] mt-[7.8px] flex items-baseline">
        <div className="w-[10px] h-[10px] mr-[11px] rotate-45 border-white border-[1px]"></div>
        <h3 className="text-white font-avenir text-[12px] font-light">
          Empty area: brightness
        </h3>
      </div>
    </legend>
  );
}
