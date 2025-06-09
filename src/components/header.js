import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { useLocation } from "@reach/router"
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
  background-color: ${props => props.theme.colors.red};

  .header-inner {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }

  a:link,
  a:visited {
    font-weight: bold;
    color: #fff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  &.header-home {
    display: none;
  }
`

const SearchForm = styled.form`
  display: flex;
  align-items: center;
`

const SearchInput = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  width: 200px;
  margin-right: 0.5rem;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }
`

const SearchButton = styled.button`
  background: #fff;
  color: ${props => props.theme.colors.red};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  
  &:hover {
    background: #f0f0f0;
  }
`

const Header = ({ siteMetadata, title }) => {
  const location = useLocation()
  return (
    <>
      <HeaderContainer
        className={`global-header ${
          location.pathname === "/" ? "header-home" : ""
        }`}
      >
        <div className="header-inner">
          <Link className="header-link-home" to="/">
            {siteMetadata.title}
          </Link>
        </div>
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
