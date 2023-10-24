import React from "react"
import * as ReactDOMServer from "react-dom/server"
import styled from "styled-components"
import { Content } from "../styles/StyledElements"
import { below } from "../styles/utilities/breakpoints"
import { TopoPattern } from "../components/pattern/topoPattern"

import { tint } from "polished"
import theme from "../styles/Theme"
const svgString = encodeURIComponent(
  ReactDOMServer.renderToStaticMarkup(
    <TopoPattern color={tint(0.7, theme.colors.red)} />
  )
)

export const SimpleHeader = styled.div`
  // grid-template-columns: 3fr 1fr;
  // grid-gap: 40px
  min-height: 200px;
  //background-color: ${({ theme }) => theme.colors.red};
  background-color: ${props => tint(0.85, props.theme.colors.red)};
  background-image: url("data:image/svg+xml,${svgString}");
  background-size: cover;
  /* border-bottom: 1px solid ${props => tint(0.85, props.theme.colors.red)}; */
  position: relative;
  padding: 1rem;

  .tags {
    max-width: 90%;
  }

  h1 {
    position: absolute;
    top: 20px;
    max-width: 80%;
    padding: 0.5rem;
    span {
      padding: 0.5rem 0;
      background-color: white;
      box-shadow: 10px 0 0 white, -10px 0 0 white;
      box-decoration-break: clone;
    }

    ${below.md} {
      font-size: 2rem;
    }
  }

  .image-block {
  }
`

export const PageSimpleHeader = ({ title }) => {
  return (
    <SimpleHeader>
      <Content>
        <h1>
          <span>{title}</span>
        </h1>
      </Content>
    </SimpleHeader>
  )
}
