import React from 'react'
import LoadingTile from './LoadingTile'

function Loading() {
  return (
    <div
    className="space-y-5 mx-5">
      <LoadingTile />
      <LoadingTile />
      <LoadingTile />
    </div>
  )
}

export default Loading