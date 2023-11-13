/* Header Compass  */
import React from "react"
import styled from "styled-components"
import { tint } from "polished"

export const CompassElement = styled.div`
  display: inline-block;
  margin-top: 0.5em;
  width: 5em;
  height: 5em;
  background-color: #fff;
  position: relative;
  border-radius: 60px;
  -moz-border-radius: 60px;
  -webkit-border-radius: 60px;
  -webkit-animation: main-compass-animation 20s infinite; /* Safari 4+ */
  -moz-animation: main-compass-animation 20s infinite; /* Fx 5+ */
  -o-animation: main-compass-animation 20s infinite; /* Opera 12+ */
  animation: main-compass-animation 20s infinite; /* IE 10+, Fx 29+ */
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 1.5s ease-in-out;

  svg {
  }

  @keyframes main-compass-animation {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(30deg);
    }
    35% {
      transform: rotate(60deg);
    }
    50% {
      transform: rotate(-30deg);
    }
    70% {
      transform: rotate(-50deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  @keyframes main-compass-animation-hover {
    100% {
      transform: rotate(180deg);
    }
  }

  svg {
    width: 100%;

    .south,
    .north,
    .center {
      stroke-width: 0px;
    }

    .south {
      //fill: #dadbdc;
      fill: ${props => tint(0.9, props.theme.colors.red)};
    }

    .north {
      // fill: #c41230;
      fill: ${props => tint(0.7, props.theme.colors.red)};
    }

    .center {
      fill: #fff;
    }
  }
`

export const Compass = ({}) => {
  let color = props => tint(0.85, props.theme.colors.red)

  return (
    <CompassElement>
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
      >
        <polygon className="south" points="26 18 18 33 10 18 26 18" />
        <polygon className="north" points="10 18 18 3 26 18 10 18" />
        <circle className="center" cx="18" cy="18" r="3.57" />
        {/* <rect className="cls-1" width="36" height="36" /> */}
      </svg>
    </CompassElement>
  )
}
