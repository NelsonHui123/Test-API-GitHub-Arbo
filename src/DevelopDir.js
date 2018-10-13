import React, { Component } from 'react';

class DevelopDir extends Component {
  constructor(props){
      super(props);
      this.state = {
        files: {}
      }
  }
  componentWillMount = () => {
    this.goDeeperInDir();
  }

  goDeeperInDir = () => {
    fetch (this.props.children.url, {
    headers: {
      Authorization: `Bearer ${'03411d0bb78267a2740ea574c37a5eea1e0dabaa'}`
    }
  })
      .then(result => result.json())

      .then(urlArr => {
          const promises = urlArr.map(
            urlSingle => fetch(urlSingle.url, {
            headers: {
              Authorization: `Bearer ${'03411d0bb78267a2740ea574c37a5eea1e0dabaa'}`
            }
          })

              .then(result => result.json())
          )
          return Promise.all(promises)
            .then(files => this.setState({files:files}))
      })

  }

  handleClick = () => {
    this.state.files.map((file, index) =>
      <div style={{paddinLeft: '5px', color: 'green'}}>{file.name}</div>
    )
  }

  render() {
    console.table(this.state.files)
    return(
      <div>
        <div style={{color: 'blue'}} onClick={this.handleClick}>{this.props.children.name}</div>
      </div>
    )
  }
}

export default DevelopDir;
