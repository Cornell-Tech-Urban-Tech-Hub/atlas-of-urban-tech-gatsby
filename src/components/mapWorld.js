// src/components/WorldMap.js
import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"

const projection = d3
  .geoEqualEarth()
  .scale(160)
  .translate([800 / 2, 450 / 2])

const MapWorld = () => {
  const [geographies, setGeographies] = useState([])

  useEffect(() => {
    fetch("/data/countries-110m.topojson.json").then(response => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`)
        return
      }
      response.json().then(worlddata => {
        setGeographies(
          topojson.feature(worlddata, worlddata.objects.countries).features
        )
      })
    })
  }, [])

  return (
    <svg width={800} height={450} viewBox="0 0 800 450">
      <g className="countries">
        {geographies.map((d, i) => (
          <path
            key={`path-${i}`}
            d={d3.geoPath().projection(projection)(d)}
            className="country"
            fill={`#ccc`}
            stroke="#FFFFFF"
            strokeWidth={0.5}
          />
        ))}
      </g>
      {/* <g className="markers">
        <circle
          cx={this.projection()([8, 48])[0]}
          cy={this.projection()([8, 48])[1]}
          r={10}
          fill="#E91E63"
          className="marker"
        />
      </g> */}
    </svg>
  )
}

export default MapWorld
