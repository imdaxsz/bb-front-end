'use client'

import { createPortal } from 'react-dom'
import { BeatLoader } from 'react-spinners'

export default function Loader() {
  const el = document.getElementById('loader')
  return el && createPortal(<BeatLoader color="#5e8b7e" />, el)
}
