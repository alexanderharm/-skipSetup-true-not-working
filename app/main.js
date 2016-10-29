import React from 'react';
import ReactDOM from 'react-dom';
import PouchDB from "pouchdb";
PouchDB.plugin(require('pouchdb-find'));
import MainComponent from "./MainComponent.js"


const db = new PouchDB("aDatabase");
var remoteDB = new PouchDB('https://java-jonas.cloudant.com/testdb/')

db.sync(remoteDB, {
live: true
});

db.changes({
  since: "now",
  live: true
})

class Main extends React.Component {
  render() {
    return (
      <div>
        <MainComponent/>
      </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);
