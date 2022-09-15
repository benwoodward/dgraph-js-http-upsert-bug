import { dgraphClient } from './dgraph-client.js'

const txn = dgraphClient.newTxn()

const api_results = [
  {
    xid: 1,
    name: 'andrew'
  },
  {
    xid: 2,
    name: 'peter'
  },
]

try {
  const upserts = build_upserts(api_results)

  await Promise.all(
    upserts.map(async upsert => {
      await txn.mutate({ mutation: JSON.stringify(upsert), commitNow: true })
    })
  )
} catch (e) {
  if (e instanceof Error) {
    console.log('---error')
    console.log(e)
    console.log('---')
  }
} finally {
  await txn.discard()
}

function build_upserts(api_results) {
  const upserts = []

  api_results.forEach(result => {
    upserts.push(build_upsert(result))
  })

  return upserts
}

function build_upsert(api_result) {
  return {
    query: build_upsert_query(api_result.xid, api_result.name),
    set: build_upsert_set_json(api_result.xid, api_result.name),
  }
}

function build_upsert_query(xid, name) {
  return `{
    var(func: type(Thing)) @filter(
      eq(Thing.xid, \"${xid}\") AND
      eq(Thing.name, \"${name}")
    ){
      le as uid
    }
  }`
}

function build_upsert_set_json(
  xid,
  name,
) {
  let thing_data = {
    uid: 'uid(le)',
    'dgraph.type': 'Thing',
    'Thing.xid': xid,
    'Thing.name': name,
  }

  return [thing_data]
}

