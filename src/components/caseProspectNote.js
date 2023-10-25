import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import { tint } from "polished"
import theme from "../styles/Theme"

const ProspectNoteStyled = styled.div`
  margin: 1rem 0;
  padding: 0.25rem 1rem;
  border-radius: 0.5rem;
  background-color: ${props => tint(0.85, props.theme.colors.red)};
`

export const CaseProspectNote = ({}) => {
  return (
    <ProspectNoteStyled>
      <p>
        This is a prospective case study that does not represent a full atlas
        entry but had been identified as a relevant example that with potential
        for expansion. <Link to={`/stubs`}>Learn more.</Link>
      </p>
    </ProspectNoteStyled>
  )
}
