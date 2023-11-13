import { createGlobalStyle } from "styled-components"
import { normalize } from "polished"
// import { above, below } from "./utilities/breakpoints"

const GlobalStyles = createGlobalStyle`

${normalize()};

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

a:link, a:visited {
  color: ${props => props.theme.colors.link};
  overflow-wrap: anywhere;
}

strong {
  font-weight: bold;
}

.divider-center {
  display: flex;
  align-items: center;
    margin: 2rem -1rem 2rem;
    &:before,
    &:after {
      content: "";
    flex: 1;
    height: 1px;
    margin: 0.15rem 1rem 0;
    background: #000
    }
}

.gatsby-image-wrapper {
   position: relative;
   z-index: 0; 
}

figure {
    margin-inline-start: 0;
    margin-inline-end: 0;
}

figcaption {
    font-size: 0.8rem;
    max-width: 90%;
    text-align: right;
    margin: 0.25rem auto;
    color: #777;
  }

a.button-more {
  font-family: "din-2014", sans-serif;
  padding: .5rem 1rem;
  text-decoration: none;
  border-radius: 1rem;
  display: inline-block;
  color: ${props => props.theme.colors.red};
  border: 1px solid ${props => props.theme.colors.red};
  transition: all .25s ease-in-out;

  &:hover {
    background-color: ${props => props.theme.colors.red};
    color: #ffffff
  }
}





.case-types {
  display: grid;
  grid-gap: 40px;
  grid-template-columns: 1fr 1fr
}


`

export default GlobalStyles
