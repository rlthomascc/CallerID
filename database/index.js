const mongoose = require('mongoose');
  reconnectTries: 100,
  reconnectInterval: 500,
  autoReconnect: true,
  useNewUrlParser: true,
  dbName: 'leads',
})
  .catch(err => console.log('Mongo connection error', err));


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB has connected');
});

// schemas
const coldLeadSchema = ({
  FirstName: String,
  LastName: String,
  Phone1: {type: Number, unique: true},
  Phone2: {type: Number, unique: true},
  Address: String,
  City: String,
  State: String,
  timeStamp: { type: Date, default: Date.now },
});


// models
const ColdLead = mongoose.model('ColdLead', coldLeadSchema);


// save functions
function save(e, i) {
  console.log(e, 'SAVE FUNC');
  const obj = new ColdLead({
    FirstName: e.FirstName,
    LastName: e.LastName,
    Phone1: e.Phone1,
    Phone2: e.Phone2,
    Address: e.Address,
    City: e.City,
    State: e.State,
  });
  obj.save();
  console.log('Data saved to MongoDB Database ' + i);
}

const funcs = {
  save, ColdLead,
};
module.exports = funcs;
