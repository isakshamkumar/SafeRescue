import React from 'react'
import dynamic from 'next/dynamic';
type Props = {}
const AppClient = dynamic(() => import('./Client'), { ssr: false });
const page = (props: Props) => {
  return (
   <AppClient/>
  )
}

export default page