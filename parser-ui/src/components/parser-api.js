import axios from 'axios'

const parser = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 5000,
});

export default {
  parseString(parsedString) {
    return parser({
      url: '/parser',
      method: 'POST',
      headers: { 'content-type': 'text/html' },
      data: parsedString
    })
  },
  getAllTemplates() {
    return parser.get('/parser')
  }
}