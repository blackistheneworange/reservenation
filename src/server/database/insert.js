
const MongoClient=require('mongodb').MongoClient;

exports.insertOne=async function insertOne(data,col,url,dbName){
  
  const client=new MongoClient(url,{useUnifiedTopology:true})
  
  await client.connect()
  
  const db=client.db(dbName)
  
  const res=await db.collection(col).insertOne(data)
  

  
  client.close()
  
  return res
}