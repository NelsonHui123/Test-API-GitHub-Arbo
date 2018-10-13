import React, { Component } from 'react';

class DevelopDir extends Component {
  constructor(props){
      super(props);
      this.state = {
        files: {}
      }
  }

  goDeeperInDir = () => {
    fetch (this.props.children.url)
      .then(result => result.json())

      .then(urlArr => {
          const promises = urlArr.map(
            urlSingle => fetch(urlSingle.url)

              .then(result => result.json())
          )
          return Promise.all(promises)
            .then(files => this.setState({files:files}))
      })

  }

  render() {
    console.table(this.state.files)
    return(
      <div>
        <div style={{color: 'blue'}}>{this.props.children.name}</div>
      </div>
    )
  }
}

export default DevelopDir;
