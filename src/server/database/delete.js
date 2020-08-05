
const MongoClient=require('mongodb').MongoClient;

exports.deleteAll=async function deleteAll(query,col,url,dbName){
  
  try{
    const client=new MongoClient(url,{useUnifiedTopology:true})
    
    await client.connect();
    
    const db=client.db(dbName)
    
    const res=await db.collection(col).deleteMany(query)
    client.close()
    return res
  }
  catch(err){
    
    return "error"
  }
}

exports.deleteOne=async function deleteOne(query,field,col,url,dbName){
  
  try{
    const client=new MongoClient(url,{useUnifiedTopology:true})
    
    await client.connect()
    
    const db=client.db(dbName)
    
    const res=await db.collection(col).deleteOne({[field]:query})
  
    
    client.close()
    return res
  }
  catch(err){
    return "error"
  }
  
}