import { useState, useEffect } from "react"

const useGetData = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
  
    useEffect(() => {
        getData()
     }, [])
  
    const getData = async () => {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:5000') //some fetch stuff here
        const data = response.json()
        setData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
  
    return {data, loading, error}
  }
  
  export default useGetData