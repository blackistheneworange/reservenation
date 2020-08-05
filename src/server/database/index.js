const mongodb=require('mongodb');

const url= process.env.MONGODB_URI||'mongodb://localhost:27017'
const dbName='reserve-nation';

const insertDB=require('./insert')
const findDB=require('./find')
const deleteDB=require('./delete')
const updateDB=require('./update')


exports.insert={
  
  insertOne:(col,data)=>{
    return insertDB.insertOne(data,col,url,dbName)}
  
}

exports.find={
  find:(col,query={},limit=0,skip=0)=>findDB.find(query,col,url,dbName,limit,skip),
  
  findById:(col,id)=>{return findDB.findById(id,col,url,dbName)},
  
  findOne:(col,param,field)=>{return findDB.findOne(param,field,col,url,dbName)}
}

exports.update={
  
  updateOne:(col,query,data1,field,data2={})=>{return updateDB.updateOne(data1,data2,query,field,col,url,dbName)},

}

exports.delete={
  
  deleteOne:(col,query,field)=>{return deleteDB.deleteOne(query,field,col,url,dbName)}
}
