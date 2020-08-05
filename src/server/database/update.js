
const MongoClient=require('mongodb').MongoClient

exports.updateOne=async function updateOne(data1,data2,query,field,col,url,dbName){
  
  const client=new MongoClient(url,{useUnifiedTopology:true})
  
  await client.connect()
  
  const db=client.db(dbName)
  
  const res1=await db.collection(col).findOneAndUpdate({[field]:query},{$set:data1})

  if(Object.keys(data2).length>0){
    const res2=await db.collection(col).update({[field]:query},{$unset:data2})

    client.close()
    return res2
  }
  
  
  client.close()
  
  return res1
}
