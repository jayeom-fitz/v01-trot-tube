import React from 'react'

import Avatar from "@material-ui/core/Avatar";

function PersonRow({ personName }) {
  return (
    <div className="personRow">
      <h1>{personName}</h1>
    </div>
  )
}

export default PersonRow
