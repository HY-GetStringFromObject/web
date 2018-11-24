export function getMessageFromRequestErrorObject (error) {
  let message = 'Unknown error'
  if (error) {
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message) {
          message = error.response.data.message
        } else if (error.response.status === 401) {
          message = error.response.data
          if (error.response.statusText) {
            message = error.response.statusText
          }
        }
      } else {
        message = error.response.statusText
      }
    } else {
      if (error.message) {
        message = error.message
      }
    }
  }
  return message
}
