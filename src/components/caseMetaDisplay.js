import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import datadict from "../content/data/data-dictionary.json"

const StatusTagStyled = styled.div`
  /* display: inline-block; */
  margin-right: 4px;
  margin-bottom: 4px;

  .status {
    font-family: ${({ theme }) => theme.type.sans};
    padding: 2px 6px;
    border-radius: 4px;
    color: #fff;
    background-color: #777;
  }

  .status-draft {
    background-color: #f4d036;
  }
  .status-review {
    background-color: #fb0066;
  }
  .status-complete {
    background-color: #00c0f3;
  }
`

export const CaseStatusTag = ({ node }) => {
  return (
    <>
      {node.frontmatter.status ? (
        <StatusTagStyled>
          <span
            className={`status status-${node.frontmatter.status?.toLowerCase()}`}
          >
            {node.frontmatter.status}
          </span>
        </StatusTagStyled>
      ) : (
        <div className="note-missing">Add Status</div>
      )}
    </>
  )
}

const TypeTagStyled = styled.div`
  .tag-type {
    display: inline-block;
    margin-right: 4px;
    margin-bottom: 4px;

    font-family: ${({ theme }) => theme.type.sans};
    padding: 2px 6px;
    border-radius: 4px;
    color: #fff;
    background-color: #777;
  }
  .type-plan {
    background-color: ${datadict.plan.color};
  }
  .type-district {
    background-color: ${datadict.district.color};
  }
`

export const CaseTypeTag = ({ node }) => {
  const classtext = node.frontmatter.type?.toLowerCase()
  const label = datadict[node.frontmatter.type]?.label

  return (
    <TypeTagStyled>
      <div className={`tag-type type-${classtext}`}>{label}</div>
      {/* <div className={`type type-${classtext}`}>{node.frontmatter.type}</div> */}
    </TypeTagStyled>
  )
}

export function textCaseTimeframe(node) {
  let start = node.frontmatter.year_start
  let completed = node.frontmatter.year_completed

  let text = ""
  if (start) {
    text += start
    // if (completed) {
    //   text += `—${completed}`
    // } else {
    //   text += `—Ongoing`
    // }
    if (completed && completed !== "") {
      text += `—${completed}`
    }
  } else {
    text += "Timeframe N/A"
  }

  return text
}

export const CaseTimeframe = ({ node }) => {
  return (
    <>
      {node.frontmatter.year_start ? (
        <div>{textCaseTimeframe(node)}</div>
      ) : (
        <div className="note-missing">
          Add Year Started (and completed if applicable)
        </div>
      )}
    </>
  )
}
