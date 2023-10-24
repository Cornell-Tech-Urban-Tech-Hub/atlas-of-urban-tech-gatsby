import React, { useEffect, useState, useRef } from "react"
import { useSpring } from "react-spring"

import * as d3 from "d3"
import * as topojson from "topojson-client"
//import tooltip } from "./tooltip.module.css"
import styled from "styled-components"
// import D3Component from "./D3Component"
import { useStaticQuery, graphql } from "gatsby"

// import datacsv from "./data.csv"

// let topo = await fetch('data/countries-110m.topojson.json').then((d) => d.json());
// countries = topojson.feature(topo, topo.objects.countries).features;
// borders = topojson.mesh(topo, topo.objects.countries, (a, b) => a !== b);

// let defaultCentroid = { lon: 30, lat: -50 };

// $: {
//   if ($activeCase === null) {
//     lonRotation.set(defaultCentroid.lon);
//     latRotation.set(defaultCentroid.lat);
//   } else {
//     lonRotation.set(-$activeCaseData.lon);
//     latRotation.set(-$activeCaseData.lat);
//   }
// }

const vizTitle = ``
const vizDesc = `` // Accessibility
const vizSource = ``

let countries = null
let borders = null

const ChartWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  svg {
    width: 100%;
  }
`

const SetButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`

const sensitivity = 75
const colors = {
  water: "#bfd7e4",
  land: "#eaeaea",
  borders: "#aaaaaa",
  graticules: "#ffffff",
}

export function GlobeVizB1({
  vizId = "globe",
  height = 700,
  focusLat = 0,
  focusLon = 0,
}) {
  // console.log(data)
  // let dataset = []

  let width = 700
  let margin = { top: 10, right: 10, bottom: 10, left: 10 }

  let innerHeight = height - margin.top - margin.bottom
  let innerWidth = width - margin.left - margin.right

  let projection = d3
    .geoOrthographic()
    .scale(250)
    .center([0, 0])
    .rotate([0, -30])
    .translate([width / 2, height / 2])

  let path = d3.geoPath().projection(projection)

  let graticule = d3.geoGraticule()

  const [countries, setCountries] = useState([])
  const [borders, setBorders] = useState([])

  const divRef = useRef(null)
  const svgRef = useRef(null)
  // const selectionRef = useRef(null)

  const [targetPoint, setTargetPoint] = useState([])
  function setPosition() {
    let longitude = (Math.random() * 360 - 180).toFixed(8)
    let latitude = (Math.random() * 180 - 90).toFixed(8)
    console.log("SET POSITION")
    console.log({ longitude, latitude })
    setTargetPoint([longitude, latitude])
  }

  function drawGlobe() {
    // console.log(dataset)

    // let selectionSVG = d3.select(divRef.current).select("svg") // Unused

    // console.log(divWidth) // NOT WORKING
    width = divRef.current.getBoundingClientRect().width

    // height = width - margin.left - margin.right + margin.top + margin.bottom

    const initialScale = projection.scale()
    let path = d3.geoPath().projection(projection)

    let graticule = d3.geoGraticule()

    // filtering previous teams that havent scored more than 2 points in a season.
    // let selectSeries = standings.series.filter(d => d.maxpoints > 2)

    // Define SVG
    const svg = d3
      .create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("id", vizId)
      .attr("aria-label", vizDesc)

    // Main chart group/area inset by top/left margin
    const group = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    let globe = svg
      .append("circle")
      .attr("fill", colors.water)
      .attr("stroke", "#none")
      .attr("stroke-width", "0")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", initialScale)

    svg
      .append("path")
      .datum(graticule())
      .attr("class", "graticule")
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", colors.graticules)
      .attr("stroke-width", "0.5px")

    // console.log(countries)
    // let country = svg
    //   .selectAll("country")
    //   .data(countries)
    //   .enter()
    //   .append("path")
    //   .attr("class", "country")
    //   .attr("d", path)
    //   .style("fill", d => {
    //     return colors.land
    //     // let geo_id = d.properties.id;
    //     // let lookup = tsGeographic2020.map.get(geo_id)
    //     // if (lookup) {
    //     //   return (lookup[0].stations > 0 ) ? color(lookup[0][selectVal]) : "#CCC";
    //     // } else {
    //     //   return "#CCC";
    //     // }
    //   })

    // svg
    //   .append("path")
    //   .datum(borders)
    //   .attr("d", path)
    //   .attr("class", "borders")
    //   .style("fill", "none")
    //   .style("stroke", colors.borders)
    //   .style("stroke-width", "0.3px")

    // svg
    //   .call(
    //     d3.drag().on("drag", event => {
    //       const rotate = projection.rotate()
    //       const k = sensitivity / projection.scale()
    //       projection.rotate([
    //         rotate[0] + event.dx * k,
    //         rotate[1] - event.dy * k,
    //       ])
    //       path = d3.geoPath().projection(projection)
    //       svg.selectAll("path").attr("d", path)
    //     })
    //   )
    //   .call(
    //     d3.zoom().on("zoom", event => {
    //       if (event.transform.k > 0.3) {
    //         projection.scale(initialScale * event.transform.k)
    //         path = d3.geoPath().projection(projection)
    //         svg.selectAll("path").attr("d", path)
    //         globe.attr("r", projection.scale())
    //       } else {
    //         event.transform.k = 0.3
    //       }
    //     })
    //   )

    return svg
  }

  //ComponentDidMount - Initialize
  useEffect(() => {
    fetch("/data/countries-110m.topojson.json").then(response => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`)
        return
      }
      response.json().then(topo => {
        setCountries(topojson.feature(topo, topo.objects.countries).features)
        setBorders(
          topojson.mesh(topo, topo.objects.countries, (a, b) => a !== b)
        )
      })
    })

    // d3.select(svgRef).call(
    //   d3.drag().on("drag", event => {
    //     console.log(event.dy)
    //     // const rotate = projection.rotate()
    //     // const k = sensitivity / projection.scale()
    //     // projection.rotate([rotate[0] + event.dx * k, rotate[1] - event.dy * k])
    //     // path = d3.geoPath().projection(projection)
    //     //svg.selectAll("path").attr("d", path)
    //   })
    // )
  }, [])

  //Render
  return (
    <ChartWrapper>
      <h4>{vizTitle}</h4>
      <div id={vizId} ref={divRef}>
        <svg
          ref={svgRef}
          width={width}
          height={height}
          viewBox={`0,0,${width},${height}`}
        >
          <path
            className="sphere"
            fill={colors.water}
            d={path({ type: "Sphere" })}
          />
          <g className="graticles">
            <path
              d={path(graticule())}
              fill={"none"}
              stroke={colors.graticules}
            />
          </g>
          <g className="countries">
            {countries.map((d, i) => (
              <path
                key={`path-${i}`}
                d={path(d)}
                className="country"
                fill={colors.land}
                stroke="#FFFFFF"
                strokeWidth={0.5}
              />
            ))}
          </g>
        </svg>
      </div>
      <SetButton onClick={setPosition}>GO!</SetButton>
    </ChartWrapper>
  )
}
