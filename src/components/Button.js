import React from "react";

const Button = React.forwardRef(({ day, onClick, date, ...rest }, ref) => {
  return (
    <button
      onClick={onClick}
      ref={ref}
      className={
        date === day
          ? "w-[35px] h-[35px] mr-[7px] rounded-full font-avenir text-[13px] border-[1px] transition-colors duration-500 bg-green border-green text-black"
          : "w-[35px] h-[35px] mr-[7px] rounded-full text-white font-avenir text-[13px] border-white border-[1px] transition-colors duration-500"
      }
      {...rest}
    >
      {day}
    </button>
  );
});

export default Button;
