let mongodb = require('mongodb');
let url = 'mongodb://localhost:27017/mydatabase';
let client = new mongodb.MongoClient(url);
let ObjectId = mongodb.ObjectId;

client.connect((err, db) => {
  if (err) throw err;
  let chooseDb = db.db('test_insert');
  chooseDb.collection('test_insert', (err, collection) => {
    if (err) throw err;
    console.log('We are now able to perform queries');
    collection.insert(
      {
      "title": 'I like cake',
      "body": "It is quite good"
      },
      {safe: true},
      (err, documents) => {
        if (err) throw err;
        console.log("Document ID is: " + documents.ops[0]._id);
        console.log('关闭连接');
        let _id = ObjectId(documents.ops[0]._id);
        collection.updateOne(
            {'_id': _id},
            {$set: {"title": "I ate too much cake"}},
            {w: 1}, 
            err => {
              if (err) throw err;
              collection.find({'title': 'I ate too much cake'}).toArray((err, reslut) => {
                if (err) throw err;
                console.log(reslut);
                let _id = ObjectId(reslut[0]._id);
                collection.deleteOne({'_id': _id}, err => {
                  if (err) throw err;
                  collection.find({'title': 'I ate too much cake'}).toArray((err, reslut) => {
                    if (err) throw err;
                    console.log('第二次查询');
                    console.log(reslut);
                  });
                });
              });
        });
      }
    );
  });
});

