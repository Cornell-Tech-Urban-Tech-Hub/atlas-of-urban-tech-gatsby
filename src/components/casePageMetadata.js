import * as React from "react"
import styled from "styled-components"
import { ListTagsSimple } from "../components/listTags"
import { GlobeMarker } from "../components/globe/globeMarker"

import {
  CaseTypeTag,
  CaseStatusTag,
  CaseTimeframe,
} from "../components/caseMetaDisplay"
import datadict from "../content/data/data-dictionary.json"

const Metadata = styled.div`
  padding: 1rem;
  background: #f6f6f6;
  font-size: 0.8rem;
  h4 {
    color: #999;
    margin-bottom: 0.5rem;

    border-bottom: 1px solid #aaa;
  }

  .divider-left {
  }

  .centroids {
    font-size: 0.75rem;
    color: #999;
  }
`

const TypeTag = styled.div`
  font-family: ${({ theme }) => theme.type.sans};
  font-weight: bold;
  .type {
    display: inline-block;
    padding: 0px 6px;
    margin-right: 4px;
    margin-bottom: 4px;
    border-radius: 4px;
    color: #fff;
    background-color: #777;
  }
  .type-district {
    background-color: ${datadict.district.color};
  }
  .type-plan {
    background-color: ${datadict.plan.color};
  }
`

const Status = styled.div`
  font-family: ${({ theme }) => theme.type.sans};
  font-weight: bold;
  .status {
    display: inline-block;
    padding: 0px 6px;
    margin-right: 4px;
    margin-bottom: 4px;
    border-radius: 4px;
    color: #fff;
    background-color: #777;
  }
  .status-draft {
    background-color: #f4d036;
  }
  .status-review {
    background-color: #eda229;
  }
  .status-complete {
    background-color: #00c0f3;
  }
`
export const CaseMetadata = ({ node }) => {
  let meta = node.frontmatter
  return (
    <Metadata>
      <h4>Type</h4>
      <TypeTag>
        <div class={`type type-${meta.type?.toLowerCase()}`}>
          {datadict[meta.type] ? datadict[meta.type].label : "Undefined"}
        </div>
      </TypeTag>
      {/* <h4>Status</h4>
      {meta.author ? (
        <Status>
          <div class={`status status-${meta.status?.toLowerCase()}`}>
            {meta.status}
          </div>
        </Status>
      ) : (
        <div class="note-missing">Add Status</div>
      )} */}

      <h4>Author</h4>
      <div>
        {meta.author ? meta.author : <div class="note-missing">Add Author</div>}
      </div>
      <h4>Timeframe</h4>
      <CaseTimeframe node={node} />

      <h4>Tags</h4>
      {meta.tags && meta.tags?.length > 0 ? (
        <ListTagsSimple array={meta.tags} type="Tags" />
      ) : (
        <div class="note-missing">No Tags Specified</div>
      )}

      <h4>Location</h4>

      {meta.city && meta.country_code ? (
        <div>
          <strong>
            {meta.city}, {meta.country_code}
          </strong>
        </div>
      ) : (
        <div class="note-missing">Add City and ISO 3-Letter Country Code</div>
      )}
      {meta.centroid ? (
        <>
          <div>
            <GlobeMarker centroid={meta.centroid} />
          </div>
          <div class="centroids">
            Lat: {meta.centroid[0]}, Lon:
            {meta.centroid[1]}
          </div>
        </>
      ) : (
        <div class="note-missing">No Centroid Specified</div>
      )}
    </Metadata>
  )
}
