import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const usePageTitle = () => {
  const location = useLocation()

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x)
    document.title = pathnames[0]
      ? pathnames[pathnames.length - 1].charAt(0).toUpperCase() +
        pathnames[pathnames.length - 1].slice(1)
      : "Dashboard"
  }, [location])
}

export default usePageTitle
