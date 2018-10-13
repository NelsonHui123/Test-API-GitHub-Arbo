import React, { Component } from 'react';
import DevelopDir from './DevelopDir'

class DisplayFetchUrl extends Component {

  constructor(props){
      super(props);
      this.state = {
          reposList: [],
          rawList: [],
      };
  }

  componentWillMount = () => {
    this.getRepos();
  }


  getRepos = () => {
    fetch ('https://api.github.com/users/NelsonHui123/repos', {
    headers: {
      Authorization: `Bearer ${''}`
    }
  })

    .then(result => result.json())

    .then(repoArr => {
        const promises = repoArr.map(
          repoSingle => fetch(repoSingle.url+'/contents', {
          headers: {
            Authorization: `Bearer ${''}`
          }
        })

            .then(result => result.json())
        )
        return Promise.all(promises)
          .then(repos => this.setState({reposList:repos}))
    })



    }

  render() {
    // console.table(this.state.reposList)
    return (
      <div>
      {this.state.reposList.map( (repo, index) => {
        return (
          <div key={index}>
            <hr/>
          {repo.map((fichier, index) => {
              if (fichier.type === 'dir') {
                return (
                  <DevelopDir key={index}>{fichier}</DevelopDir>
                )
              } else {
                return (
                <div key={index}>{fichier.name}</div>
              )
              }
            })
          }
          </div>
          )
        }
      )}
      </div>
    )
  }
}


export default DisplayFetchUrl;
