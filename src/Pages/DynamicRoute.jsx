import React from 'react'
import { useParams } from 'react-router-dom'

const DynamicRoute = () => {
    // the dynamic id in the url can be accessed here using useParams
    const {id} = useParams();
  return (
    <div>DynamicRoute: {id}</div>
  )
}

export default DynamicRoute