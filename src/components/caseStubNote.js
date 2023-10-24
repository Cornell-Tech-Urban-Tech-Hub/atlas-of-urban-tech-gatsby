import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import { tint } from "polished"
import theme from "../styles/Theme"

const StubNoteStyled = styled.div`
  margin: 1rem 0;
  padding: 0.25rem 1rem;
  border-radius: 0.5rem;
  background-color: ${props => tint(0.85, props.theme.colors.red)};
`

export const CaseStubNote = ({}) => {
  return (
    <StubNoteStyled>
      <p>
        This is a stub that does not represent a full case study but had been
        identified as a relevant example and is capable of expansion.{" "}
        <Link to={`/stubs`}>Learn more.</Link>
      </p>
    </StubNoteStyled>
  )
}
