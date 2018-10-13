import React, { Component } from 'react';

class DevelopDir extends Component {
  constructor(props){
      super(props);
      this.state = {
        files: [],
        bool: false
      }
  }
  componentWillMount = () => {
    this.goDeeperInDir();
  }

  goDeeperInDir = () => {
    fetch (this.props.children.url, {
    headers: {
      Authorization: `Bearer ${''}`
    }
  })
      .then(result => result.json())

      .then(urlArr => {
          const promises = urlArr.map(
            urlSingle => fetch(urlSingle.url, {
            headers: {
              Authorization: `Bearer ${''}`
            }
          })

              .then(result => result.json())
          )
          return Promise.all(promises)
            .then(files => this.setState({files:files}))
      })

  }

  handleClick = () => {
    this.setState({
      bool: !this.state.bool
    })
  }

  render() {
    // console.table(this.state.files)
    if (this.state.bool) {
      return(
      <div onClick={this.handleClick}>
        {this.state.files.map((file, index) => (
          <div key={index} style={{color: 'green'}}>{file.name}</div>
        ))}
      </div>
      )
    } else {
    return(
      <div>
        <div style={{color: 'blue'}} onClick={this.handleClick}>{this.props.children.name}</div>
      </div>
    )
  }
  }
}

export default DevelopDir;
