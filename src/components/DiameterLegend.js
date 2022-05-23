export default function DiameterLegend() {
  return (
    <legend>
      <div className="flex items-center mt-[39px]">
        <svg height={102} width={335}>
          <text
            x="0"
            y="15"
            className="fill-white font-avenir text-[13px] font-extra-bold"
          >
            DIAMETER
          </text>
          <text
            x="25"
            y="55"
            className="fill-white font-avenir text-[13px] font-light"
          >
            Min km
          </text>
          <text
            x="168"
            y="55"
            className="fill-white font-avenir text-[13px] font-light"
          >
            Max km
          </text>
          <circle
            cx="10"
            cy="51"
            r="7"
            stroke="#2AF598"
            fill="url(#gradientSmall)"
            fillOpacity={0.1}
            strokeWidth="0.5"
          />
          <circle
            cx="10"
            cy="51"
            r="1"
            stroke="#2AF598"
            fill="#2AF598"
            strokeWidth="0.5"
          />
          <circle
            cx="160"
            cy="51"
            r="50"
            stroke="#2AF598"
            fill="url(#gradientBig)"
            fillOpacity={0.07}
            strokeWidth="0.5"
          />
          <circle cx="160" cy="51" r="1" fill="#2AF598" />
          <defs>
            <radialGradient id="gradientSmall">
              <stop offset={"0%"} stopColor="#2AF598" />
              <stop offset={"100%"} stopColor="transparent" />
            </radialGradient>
            <radialGradient id="gradientBig">
              <stop offset={"0%"} stopColor="#2AF598" />
              <stop offset={"25%"} stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </legend>
  );
}
