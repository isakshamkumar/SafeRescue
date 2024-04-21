import React from 'react'

type Props = {}

const Background = (props: Props) => {
  return (
    <div style={{background:'url(/back.png)',opacity:.5,position:'absolute',top:'-32rem',left:'-15rem',bottom:"0",right:'0',width:'120%'}}></div>
  )
}

export default Background