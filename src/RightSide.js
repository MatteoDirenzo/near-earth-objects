import { useContext, useEffect, useMemo, useState } from "react";
import Arealegend from "./components/AreaLegend";
import { ApiContext } from "./App";
import axios from "axios";
import ListItem from "./components/ListItem";
import Loader from "./Loader";

export default function RightSide({ date }) {
  const { api_key } = useContext(ApiContext);
  const [startDate, setStartDate] = useState(new Date());
  const parsedDate = startDate.toString().substring(0, 3).toLowerCase();
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    days.map(() => {
      const start = days.findIndex((day) => day === "mon");
      const end = days.findIndex((day) => day === parsedDate);
      const sum = start - end < 0 ? -(start - end) : start - end;
      return setStartDate(
        new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() - sum,
          startDate.getHours() + 1
        )
      );
    });
    axios
      .get("https://api.nasa.gov/neo/rest/v1/feed", {
        params: {
          start_date: startDate.toISOString().substring(0, 10),
          api_key: api_key,
        },
      })
      .then((res) => {
        const arrayTemp = [];
        const keys = Object.keys(res.data.near_earth_objects);
        for (let i = 0; i < keys.length; i++) {
          const daysObjects = res.data.near_earth_objects[keys[i]];
          daysObjects.map((dayObject) =>
            arrayTemp.push([
              dayObject.absolute_magnitude_h,
              dayObject.name,
              (dayObject.estimated_diameter.kilometers.estimated_diameter_min +
                dayObject.estimated_diameter.kilometers
                  .estimated_diameter_max) /
                2,
            ])
          );
          if (i === keys.length - 1) {
            setIsLoading(false);
            setData(arrayTemp);
          }
        }
      })
      .catch((e) => console.error(e));
  }, []);

  useMemo(() => {
    if (data.length !== 0) {
      data.sort((a, b) => b[0] - a[0]);
    }
  }, [data]);

  return (
    <div className="bg-blueToDark flex flex-col" id="left">
      <h1 className="underline text-white font-avenir text-[20px] mt-[42px] font-extra-bold ml-[70px]">
        Brightest of the week
      </h1>
      <h2 className="text-white font-avenir text-[13px] mt-[41.5px] font-extra-bold self-start ml-[70px]">
        MAGNITUDE
      </h2>
      <Arealegend />
      <div className="h-full w-full  mt-[30px] flex flex-col justify-around items-center">
        {isLoading ? (
          <Loader />
        ) : (
          data.slice(0, 5).map((dat, key) => {
            return (
              <div key={key} className="flex items-center">
                <ListItem dat={dat} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
