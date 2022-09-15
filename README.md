1. Run `docker run -it -p 5080:5080 -p 6080:6080 -p 8080:8080 -p 9080:9080 -p 8000:8000 -v ~/dev/dgraph-data/dgraph-js-http-debug:/dgraph --name dgraph-js-http-debug dgraph/standalone:v21.03.0`
2. Run `curl -X POST localhost:8080/admin/schema --data-binary '@src/schema.graphql'`
3. Run `node src/index.js`
