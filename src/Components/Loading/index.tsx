import {useEllipsis} from '../../Hooks/UseEllipsis'

import RocketAnimation from '../RocketAnimation'

function Loading() {
  const loadingText = useEllipsis('Loading', 250)

  return (
    <RocketAnimation text={loadingText}/>
  )
}

export default Loading
