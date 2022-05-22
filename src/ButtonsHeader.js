import Button from "./components/Button";
import { removeButtonFocus, buttonFocus } from "./stylingFunctions/functions";

function ButtonHeader({ days, date, buttonRef, setDate }) {
  const parsedDate = date.toString().substring(0, 3).toLowerCase();

  function manageDays(key, day) {
    if (days.findIndex((day) => day === parsedDate) === days.indexOf(day)) {
      removeButtonFocus(key, buttonRef);
      buttonFocus(key, buttonRef);
    } else {
      if (days.findIndex((day) => day === parsedDate) > days.indexOf(day)) {
        const start = days.findIndex((day) => day === parsedDate);
        const end = days.indexOf(day);
        const sum = start - end;
        setDate(
          new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - sum,
            date.getHours() + 1
          )
        );
      } else {
        const start = days.findIndex((day) => day === parsedDate);
        const end = days.indexOf(day);
        const sum = -(start - end);
        setDate(
          new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + sum,
            date.getHours() + 1
          )
        );
      }
      removeButtonFocus(key, buttonRef);
      buttonFocus(key, buttonRef);
    }
  }

  return (
    <div className="flex ml-[24px] mt-[16px]">
      {days.map((day, key) => {
        return (
          <Button
            day={day}
            date={parsedDate}
            key={key}
            ref={buttonRef[key]}
            onClick={() => manageDays(key, day)}
          />
        );
      })}
    </div>
  );
}

export default ButtonHeader;
