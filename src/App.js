import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import { PAT } from "./secrets";
const setRequestOptions = (isFile, input) => {
  const USER_ID = "lhackett";       
  const APP_ID = "smartbrain";
  if (isFile){
    const IMAGE_BYTES_STRING = input;
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "base64": IMAGE_BYTES_STRING
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
  else {
    const IMAGE_URL = input;
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
      boxes: [],
      isFile: false,
      format: "",
      celebrity: false,
      celebNames: []
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

  handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({format: file.type});
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        this.setState({input:base64String});

      };

      reader.readAsDataURL(file);
    }
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onRouteChange = (route) =>{
    this.setState({route: route});
  }

  onReset = () => {
    this.setState({imageUrl: ""});
    this.setState({input: ""});
    this.setState({boxes: []});
  }

  toggleInputType = (isFile) => {
    this.setState({isFile: !isFile});
  }

  toggleCelebrity = (celebrity) => {
    this.setState({celebrity: !celebrity});
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
  
  displayCeleb = (regions) => {
    const celebNames = []; 

    regions.forEach((region) => {
      const value = region.data.concepts[0].value;
      const name = region.data.concepts[0].name;
      if (value > 0.5) {
        celebNames.push(name);
      }
      else {
        celebNames.push("")
      }
    });
    this.setState({celebNames: celebNames});
  };

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    let url = this.state.celebrity ? "https://api.clarifai.com/v2/models/celebrity-face-detection/outputs" : "https://api.clarifai.com/v2/models/face-detection/outputs";

    fetch(url,setRequestOptions(this.state.isFile, this.state.input))
      .then(response => response.json())
      .then(result => {
        if(result){
          if (this.state.celebrity){
            this.displayCeleb(result.outputs[0].data.regions);
          }
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

  render() {
    const {route, boxes, imageUrl, user, format, input, isFile, celebrity, celebNames} = this.state;
    let model = celebrity ? "celebrity-face-detection" : "face-detection";
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} route={route}/>
        {
           route === "home" ?
           <div>
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm 
                isFile={isFile} 
                input={input} 
                onInputChange = {this.onInputChange} 
                onButtonSubmit={ this.onSubmit } 
                onReset={this.onReset} 
                toggleInputType={this.toggleInputType} 
                handleFileInputChange={this.handleFileInputChange}
                toggleCelebrity={this.toggleCelebrity}
                celebrity={celebrity}
                />

              <FaceRecognition 
                format={format} 
                boxes={boxes} 
                isFile={isFile} 
                imageUrl={imageUrl} 
                celebrity={celebrity}
                celebNames={celebNames}
                />
           </div> :
           (
            route === "signin" ?
            <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            :
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
           )

        }
        <div className="model-label">
          Model: {model}
        </div>
      </div>
    );
  }
}

export default App;