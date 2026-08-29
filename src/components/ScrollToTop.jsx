import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
export default function ScrollToTop(){
  const { pathname } = useLocation()
  useEffect(() => {async function xyz(){window.scrollTo(0,0)} xyz(), [pathname]})
  return null
}
