import HTTP from './common/http'
import UserResource from './user.service'

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let AuthService = {
  // user login
  // input : credentials
  // output : accessToken and RefreshToken
  login(body) {
    return HTTP.post('users/signin', body)
    .then(res => {
      localStorage.setItem('accessToken', res.data.accessToken)
      localStorage.setItem('refreshToken', res.data.refreshToken)
      //FIXME: the user can be retrieved in the storage ?
      return UserResource.getMe()
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      throw err
    })
  },

  // user signup
  // input : company name, user name & email, credentials
  // output : accessToken and RefreshToken
  signup(body) {
    return HTTP.post('users/signup', body)
    .then(res => {
      localStorage.setItem('accessToken', res.data.accessToken)
      localStorage.setItem('refreshToken', res.data.refreshToken)
      //FIXME: the user can be retrieved in the storage ?
      return UserResource.getMe()
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      throw err
    })
  },

    
  // getCurrentUser returns the user using the AccessToken to identify it
  // input : AccessToken in the headers (from localStorage)
  // output : user attached to the AccessToken
  getCurrentUser() {
    return HTTP.get('users/me')
    .then(response => {
      return response.data
    })
      .catch(err => {
        throw err
      })
  },

  // updatePasswordRequest will send an email to the user in order to update the password
  // No input (based on Accesstoken)
  // No output
  updatePasswordRequest() {
    return HTTP.post('users/me/updatePasswordRequest')
  },

  // updatePassword
  // input : password (to update)
  // input : passwordToken (to validate the action)
  // No output
  updatePassword(body, passwordToken) {
    return HTTP.post('users/updatePassword', body)
  },

  // refreshAccessToken is called when the accessToken is expired and we received a 401 RESET_TOKEN_EXPIRED
  // it calls API with refreshToken, the API check the validity of refresh token and generate a new couple of accessToken, refreshToken
  // input:
  //    email of the user
  //    refreshToken from the localStorage
  refreshAccessToken(refreshToken) {
    return HTTP.post('users/me/refreshAccessToken', {
      refreshToken: localStorage.getItem('refreshToken')
    })
    .then(response => {
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      //FIXME: the user can be retrieved in the storage ?
      return UserResource.getMe()
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      throw err
    })
  }
}

export default AuthService
