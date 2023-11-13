import React, { useEffect, useState, useRef } from "react"

import * as d3 from "d3"
//import * as topojson from "topojson-client"
import styled from "styled-components"
import dataDict from "../../content/data/data-dictionary.json"
import { GlobeCaseCard } from "./globeCaseCard"
import { GlobeInfo } from "./globeInfo"

// import datacsv from "./data.csv"

// let topo = await fetch('data/countries-110m.topojson.json').then((d) => d.json());
// countries = tsopojson.feature(topo, topo.objects.countries).features;
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

// const dataDict = {
//   plan: {
//     color: "red",
//   },
//   stub: {
//     color: "purple",
//   },
// }

const ChartWrapper = styled.div`
  margin: 0;
  position: relative;
  svg {
    width: 100%;
    display: block;
  }
`

const SetButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`

const TooltipBox = styled.div`
  position: absolute;
  text-align: center;
  min-width: 30px;
  border-radius: 4px;
  height: auto;
  background: rgba(250, 250, 250, 0.9);
  border: 1px solid #ddd;
  font-size: 0.8rem;
  padding: 4px 8px;
  text-align: left;
  opacity: 0;
  font-family: ${props => props.theme.type.sans};
  span {
    text-transform: capitalize;
  }
`

const sensitivity = 75
const colors = {
  water: "#b0c8c0", // #bfd7e4 red f1cac0
  land: "#eaeaea", //   f4eee1
  borders: "#aaaaaa",
  graticules: "#ffffff",
}

export function GlobeVizA3({
  vizId = "globe",
  height = 500,
  geoData,
  locations,
  nodeHoverTooltip,
  infoOpen = true,
}) {
  let width = 700
  //let height = 700

  const divRef = useRef(null)

  const [selectedPoint, setSelectedPoint] = React.useState({})
  const [selected, setSelected] = React.useState(false)

  const [countries, setCountries] = useState([])
  const [borders, setBorders] = useState([])
  const [targetPoint, setTargetPoint] = useState([])

  const [globeInfoOpen, setGlobeInfoOpen] = React.useState(infoOpen)

  function globeInfoToggle() {
    setGlobeInfoOpen(!globeInfoOpen)
    //console.log(globeInfoOpen)
  }

  function handleClose(e) {
    setSelected(false)

    //let select = d3.select(".point .selected")

    d3.select(`#${vizId} .point .selected`)
      .classed("selected", false)
      .attr("stroke", "#fff")
  }

  function drawGlobe() {
    // console.log(dataset)
    // console.log("DRAW GLOBE")
    // console.log(locations)

    // let selectionSVG = d3.select(divRef.current).select("svg") // Unused
    // console.log(divWidth) // NOT WORKING

    width = divRef.current.getBoundingClientRect().width

    // console.log(`Globe Width: ${width}`)
    let margin = { top: 10, right: 10, bottom: 10, left: 10 }
    let innerHeight = height - margin.top - margin.bottom
    let innerWidth = width - margin.left - margin.right

    let size = Math.min(innerHeight, innerWidth)

    const sphere = { type: "Sphere" }

    let projection = d3
      .geoOrthographic()
      // .scale(240)
      .fitWidth(size, sphere)
      .center([0, 0])
      .rotate([0, -30])
      .translate([innerWidth / 2, innerHeight / 2])

    const initialScale = projection.scale()
    // console.log(`Globe initialScale: ${initialScale}`)
    let path = d3.geoPath().projection(projection)
    let graticule = d3.geoGraticule()

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

    // Globw halo
    group
      .append("path")
      .datum(sphere)
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 30)

    group
      .append("path")
      .datum(sphere)
      .attr("d", path)
      .attr("fill", colors.water)
      .attr("stroke", "#none")
      .attr("stroke-width", "0")

    group
      .append("path")
      .datum(graticule())
      .attr("class", "graticule")
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", colors.graticules)
      .attr("stroke-width", "0.5px")

    let country = group
      .selectAll("country")
      .data(geoData.countries)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", path)
      .style("fill", d => {
        return colors.land
      })

    group
      .append("path")
      .datum(geoData.borders)
      .attr("d", path)
      .attr("class", "borders")
      .style("fill", "none")
      .style("stroke", colors.borders)
      .style("stroke-width", "0.3px")

    const coord = d => {
      // console.log("COORD")
      let str = path(d)
      if (str) {
        let [sub, x, y] = str.match(/^M([-0-9.]+),([-0-9.]+)/)
        return [+x, +y]
      }
      return [10, 10]
    }

    const coordVisible = d => {
      let str = path(d)
      if (str) {
        return true
      }
      return false
    }

    let point = group
      .selectAll("point")
      .data(locations.collection, d => d.properties.id)
      .join("g")
      .attr("class", d => `point point-${d.properties.id}`)
      .attr("visibility", d => {
        let visible = coordVisible(d)
        return visible ? "visible" : "hidden"
      })
      .attr("transform", d => `translate(${coord(d)})`)

    point
      .append("circle")
      .style("pointer-events", "all")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 5)
      .attr("fill", d => {
        let template = d.properties.frontmatter.template
        let type = d.properties.frontmatter.type
        return template !== "case-study"
          ? dataDict[template]?.color
          : dataDict[type]?.color
      })
      .attr("stroke", "#fff")
      .on("mouseover", pointMouseOver)
      .on("mouseout", pointMouseOut)
      .on("click", pointClick)

    const addTooltip = (event, d) => {
      //div.transition().duration(200).style("opacity", 0.9)
      d3.select("#graph-tooltip").style("opacity", 0.9)
      d3.select("#graph-tooltip")
        //.html(hoverTooltip(d))
        .html(`<div><strong>${d.properties.frontmatter.title}</strong></div>`)
        .style("pointer-events", "none")
        .style("max-width", "250px")
        .style("z-index", 300)
        .style("left", `${event.offsetX + 20}px`)
        .style("top", `${event.offsetY + 20}px`)
    }

    const removeTooltip = () => {
      //div.transition().duration(200).style("opacity", 0)
      d3.select("#graph-tooltip").style("opacity", 0)
    }

    function pointMouseOver(event, d) {
      let fadeOpacity = 0.2
      d3.select(event.target).attr("stroke", "#000")
      addTooltip(event, d)
    }
    function pointMouseOut(event, d) {
      let isSelected = d3.select(event.target).classed("selected")
      d3.select(event.target).attr("stroke", e => {
        return isSelected ? "red" : "#fff"
      })
      removeTooltip()
    }

    function pointClick(event, d) {
      setSelectedPoint(d)
      setSelected(true)

      if (globeInfoOpen) {
        setGlobeInfoOpen(false)
      }

      d3.select(".point .selected")
        .classed("selected", false)
        .attr("stroke", "#fff")

      d3.select(event.target).classed("selected", true)
      d3.select(event.target).attr("stroke", "red")
    }

    group
      .call(
        d3
          .drag()
          .on("drag", event => {
            const rotate = projection.rotate()
            const k = sensitivity / projection.scale()
            projection.rotate([
              rotate[0] + event.dx * k,
              rotate[1] - event.dy * k,
            ])
            path = d3.geoPath().projection(projection)

            // Update path
            svg.selectAll("path").attr("d", path)

            // Update points
            svg
              .selectAll(".point")
              .attr("visibility", d => {
                let visible = coordVisible(d)
                return visible ? "visible" : "hidden"
              })
              .attr("transform", d => `translate(${coord(d)})`)
          })
          .on("end", function (d) {
            // console.log("drag end")
            // console.log(projection.rotation)
          })
      )
      .call(
        d3.zoom().on("zoom", event => {
          if (event.transform.k > 0.3) {
            projection.scale(initialScale * event.transform.k)
            path = d3.geoPath().projection(projection)

            // Update path
            svg.selectAll("path").attr("d", path)

            // Update points
            svg
              .selectAll(".point")
              .attr("visibility", d => {
                let visible = coordVisible(d)
                return visible ? "visible" : "hidden"
              })
              .attr("transform", d => `translate(${coord(d)})`)
          } else {
            event.transform.k = 0.3
          }
        })
      )

    return svg
  }

  useEffect(() => {
    var div = d3.select(divRef.current)
    let svg = drawGlobe()
    if (div.node().firstChild) {
      div.node().removeChild(div.node().firstChild)
    }
    div.node().appendChild(svg.node())
  }, [geoData])

  //Render
  return (
    <>
      <ChartWrapper>
        <GlobeInfo
          open={globeInfoOpen}
          handleToggle={globeInfoToggle}
        ></GlobeInfo>
        {selected && (
          <GlobeCaseCard
            selectedPoint={selectedPoint}
            handleClose={handleClose}
          />
        )}
        <div id={vizId} ref={divRef} />
        <small
          dangerouslySetInnerHTML={{
            __html: vizSource,
          }}
        />
        <TooltipBox id="graph-tooltip"></TooltipBox>
      </ChartWrapper>
    </>
  )
}
