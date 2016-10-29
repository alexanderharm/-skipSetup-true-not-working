var React = require('react');
var PropTypes = React.PropTypes;
import PouchDB from "pouchdb";
PouchDB.plugin(require('pouchdb-find'));
PouchDB.plugin(require('pouchdb-authentication'));
var user = {

  name: 'java-jonas',
  password: 'cc62946264928'
};
var pouchOpts = {
  skipSetup: true
};
var ajaxOpts = {
  ajax: {
    headers: {
      Authorization: 'Basic ' + window.btoa(user.name + ':' + user.password)
    }
  }
};

var db = new PouchDB('https://java-jonas.cloudant.com/phones/', pouchOpts)

db.login(user.name, user.password, ajaxOpts).then(function() {
  return db.allDocs();
}).then(function(docs) {
  console.log(docs);
}).catch(function(error) {
  console.error(error);
});


db.changes({
  since: "now",
  live: true
})


var MainComponent = React.createClass({

  getInitialState: function(){
    return{
      brand: null,
      name: null,
      size: null,
      color: null,
      src: null
    }
  },

  getIphone: function(callback){
    db.find({
      selector: {_id: {$eq: "Iphone"}},
      sort: ["_id"]
    }).then(function (result) {
      callback(result)
    }).catch(function (err) {
      console.log(err);
    });
  },

  getHTC10: function(callback){
    db.find({
      selector: {_id: {$eq: "HTC10"}},
      sort: ["_id"]
    }).then(function (result) {
      callback(result)
    }).catch(function (err) {
      console.log(err);
    });
  },

  getMotoZ: function(callback){
    db.find({
      selector: {_id: {$eq: "MotoZ"}},
      sort: ["_id"]
    }).then(function (result) {
      callback(result)
    }).catch(function (err) {
      console.log(err);
    });
  },

  changeState: function(result){
    this.setState({
      brand: result.docs["0"].brand,
      name: result.docs["0"].name,
      size: result.docs["0"].size,
      color: result.docs["0"].color,
      src: result.docs["0"].ImageSource
    })
  },

  render: function() {
    return (
      <div>

        <button onClick={() => this.getIphone(this.changeState)}type="button" name="button">iPhone</button>
        <button onClick={() => this.getHTC10(this.changeState)}type="button" name="button">HTC10</button>
        <button onClick={() => this.getMotoZ(this.changeState)}type="button" name="button">MotoZ</button>


        <div>
          <img style={{height: "500px", width: "500px", float: "left"}} src={this.state.src} alt="" />
          <div style={{float: "left", marginLeft: "10px"}}>
            <p>brand: {this.state.brand}</p>
            <p>name: {this.state.name}</p>
            <p>size: {this.state.size}</p>
            <p>color: {this.state.color}</p>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = MainComponent;
