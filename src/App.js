import { createContext, useState } from "react";
import RightSide from "./RightSide";
import LeftSide from "./LeftSide";

export default function App({ api_key }) {
  const today = new Date();
  const [date, setDate] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      today.getHours() + 1
    )
  );

  return (
    <main className="min-h-screen w-screen grid grid-cols-asteorids grid-rows-1 gap-x-[1px] ">
      <ApiContext.Provider value={{ api_key: api_key }}>
        <LeftSide date={date} setDate={setDate} />
        <RightSide date={date} />
      </ApiContext.Provider>
    </main>
  );
}

export const ApiContext = createContext({ api_key: "" });
