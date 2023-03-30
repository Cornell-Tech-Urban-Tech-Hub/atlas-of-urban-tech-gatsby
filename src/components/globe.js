import React, { useEffect, useRef } from "react"
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
const sensitivity = 75
const colors = {
  water: "#bfd7e4",
  land: "#eaeaea",
  borders: "#aaaaaa",
  graticules: "#ffffff",
}

export function Globe2({ vizId = "globe", height = 500 }) {
  // console.log(data)
  // let dataset = []

  let width = 700
  //let height = 700

  const divRef = useRef(null)
  // const selectionRef = useRef(null)

  function drawGlobe() {
    // console.log(dataset)

    // let selectionSVG = d3.select(divRef.current).select("svg") // Unused

    // console.log(divWidth) // NOT WORKING
    width = divRef.current.getBoundingClientRect().width
    let margin = { top: 10, right: 10, bottom: 10, left: 10 }

    // height = width - margin.left - margin.right + margin.top + margin.bottom

    let innerHeight = height - margin.top - margin.bottom
    let innerWidth = width - margin.left - margin.right

    let projection = d3
      .geoOrthographic()
      .scale(250)
      .center([0, 0])
      .rotate([0, -30])
      .translate([width / 2, height / 2])

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

    svg
      .call(
        d3.drag().on("drag", event => {
          const rotate = projection.rotate()
          const k = sensitivity / projection.scale()
          projection.rotate([
            rotate[0] + event.dx * k,
            rotate[1] - event.dy * k,
          ])
          path = d3.geoPath().projection(projection)
          svg.selectAll("path").attr("d", path)
        })
      )
      .call(
        d3.zoom().on("zoom", event => {
          if (event.transform.k > 0.3) {
            projection.scale(initialScale * event.transform.k)
            path = d3.geoPath().projection(projection)
            svg.selectAll("path").attr("d", path)
            globe.attr("r", projection.scale())
          } else {
            event.transform.k = 0.3
          }
        })
      )

    return svg
  }

  //ComponentDidMount - Initialize
  useEffect(() => {
    // console.log(`ComponentDidMount`)
    fetch("/data/countries-110m.topojson.json").then(response => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`)
        return
      }
      response.json().then(topo => {
        console.log(topo)
        countries = topojson.feature(topo, topo.objects.countries).features
        borders = topojson.mesh(topo, topo.objects.countries, (a, b) => a !== b)
        // toposetGeographies(
        //   feature(worlddata, worlddata.objects.countries).features
        // )
      })
    })

    //   fetch("data/countries-110m.topojson.json")
    // .then(response => response.json())
    // .then((jsonData) => {
    //   // jsonData is parsed json object received from url
    //   console.log(jsonData)
    // })
    // .catch((error) => {
    //   // handle your errors here
    //   console.error(error)
    // })

    //Append d3 svg to ref div
    var div = d3.select(divRef.current)

    let svg = drawGlobe()
    if (div.node().firstChild) {
      div.node().removeChild(div.node().firstChild)
    }
    div.node().appendChild(svg.node())
  })

  //Render
  return (
    <ChartWrapper>
      <h4>{vizTitle}</h4>
      <div id={vizId} ref={divRef} />
      <small
        dangerouslySetInnerHTML={{
          __html: vizSource,
        }}
      />
    </ChartWrapper>
  )
}
