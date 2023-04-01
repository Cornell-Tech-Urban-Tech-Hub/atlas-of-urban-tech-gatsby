import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

// import cornellLogo from "../images/vertical-jacobs-cornell.svg"

import { below } from "../styles/utilities/breakpoints"

const StyledFooterSimple = styled.footer`
  background: #fff;
  padding: 3rem 5%;
  margin: 0 auto;
  border-top: 1px solid #333;
  color: #333;
  flex: 7;
  font-size: 0.85rem;

  a:link,
  a:visited {
    color: #333;
    text-decoration: none;
  }

  h3 {
    margin-top: 0;
    font-size: 0.85rem;
  }

  .description p {
  }
`

const FooterNav = styled.div`
  font-family: ${({ theme }) => theme.type.sans};
  font-weight: 700;
  margin-bottom: 0.5rem;

  a {
    display: inline-block;
    margin-right: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
`

const FooterSimple = ({ siteMetadata, version, location }) => {
  return (
    <StyledFooterSimple>
      <FooterNav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/map">Map</Link>
        {/* <Link to="/search">Search</Link>
                <Link to="/privacy">Privacy</Link> */}
      </FooterNav>
      {/* <p>Version: {siteMetadata.version}</p> */}
      {new Date().getFullYear()}. Atlas of Smart Cities by the Urban Tech Hub at
      the Jacobs Technion-Cornell Institute.
      <br />
      (Draft Content for Review Only)
    </StyledFooterSimple>
  )
}
export default FooterSimple

// query MyQuery {
//   allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/src/content/markdown/footer-description.md/"}}) {
//     edges {
//       node {
//         html
//       }
//     }
//   }
// }
