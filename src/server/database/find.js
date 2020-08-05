const {ObjectID,MongoClient}=require('mongodb')


exports.find=async function find(query,col,url,dbName,limit,skip){
  
  try{
  
  const client=new MongoClient(url,{useUnifiedTopology:true})
  
  await client.connect()
  
  const db=client.db(dbName)

  
  const cursor=db.collection(col).find(query)
  
  if(limit>0&&skip>0){
    const res=await cursor.sort({date:-1}).skip(skip).limit(limit).toArray()
    client.close()
    return res
  }
  else if(limit>0){
    const res=await cursor.sort({date:-1}).limit(limit).toArray()
    
    client.close()
    return res
  }
  const res=await cursor.sort({date:-1}).toArray()
  

  
  /*res.sort((a,b)=>{
    return new Date(b.date)>new Date(a.date)?1:-1
  })*/
  
  client.close()
  
  return res
  
  }
  catch(err){
    console.log(err)
    return "error"
  }
}

exports.findById=async function findById(id,col,url,dbName){
  const client=new MongoClient(url,{useUnifiedTopology:true})
  await client.connect()
  const db=client.db(dbName)
  
  const res=await db.collection(col).findOne({_id:ObjectID(id)})
  
  client.close()
  
  console.log(res)
  return res
}

exports.findOne=async function findOne(param,field,col,url,dbName){
  
  try{
    const client=new MongoClient(url,{useUnifiedTopology:true})
     await client.connect()
     const db=client.db(dbName)
  
     const res=await db.collection(col).findOne({[field]:param})
     client.close()
     return res
  }
  catch(err){
    console.log(err)
    return "error"
  }
  
}