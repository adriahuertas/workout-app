import { useNavigate } from '@remix-run/react'
import { useEffect } from 'react'

const IndexRoute = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/exercises')
  }, [navigate])

  return null
}

export default IndexRoute
