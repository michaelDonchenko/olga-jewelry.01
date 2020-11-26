import axios from 'axios'

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    '/api/create-or-update-user',
    {},
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const currentUser = async (authtoken) => {
  return await axios.post(
    '/api/current-user',
    {},
    {
      headers: {
        authtoken,
      },
    }
  )
}
