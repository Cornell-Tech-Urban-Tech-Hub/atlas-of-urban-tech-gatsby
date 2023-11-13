import React, { useEffect, useState, useRef } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
//import tooltip } from "./tooltip.module.css"
import styled from "styled-components"

const vizTitle = ``
const vizDesc = `` // Accessibility
const vizSource = ``

const Wrapper = styled.div`
  margin: 0;
  position: relative;
`

export function ChartTimeline({ dataset, height = 500, vizId = "timeline" }) {
  //ComponentDidMount - Initialize
  let ends = dataset.filter(d => isNum(d.timeframe.end))
  let minYear = d3.min(dataset, d => d.timeframe.start)
  let maxYearStart = d3.max(dataset, d => d.timeframe.start)
  let maxYearEnd = d3.max(
    dataset.filter(d => isNum(d.timeframe.end)),
    d => d.timeframe.end
  )
  let maxYear = d3.max([maxYearStart, maxYearEnd])

  let spans = dataset.filter(d => d.timeframe.span)
  console.log("spans")
  console.log({ minYear, maxYearEnd, maxYear })
  console.log("spans")
  console.log(spans)

  let sorted = dataset

    .filter(d => d.timeframe.start !== null && isNum(d.timeframe.start))
    .sort((a, b) => d3.ascending(a.timeframe.start, b.timeframe.start))
  console.log({ sorted })

  let width = 700
  //let height = 700

  const divRef = useRef(null)
  // const selectionRef = useRef(null)

  function drawChart() {
    // console.log(divWidth) // NOT WORKING
    width = divRef.current.getBoundingClientRect().width
    console.log({ width })
    let margin = { top: 20, right: 20, bottom: 80, left: 150 }

    // height = width - margin.left - margin.right + margin.top + margin.bottom

    let innerHeight = height - margin.top - margin.bottom
    let innerWidth = width - margin.left - margin.right

    const svg = d3
      .create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("id", vizId)
      .attr("aria-label", vizDesc)

    // Main chart group/area inset by top/left margin
    const group = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    // const svg = d3.select(ref.current)
    const yScale = d3
      .scaleBand()
      .range([0, innerHeight])
      .domain(sorted.map(d => d.frontmatter.title))
      .padding(0.3)
    const xScale = d3
      .scaleLinear()
      .range([0, innerWidth])
      .domain([minYear, maxYear])
      .nice()

    // Define and Call Axes
    // let yAxis = d3.axisLeft(yScale)
    // let xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"))

    // group
    //   .append("g")
    //   .attr("class", "x axis")
    //   .attr("transform", "translate(" + 0 + "," + (innerHeight + 20) + ")")
    //   .call(xAxis)
    //   .call(g => g.selectAll(".domain").remove())
    //   .selectAll("text")
    //   .attr("y", 4)
    //   .attr("x", 4)
    //   .attr("dy", ".35em")
    //   .attr("transform", "rotate(45)")
    //   .style("text-anchor", "start")

    // group
    //   .append("g")
    //   .attr("class", "y axis")
    //   .call(yAxis)
    //   .call(g => g.selectAll(".domain").remove())

    const xAxis = g =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0).tickFormat(d3.format("d")))
    const yAxis = g =>
      g
        .attr("transform", `translate(0,0)`)
        .call(d3.axisLeft(yScale))
        .call(g_local => g_local.select(".domain").remove())

    group
      .selectAll(".caselines")
      .data(sorted.filter(d => d.timeframe.span && isNum(d.timeframe.end)))
      .join("g")
      .attr("class", "caselines")
      .append("line")
      // .attr("fill", "none")
      // .attr("stroke-linejoin", "round")
      // .attr("stroke-linecap", "round")
      .attr("stroke-width", 2)
      .attr("stroke", d => "red") // teamColors[d.teamClass]
      .attr("stroke-opacity", 3)
      .attr("y1", d => yScale(d.frontmatter.title))
      .attr("y2", d => yScale(d.frontmatter.title))
      .attr("x1", d => xScale(d.timeframe.start))
      .attr("x2", d => xScale(d.timeframe.end))

    let cases = group
      .selectAll(".point-start")
      .data(sorted)
      .join("g")
      .attr("class", ".casepoint")
      .attr("transform", function (d, i) {
        return `translate(${xScale(
          d.timeframe.start
        )},${yScale(d.frontmatter.title)})`
      })

    cases
      .append("circle")
      .attr("r", 8)
      .attr("fill", "red")
      .attr("stroke-width", 2)
      .attr("stroke", d => "#fff") // teamColors[d.teamClass]
    cases
      .append("text")
      .attr("class", "label")
      .attr("x", -15)
      .attr("dy", ".35em")
      //.attr('alignment-baseline', 'middle')
      .attr("text-anchor", "end")
      .attr("fill", "red")
      .text(d => {
        return `${d.frontmatter.title}`
      })
      .style("font-size", ".75rem")

    group.append("g").attr("class", "x-axis").call(xAxis)

    return svg
  }

  useEffect(() => {
    // console.log(`ComponentDidMount`)

    //Append d3 svg to ref div
    var div = d3.select(divRef.current)

    let svg = drawChart()
    if (div.node().firstChild) {
      div.node().removeChild(div.node().firstChild)
    }
    div.node().appendChild(svg.node())
  })

  return (
    <Wrapper>
      <div id={vizId} ref={divRef} />{" "}
      <small
        dangerouslySetInnerHTML={{
          __html: vizSource,
        }}
      />
    </Wrapper>
  )
}

function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n) && n !== ""
}
