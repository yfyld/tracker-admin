import * as React from 'react'
import TopBarProgress from 'react-topbar-progress-indicator'

TopBarProgress.config({
  shadowBlur: 5
})

const ProgressBar = () => {
  return <TopBarProgress />
}
export default ProgressBar
