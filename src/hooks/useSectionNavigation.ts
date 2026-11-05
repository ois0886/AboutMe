import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection, type SectionId } from '../utils/sectionNavigation'

export default function useSectionNavigation() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useCallback((target: SectionId) => {
    if (pathname === '/') {
      sessionStorage.removeItem('scrollY')
      scrollToSection(target)
      return
    }

    navigate('/', { state: { sectionTarget: target } })
  }, [navigate, pathname])
}
