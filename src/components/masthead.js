import * as React from "react"
import * as ReactDOMServer from "react-dom/server"
import styled from "styled-components"
import { above, below } from "../styles/utilities/breakpoints"

import GlobeLayout from "../components/globe/globeLayout"
import { TopoPattern } from "../components/pattern/topoPattern"
import { Compass } from "../components/compass"

import { tint } from "polished"
import theme from "../styles/Theme"
const svgString = encodeURIComponent(
  ReactDOMServer.renderToStaticMarkup(
    <TopoPattern color={tint(0.85, theme.colors.red)} />
  )
)

const MastheadStyled = styled.div`
  /* background-image: url("/images/topoPattern.svg"); */
  background-image: url("data:image/svg+xml,${svgString}");
  background-size: cover;

  .masthead-content {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;

    display: grid;
    grid-template-columns: 1fr 2fr;
    ${below.md} {
      grid-template-columns: 1fr;
    }
  }

  .graphic {
    top: 10px;
    z-index: 10;
  }

  .title {
    position: relative;
    padding: 1rem;

    .compass-wrapper {
      z-index: 10;
      div {
        border: 1px solid ${tint(0.85, theme.colors.red)};
      }
    }

    h1 {
      z-index: 100;
      line-height: 1;
      margin-bottom: 1rem;
      font-size: 3rem;

      .atlas {
        color: #c41230;
        font-size: 5rem;
      }

      .line3 {
        font-size: 3rem;
      }
    }

    p {
      z-index: 100;
      font-size: 1.2rem;
      font-family: ${({ theme }) => theme.type.serif_alt};
      .district {
        border-bottom: 3px solid ${theme.category.district};
      }
      .plan {
        border-bottom: 3px solid ${theme.category.plan};
      }
    }
  }
`

// const IntroWrapper = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   ${above.md} {
//     flex-direction: row;
//   }

//   .graphic {
//     flex-basis: 60%;
//     height: 100vh;
//     position: sticky;
//     top: 10px;
//     z-index: 10;
//     /* background: cornflowerblue; */
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     text-align: center;
//   }

//   .title {
//     flex-basis: 35%;
//     z-index: 100;
//     pointer-events: none;
//     padding: 1rem;
//   }
// `

export const Masthead = ({}) => {
  return (
    <MastheadStyled>
      <div className="masthead-content">
        <div className="title">
          <h1>
            <span className="the">The&nbsp;</span>
            <span className="atlas">Atlas</span>
            <br />
            <span className="line3">of Urban Tech</span>
          </h1>
          <p>
            A global atlas of case studies of tech-enabled urban districts and
            municipal digital masterplans.
          </p>
          <div className={"compass-wrapper"}>
            <Compass />
          </div>
        </div>
        <div className="graphic">
          <GlobeLayout />
        </div>
      </div>
    </MastheadStyled>
  )
}
