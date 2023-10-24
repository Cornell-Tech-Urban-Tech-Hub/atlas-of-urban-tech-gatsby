import React from "react"
import styled from "styled-components"
import { below } from "../styles/utilities/breakpoints"
// import { Link } from "gatsby"
// import Img from "gatsby-image"
// import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
// import CardReadMore from "../components/cardReadMore"
// import CardFooter from "../components/cardFooter"
// import { ListTagsSmall, ListTagsCard } from "./listTags"
import {
  Content,
  Row,
  RowWrap,
  Col,
  ColCard,
  StyledLink,
} from "../styles/StyledElements"
import { CaseCard } from "./caseCards"
import { tint, transparentize } from "polished"
import { Link } from "gatsby"

const SectionCards = styled.div`
  /* background-color: lightgrey; */

  background-color: ${props => tint(0.85, props.theme.colors.red)};
  padding-top: 2rem;
  padding-bottom: 2rem;

  &.cards-impact {
    background-color: lightgrey;
  }

  h2 {
    font-size: 1.8rem;
    margin-top: 1rem;
  }
  .description {
    font-size: 1.25rem;
    font-family: ${({ theme }) => theme.type.serif_alt};
    ${below.md} {
      font-size: 1rem;
    }
  }
`

const StyledCardsSet = styled.div`
  .options {
    margin-bottom: 1rem;
    &.centered {
      text-align: center;
    }
  }
`

export const CaseCardSection = ({ nodes, heading, description }) => {
  // console.log(nodes)
  return (
    <SectionCards className={`cards`}>
      <Content>
        <Row>
          <Col size={1}>
            <h2>{heading}</h2>
          </Col>
        </Row>

        <CaseCardsSet nodes={nodes} />

        {nodes.length === 0 && (
          <Row>
            <Col>
              <p>No Cards</p>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <div>
              <Link className={"button-more"} to={"/cases"}>
                <span>{"View all case studies"}</span>
              </Link>
            </div>
          </Col>
        </Row>
      </Content>
    </SectionCards>
  )
}

export const CaseCardsSet = ({ nodes, type }) => {
  return (
    <StyledCardsSet>
      <RowWrap>
        {nodes?.map(node => (
          <ColCard key={node.recordId}>
            <CaseCard node={node} />
          </ColCard>
        ))}
      </RowWrap>
    </StyledCardsSet>
  )
}
