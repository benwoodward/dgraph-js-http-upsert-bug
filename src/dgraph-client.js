import * as dgraph from 'dgraph-js-http'

const clientStub = new dgraph.DgraphClientStub('http://localhost:8080', false)
const dgraphClient = new dgraph.DgraphClient(clientStub)

export { dgraphClient }

