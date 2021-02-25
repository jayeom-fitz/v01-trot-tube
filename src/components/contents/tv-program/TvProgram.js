import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components';

import { storeService } from '../../../fbase'

function TvProgram({props}) {
  const { tpid } = useParams();

  return (
    <div>
      {tpid}
    </div>
  )
}

export default TvProgram
