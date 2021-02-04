import React from 'react'
import './PersonRow.css'

import Avatar from "@material-ui/core/Avatar";
import VerifiedIcon from '@material-ui/icons/CheckCircleOutlineOutlined'

function PersonRow({ personName }) {
  return (
    <div className="personRow">
      <Avatar 
        className="personRow__logo"
        src="https://w.namu.la/s/113a6a5a5315a80533babca63058bd23b5775687b9a3ad0978162050c2866f2cd26d0f252f04cab0a7c3a0b3bee77dc447556e03bf31d94c60a684d74007478e169bfe0dedb0f2f3d759943acf31a17ac493a01ca66a19da731f7130aefe85eb"
        alt=""
      />
      <div className="personRow__text">
        <h4>{personName} <VerifiedIcon /></h4> 
        <p>이이이이이이이잉</p>
      </div>
      

    </div>
  )
}

export default PersonRow
