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
    return parser.get('/template')
  },
  addTemplate(template) {
    return parser.post('/template', template)
  },
  editTemplate(template) {
    return parser.put('/template', template)
  },
  deleteTemplate(id) {
    return parser({
      url: '/template',
      method: 'DELETE',
      headers: { 'content-type': 'text/html' },
      data: id
    })
  }
}