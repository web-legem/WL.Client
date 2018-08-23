import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import atParams from './annotation-types'
import dtParams from './document-types'
import etParams from './entity-types'
import eParams from './entities'

var mock = new MockAdapter(axios, { delayResponse: 500 })

mock.onGet('/api/AnnotationType').reply(200, atParams)
mock.onGet('/api/DocumentType').reply(200, dtParams)
mock.onGet('/api/EntityType').reply(200, etParams)
mock.onGet('/apli/Entities').reply(200, eParams)

export default mock