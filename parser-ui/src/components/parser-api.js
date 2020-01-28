import axios from 'axios'

const parser = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 5000,
});

const headerPrefix = 'Bearer '

export default {
  signUp(user) {
    return parser.post('/auth/sign-up', user)
  },
  signIn(user) {
    return parser.post('/auth/sign-in', user)
  },
  parseString(token, parsedString) {
    return parser({
      url: '/parser',
      method: 'POST',
      headers: {
        'content-type': 'text/html',
        'Authorization': headerPrefix + token
      },
      data: parsedString
    })
  },
  getMessages(token, id) {
    return parser.get(
      ('/parser?templateId=' + id),
      {
        headers: { 'Authorization': headerPrefix + token }
      }
    )
  },
  getAllTemplates(token) {
    return parser.get(
      '/template',
      {
        headers: { 'Authorization': headerPrefix + token }
      }
    )
  },
  addTemplate(token, template) {
    return parser({
      url: '/template',
      method: 'POST',
      headers: { 'Authorization': headerPrefix + token },
      data: template
    })
  },
  editTemplate(token, template) {
    return parser({
      url: '/template',
      method: 'PUT',
      headers: { 'Authorization': headerPrefix + token },
      data: template
    })
  },
  deleteTemplate(token, id) {
    return parser({
      url: '/template',
      method: 'DELETE',
      headers: {
        'content-type': 'text/html',
        'Authorization': headerPrefix + token
      },
      data: id
    })
  },
}