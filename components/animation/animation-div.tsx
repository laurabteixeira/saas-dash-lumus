'use client'

import { useInView } from 'framer-motion'
import React, { useRef } from 'react'

interface IDivProps {
  children: React.ReactNode
  position: 'bottom' | 'top' | 'left' | 'right' | 'center'
}

function AnimationDiv({ position, children }: IDivProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handlePositions = {
    bottom: 'translateY(200px)',
    top: 'translateY(-200px)',
    left: 'translateX(-200px)',
    right: 'translateX(200px)',
    center: 'none',
  }

  return (
    <div ref={ref}>
      <div
        style={{
          transform: isInView ? 'none' : handlePositions[position],
          opacity: isInView ? 1 : 0,
          transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default AnimationDiv
