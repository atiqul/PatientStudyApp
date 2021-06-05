import axios from 'axios'
import { useState, useEffect } from 'react'

export default function useFetch(options) {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(options)
        const json = await res.data
        setResponse(json)
        setLoading(false)
      } catch (error) {
        const obj = {}
        setLoading(false)
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          obj.data = error.response.data
          obj.status = error.response.status
          obj.headers = error.response.headers
          obj.message = error.message
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
          obj.message =
            'Connection refused, may be API is not running or having some issue on the server end.'
        } else {
          // Something happened in setting up the request that triggered an Error
          obj.message = error.message
        }
        setError(obj)
      }
    }
    fetchData()
  }, [])
  return [response, error, loading]
}
