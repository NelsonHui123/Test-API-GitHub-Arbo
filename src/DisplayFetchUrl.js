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
    fetch ('https://api.github.com/users/EvaSpessotto/repos', {
    headers: {
      Authorization: `Bearer ${'03411d0bb78267a2740ea574c37a5eea1e0dabaa'}`
    }
  })

    .then(result => result.json())

    .then(repoArr => {
        const promises = repoArr.map(
          repoSingle => fetch(repoSingle.url+'/contents', {
          headers: {
            Authorization: `Bearer ${'03411d0bb78267a2740ea574c37a5eea1e0dabaa'}`
          }
        })

            .then(result => result.json())
        )
        return Promise.all(promises)
          .then(repos => this.setState({reposList:repos}))
    })



    }

  render() {
    console.table(this.state.reposList)
    return (
      <div>
      {this.state.reposList.map( repo => {
        return (
          <div>
            <hr/>
            {repo.map(fichier => {
              if (fichier.type === 'dir') {
                return (
                  <DevelopDir>{fichier}</DevelopDir>
                )
              } else {
                return (
                <div>{fichier.name}</div>
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
