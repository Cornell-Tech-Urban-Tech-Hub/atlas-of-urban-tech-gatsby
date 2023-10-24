import React, { useEffect, useState, useRef } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
//import tooltip } from "./tooltip.module.css"
import styled from "styled-components"
// import D3Component from "./D3Component"
// import { useStaticQuery, graphql } from "gatsby"

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

const Wrapper = styled.div`
  margin: 0 auto;
  position: relative;
  svg {
    max-width: 300px;
  }
`
const sensitivity = 75
const colors = {
  water: "#bfd7e4",
  land: "#eaeaea",
  borders: "#aaaaaa",
  graticules: "#ffffff",
}

export function GlobeMarker({
  vizId = "globe",
  height = 200,
  centroid = [0, -30],
}) {
  // console.log(data)
  // let dataset = []

  let size = height
  let padding = 5
  let innerSize = size - padding * 2

  let point = {
    lat: centroid[0],
    lon: centroid[1],
  }

  let rotation = [-point.lon, -point.lat]

  const [countries, setCountries] = useState([])
  const [borders, setBorders] = useState([])

  let width = height
  //let height = 700

  let projection = d3
    .geoOrthographic()
    .scale(innerSize / 2)
    .center([0, 0])
    // .rotate([0, -30])
    .rotate(rotation)
    .translate([size / 2, size / 2])
  // .translate([width / 2, height / 2])

  let path = d3.geoPath().projection(projection)

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

        // countries = topojson.feature(topo, topo.objects.countries).features
        // borders = topojson.mesh(topo, topo.objects.countries, (a, b) => a !== b)
      })
    })
  }, [])

  return (
    <Wrapper>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <circle
          fill={"#fff"}
          stroke="#999"
          stroke-alignment="inner"
          strokeWidth={1}
          cx={size / 2}
          cy={size / 2}
          r={innerSize / 2}
        />
        <g className="countries">
          {countries.map((d, i) => (
            <path
              key={`path-${i}`}
              d={path(d)}
              className="country"
              fill={"#efefef"}
              stroke="#999"
              strokeWidth={1}
            />
          ))}
        </g>
        <g
          className="markers"
          transform={`translate(${projection([point.lon, point.lat])[0]},${
            projection([point.lon, point.lat])[1]
          })`}
        >
          {/* <circle
          cx={projection()([8, 48])[0]}
          cy={projection()([8, 48])[1]}
          r={10}
          fill="#E91E63"
          className="marker"
        /> */}
          <g className="marker-icon" transform="translate(-10 -20)">
            <path
              fill={"#444"}
              stroke={"#fff"}
              stroke-width="2"
              d="M17.5,9.5c0,5.59-7.5,13.5-7.5,13.5,0,0-7.5-7.53-7.5-13.5C2.5,5.36,5.86,2,10,2s7.5,3.36,7.5,7.5Z"
            />
          </g>
        </g>
      </svg>
    </Wrapper>
  )
}
