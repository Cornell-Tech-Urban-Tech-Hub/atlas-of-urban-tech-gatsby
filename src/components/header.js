import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
// import styled from "styled-components"

// import Navigation from "./navigation"

// import logo from "../images/gatsby-icon.png"

// const HeaderWrapper = styled.header`
//   background: ${props => props.theme.colors.primary};
//   img {
//     margin-bottom: 0;
//   }
// `
const HeaderContainer = styled.header`
  font-family: ${props => props.theme.type.sans};
  margin: 0 auto;
  max-width: 960;
  padding: 1rem 5%;
  margin: 0 auto;
  border-bottom: 1px solid #333;
  background-color: #ddd;

  a:link,
  a:visited {
    font-weight: bold;
    color: #333;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`

const Header = ({ siteMetadata, title }) => {
  return (
    <>
      <HeaderContainer className="global-header">
        <Link className="header-link-home" to="/">
          {siteMetadata.title}
        </Link>
      </HeaderContainer>
      {/* <Navigation siteMetadata={siteMetadata} /> */}
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
