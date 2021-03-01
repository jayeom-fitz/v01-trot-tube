import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import { storeService } from "src/fbase"

function Person() {
  const { id } = useParams();
  
  return (
    <div>
      {id}
    </div>
  )
}

export default Person
