import { useEffect, useContext } from "react";
import axios from "axios";
import * as d3 from "d3";
import { ApiContext } from "../App";

function Scatterplot({ data, setData, svgRef, date, setIsLoading, ...rest }) {
  const { api_key } = useContext(ApiContext);

  function parseId(id) {
    const text = id;
    return text
      .replace("(", "")
      .replace(")", "")
      .replace(/([0-9])/g, "")
      .trim();
  }

  function limitDiameter(diameter) {
    if (diameter <= 7) {
      return 7;
    }
    if (diameter >= 50) {
      return 50;
    }
    return diameter;
  }

  useEffect(() => {
    const createScatterplot = () => {
      if (data.length !== 0) {
        const parent = document.getElementById("Scatterplot");
        const w = parent.clientWidth;
        const h = parent.clientHeight;
        //container
        const svg = d3
          .select(svgRef.current)
          .attr("width", w)
          .attr("height", h)
          .style("overflow", "visible");
        if (document.querySelectorAll("line").length === 0) {
          //4 lines
          svg
            .append("line")
            .attr("x1", "25")
            .attr("x2", "1045")
            .attr("y1", "80")
            .attr("y2", "80")
            .attr("stroke-width", "0.5")
            .attr("stroke", "white");
          svg
            .append("line")
            .attr("x1", "25")
            .attr("x2", "1045")
            .attr("y1", "220")
            .attr("y2", "220")
            .attr("stroke-width", "0.5")
            .attr("stroke", "white");
          svg
            .append("line")
            .attr("x1", "25")
            .attr("x2", "1045")
            .attr("y1", "340")
            .attr("y2", "340")
            .attr("stroke-width", "0.5")
            .attr("stroke", "white");
          svg
            .append("line")
            .attr("x1", "25")
            .attr("x2", "1045")
            .attr("y1", "460")
            .attr("y2", "460")
            .attr("stroke-width", "0.5")
            .attr("stroke", "white");
          // distance arrow
          svg
            .append("line")
            .attr("x1", "30")
            .attr("x2", "40")
            .attr("y1", "425")
            .attr("y2", "435")
            .attr("stroke-width", "2")
            .attr("stroke", "white");
          svg
            .append("line")
            .attr("x1", "30.5")
            .attr("x2", "20")
            .attr("y1", "425")
            .attr("y2", "435")
            .attr("stroke-width", "2")
            .attr("stroke", "white");
          svg
            .append("line")
            .attr("x1", "30")
            .attr("x2", "30")
            .attr("y1", "427")
            .attr("y2", "447")
            .attr("stroke-width", "2")
            .attr("stroke", "white");
          //velocity arrow
          svg
            .append("line")
            .attr("x1", "50")
            .attr("x2", "40")
            .attr("y1", "480")
            .attr("y2", "490")
            .attr("stroke-width", "2")
            .attr("stroke", "white");
          svg
            .append("line")
            .attr("x1", "50")
            .attr("x2", "40")
            .attr("y1", "481")
            .attr("y2", "470")
            .attr("stroke-width", "2")
            .attr("stroke", "white");
          svg
            .append("line")
            .attr("x1", "50")
            .attr("x2", "30")
            .attr("y1", "480")
            .attr("y2", "480")
            .attr("stroke-width", "2")
            .attr("stroke", "white");
          //axis labels
          svg
            .append("text")
            .attr("x", w / 2 - 490)
            .attr("y", h - 80)
            .attr("font-family", "Avenir")
            .attr("font-weight", "300")
            .attr("fill", "white")
            .text("DISTANCE (au)");
          svg
            .append("text")
            .attr("x", w / 2 - 480)
            .attr("y", h - 40)
            .attr("font-family", "Avenir")
            .attr("font-weight", "300")
            .attr("fill", "white")
            .text("VELOCITY (km/s)");
        }
        //scale
        const xScale = d3.scaleLinear().domain([0, 60]).range([0, w]);
        const yScale = d3.scaleLinear().domain([0, 50]).range([h, 0]);

        const defs = svg.append("defs");
        const radialGradient = defs
          .append("radialGradient")
          .attr("id", "radialGradient");

        radialGradient
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", "#2AF59833");
        radialGradient
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "#2AF598");
        //data
        svg.selectAll("circle").remove();
        svg.selectAll("rect").remove();
        svg.selectAll("g").remove();

        const Tooltip = svg
          .selectAll()
          .data(data)
          .enter()
          .append("g")
          .attr("id", (d) => parseId(d[3]));

        Tooltip.append("rect")
          .attr("width", 183)
          .attr("height", 140)
          .attr("x", (d) => xScale(d[2]) + 10)
          .attr("y", (d) => yScale(d[1]) + 5)
          .attr("fill", "rgba(17, 54, 71, 0.4)")
          .attr("background-opacity", "0.4")
          .attr("stroke-width", "1")
          .attr("stroke", "#ffffff")
          .attr("opacity", "0");

        Tooltip.append("text")
          .attr("x", (d) => xScale(d[2]) + 40)
          .attr("y", (d) => yScale(d[1]) + 40)
          .attr("font-size", "13")
          .attr("font-family", "Avenir")
          .attr("font-weight", "300")
          .attr("fill", "white")
          .attr("opacity", "0")
          .text((d) => `Name: ${d[3]}`);

        Tooltip.append("text")
          .attr("x", (d) => xScale(d[2]) + 40)
          .attr("y", (d) => yScale(d[1]) + 60)
          .attr("font-size", "13")
          .attr("font-family", "Avenir")
          .attr("font-weight", "300")
          .attr("fill", "white")
          .attr("opacity", "0")
          .text((d) => `Diameter: ${(d[0] / 100).toFixed(5)} km`);

        Tooltip.append("text")
          .attr("x", (d) => xScale(d[2]) + 40)
          .attr("y", (d) => yScale(d[1]) + 80)
          .attr("font-size", "13")
          .attr("font-family", "Avenir")
          .attr("font-weight", "300")
          .attr("fill", "white")
          .attr("opacity", "0")
          .text((d) => `Magnitude: ${d[4]} h`);

        Tooltip.append("text")
          .attr("x", (d) => xScale(d[2]) + 40)
          .attr("y", (d) => yScale(d[1]) + 100)
          .attr("font-size", "13")
          .attr("font-family", "Avenir")
          .attr("font-weight", "300")
          .attr("fill", "white")
          .attr("opacity", "0")
          .text((d) => `Distance: ${(d[1] / 100).toFixed(5)} au`);

        Tooltip.append("text")
          .attr("x", (d) => xScale(d[2]) + 40)
          .attr("y", (d) => yScale(d[1]) + 120)
          .attr("font-size", "13")
          .attr("font-family", "Avenir")
          .attr("font-weight", "300")
          .attr("fill", "white")
          .attr("opacity", "0")
          .text((d) => `velocity: ${Math.round(d[2])} km/s`);

        svg
          .selectAll()
          .data(data)
          .enter()
          .append("circle")
          .attr("id", (d) => d[3])
          .attr("cx", (d) => xScale(d[2]))
          .attr("cy", (d) => yScale(d[1]))
          .on("mouseover", (d, i) => {
            svg
              .select(`#${parseId(i[3])}`)
              .select("rect")
              .transition()
              .duration(300)
              .attr("opacity", "1");
            svg
              .select(`#${parseId(i[3])}`)
              .selectAll("text")
              .transition()
              .duration(300)
              .attr("opacity", "1");
          })
          .on("mouseout", (d, i) => {
            svg
              .select(`#${parseId(i[3])}`)
              .select("rect")
              .transition()
              .duration(300)
              .attr("opacity", "0");
            svg
              .select(`#${parseId(i[3])}`)
              .selectAll("text")
              .transition()
              .duration(300)
              .attr("opacity", "0");
          })
          .transition()
          .duration(700)
          .attr("r", (d) => limitDiameter(d[0]))
          .attr("fill", "url(#radialGradient)")
          .style("fill-opacity", "0.2")
          .style("stroke-width", 1)
          .style("stroke", "#2AF598");

        svg
          .selectAll()
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", (d) => xScale(d[2]))
          .attr("cy", (d) => yScale(d[1]))
          .attr("r", 1)
          .attr("fill", "#2AF598");
      }
    };

    createScatterplot();
  }, [data]);

  useEffect(() => {
    setData([]);
    setIsLoading(true);
    axios
      .get("https://api.nasa.gov/neo/rest/v1/feed", {
        params: {
          start_date: date.toISOString().substring(0, 10),
          end_date: date.toISOString().substring(0, 10),
          api_key: api_key,
        },
      })
      .then((res) => {
        const arrayTemp = [];
        for (
          let i = 0;
          i <
          res.data.near_earth_objects[date.toISOString().substring(0, 10)]
            .length;
          i++
        ) {
          const diameter =
            ((res.data.near_earth_objects[date.toISOString().substring(0, 10)][
              i
            ].estimated_diameter.kilometers.estimated_diameter_min +
              res.data.near_earth_objects[date.toISOString().substring(0, 10)][
                i
              ].estimated_diameter.kilometers.estimated_diameter_max) /
              2) *
            100;
          const velocity =
            res.data.near_earth_objects[date.toISOString().substring(0, 10)][i]
              .close_approach_data[0].relative_velocity.kilometers_per_second;
          const distance =
            res.data.near_earth_objects[date.toISOString().substring(0, 10)][i]
              .close_approach_data[0].miss_distance.astronomical * 100;
          const name =
            res.data.near_earth_objects[date.toISOString().substring(0, 10)][i]
              .name;
          const magnitude =
            res.data.near_earth_objects[date.toISOString().substring(0, 10)][i]
              .absolute_magnitude_h;
          arrayTemp.push([diameter, velocity, distance, name, magnitude]);
          if (
            i ===
            res.data.near_earth_objects[date.toISOString().substring(0, 10)]
              .length -
              1
          ) {
            setIsLoading(false);
            return setData(arrayTemp);
          }
        }
      })
      .catch((e) => console.error(e));
  }, [date]);

  return (
    <div id="Scatterplot" className="w-full h-full flex items-center">
      <svg ref={svgRef} {...rest}></svg>
    </div>
  );
}

export default Scatterplot;
