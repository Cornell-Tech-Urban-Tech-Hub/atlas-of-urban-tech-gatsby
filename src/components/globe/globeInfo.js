import React from "react"
import styled from "styled-components"
import iconMapInfo from "../../assets/icon-info.svg"
import theme from "../../styles/Theme"
import dataDict from "../../content/data/data-dictionary.json"

const GlobeInfoWrapper = styled.div`
  position: absolute;
  z-index: 1000;
  bottom: 1rem;
  right: 1rem;
`

const InfoBtn = styled.div`
  background: #ccc;
  padding: 2px;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  //background-image: url(${iconMapInfo});
  &:hover {
    background: ${props => props.theme.colors.red};
  }
  &.active {
    background: #888;
    &:hover {
      background: ${props => props.theme.colors.red};
    }
  }
`

const InfoBox = styled.div`
  width: 200px;
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  text-align: center;
  min-width: 30px;
  border-radius: 4px;
  height: auto;
  background: rgba(250, 250, 250, 0.9);
  border: 1px solid #ddd;
  font-size: 0.8rem;
  padding: 4px 8px;
  text-align: left;
  font-family: ${props => props.theme.type.sans};

  .nobreak {
    white-space: nowrap;
    font-weight: bold;
  }

  .info-marker {
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
    margin: 0 0.2rem 0 0;
    border-radius: 50%;
    vertical-align: -10%;
  }

  .info-tag {
    margin: 0 0.15rem;
    padding: 0 0.4rem;
    border-radius: 0.5rem;
    color: #fff;
    font-weight: bold;
  }

  .district {
    //background: ${props => props.theme.category.district};
    background: ${dataDict["district"].color};
  }
  .plan {
    //background: ${props => props.theme.category.plan};
    background: ${dataDict["plan"].color};
  }
  .prospect {
    //background: ${props => props.theme.category.plan};
    background: ${dataDict["stub"].color};
  }
`
export const GlobeInfo = ({ open = false, handleToggle }) => {
  return (
    <GlobeInfoWrapper>
      <InfoBtn
        className={open ? "active" : ""}
        onClick={e => {
          handleToggle()
        }}
      >
        <img src={iconMapInfo} />
      </InfoBtn>
      {open && (
        <InfoBox>
          {/* Click and drag the globe to explore and select the{" "}
          <span class="info-tag district">district</span> and{" "}
          <span class="info-tag plan">plan</span> case studies or{" "}
          <span class="info-tag prospect">prospective</span>
          entries to view learn more */}
          Click and drag the globe to explore and select the
          <span className="nobreak">
            <span className="info-marker district"></span>district
          </span>
          ,{" "}
          <span className="nobreak">
            <span class="info-marker plan"></span>plan
          </span>{" "}
          or{" "}
          <span className="nobreak">
            <span class="info-marker prospect"></span>
            prospective
          </span>{" "}
          case studies to learn more.
        </InfoBox>
      )}
    </GlobeInfoWrapper>
  )
}
