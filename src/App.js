import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import { PAT } from "./secrets";
const setRequestOptions = (url) => {
  const USER_ID = "lhackett";       
  const APP_ID = "smartbrain";
  const IMAGE_URL = url;

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Authorization": "Key " + PAT
      },
      body: raw
  };
  return requestOptions;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      route: "signin",
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
        
      },
      boxes: []
    }
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })

  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  calculateFaceLocation = (data) => {
    return data.outputs[0].data.regions.map((region) => {
      const clarifaiFace = region.region_info.bounding_box;
      const image = document.getElementById("inputImage");
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
  };
  
  displayFaceBox = (boxes) => {
    this.setState({ boxes });
  };
  
  // Eventually Add to display name of celebrities in pictures
  // displayCeleb = (concepts) => {
  //   const value = concepts.value;
  //   const name = concepts.name;
  //   if (value > 0.75){
  //     console.log(name);
  //   }
  // }
  

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});

    // fetch("https://api.clarifai.com/v2/models/celebrity-face-detection/outputs", setRequestOptions(this.state.input))
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", setRequestOptions(this.state.input))
        .then(response => response.json())
        .then(result => {
          // this.displayCeleb(result.outputs[0].data.regions[0].data.concepts[0]);
          if(result){
              fetch("http://localhost:3001/image", 
              {
                method: "put",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                  id: this.state.user.id,
                })
            }).then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count}))
              })

            this.displayFaceBox(this.calculateFaceLocation(result));
          }
        })
        .catch(error => console.log("error", error));
  }

  onRouteChange = (route) =>{
    this.setState({route: route});
  }

  onReset = () => {
    this.setState({imageUrl: ""});
    this.setState({input: ""});
  }
  render() {
    const {route, boxes, imageUrl, user} = this.state;
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} route={route}/>
        {
           route === "home" ?
           <div>
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm input={this.state.input} onInputChange = {this.onInputChange} onButtonSubmit={ this.onSubmit } onReset={this.onReset}/>
              <FaceRecognition boxes={boxes}  imageUrl={imageUrl} />
           </div> :
           (
            route === "signin" ?
            <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            :
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
           )

        }
      </div>
    );
  }
}

export default App;