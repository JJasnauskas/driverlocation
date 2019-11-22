const baseUrl = 'http://driverlocation.herokuapp.com/'

const headers = () => {

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })

  return headers
}

const handleResponse = async response => {
  if(response.status === 204){
    return
  }

  if(response.status >= 200 && response.status <300){
    return await response.json()
  }

  const error = await response.json()
}


class Api {
  postLocation(){
    fetch(`${baseUrl}/api/gps`, {
      headers: headers()
    })
    .then(handleResponse)
  }
}

export default new Api()
