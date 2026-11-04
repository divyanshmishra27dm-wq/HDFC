// One-off: copy tracker data from the OLD Mongo (items + activity_logs collections)
// into the NEW Mongo's single "hdfc" collection.
// Usage: OLD_MONGODB_URI=... MONGODB_URI=... node scripts/migrate-to-hdfc.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

(async () => {
  const oldUri = process.env.OLD_MONGODB_URI, newUri = process.env.MONGODB_URI;
  if (!oldUri || !newUri) throw new Error('Set OLD_MONGODB_URI and MONGODB_URI');
  const oldC = await new MongoClient(oldUri).connect();
  const newC = await new MongoClient(newUri).connect();
  const oldDb = oldC.db('hdfc-tracker');
  let newDb = newC.db(process.env.MONGODB_DB || undefined);
  if (newDb.databaseName === 'test') newDb = newC.db('hdfc-tracker');

  const items = await oldDb.collection('items').find({}).sort({ order: 1 }).toArray();
  const logs = await oldDb.collection('activity_logs').find({}).sort({ order: 1 }).toArray();
  const conv = (type, key) => (d, i) => {
    const { _id, order, ...rest } = d;
    return { replaceOne: { filter: { _id: `${type}:${rest[key]}` }, replacement: { ...rest, type, order: i }, upsert: true } };
  };
  const ops = [...items.map(conv('item', 'ref')), ...logs.map(conv('log', 'id'))];
  if (ops.length) await newDb.collection('hdfc').bulkWrite(ops);
  const n = await newDb.collection('hdfc').countDocuments({});
  console.log(`Read ${items.length} items, ${logs.length} logs. DB "${newDb.databaseName}" collection "hdfc" now has ${n} docs.`);
  await oldC.close(); await newC.close();
})().catch(e => { console.error(e.message); process.exit(1); });
