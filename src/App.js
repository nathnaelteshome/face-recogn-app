import './App.css';
import React,{ Component } from 'react';
import Navigation from './components/Navigation';
import FaceRecognition from './components/FaceRecognitions/FaceRecogniton';
import Logo from './components/Logo';
import Rank from './components/Rank';
import ImageLinkForm from './components/ImageLinkForm';
import ParticlesBackground from './components/ParticlesBackground';
import Register from './Register/Register';
import Signin from './Signin/Signin';

const USER_ID = 'rvyiseatnzhr';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '4125da59e9a647718484eef26d795917';
    const APP_ID = 'first-app2';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    // const IMAGE_URL = 'https://media.allure.com/photos/57890b5c1d4bede12c872532/master/w_1600%2Cc_limit/celebrity-trends-2016-07-rihanna-face-reading.jpg';
    const initialState={
      
        input: '',
        imageUrl: '',
        boxes: [],
        route: 'signin',
        isSignedIn: false,
        user: {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: ''
        }
      
      
    }
    class App extends Component {
      constructor() {
        super();
        this.state = initialState
      }

      loadUser = (data) => {
        this.setState({user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        }})
      }
      

      faceLocation=(data) =>{
        
        const faceArray=data.outputs[0].data.regions;

        const mappedFaceArray = faceArray.map((face) => {
          const clarifaiFace=face.region_info.bounding_box
          const image=document.getElementById("inputImage")
          const width=Number(image.width)
          const height=Number(image.height)

          return{
          leftCol: (clarifaiFace.left_col * width ),
          topRow: clarifaiFace.top_row * height ,
          rightCol: width-(clarifaiFace.right_col * width) ,
          bottomRow: height-(clarifaiFace.bottom_row * height )
        }
        });

        console.log("faceArray",faceArray); 
        console.log("mappedFaceArray",mappedFaceArray); 

        return{
          mappedFaceArray
        }

      }

      displayFaceBox=(boxes)=>{
        console.log("boxes",boxes.mappedFaceArray)
        this.setState({boxes:boxes.mappedFaceArray});
        console.log("boxes2",boxes)
      }
      
      onInputChange = (event) => {
        console.log(event.target.value );
        this.setState({input: event.target.value});
        
      }
  
  onButtonSubmit=()=>{
    this.setState({IMAGE_URL: this.state.input})
    console.log("click");
    console.log(this.state.IMAGE_URL);
    
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": this.state.input
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id

  fetch("https://api.clarifai.com/v2/models/" + MODEL_ID +  "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result){
          fetch('http://localhost:3000/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            id: this.state.user.id
          })
          })
          .then(response =>response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user,{entries:count}))
          })
        }
        this.displayFaceBox( this.faceLocation(result))})
      .catch(error => console.log('error', error));

    }

    
    onRouteChange=(route)=>{
      if (route === 'signin') {
        this.setState(initialState)
      } else if (route === 'home') {
        this.setState({isSignedIn: true})
      }
      this.setState({route: route});
      // console.log("route function is called",route)
    }
    
    render(){
      const { isSignedIn,input,route,boxes }=this.state;

    return(
      <div className="App">
        <ParticlesBackground/>
        <Navigation 
        onRouteChange={this.onRouteChange}
        isSignedIn={isSignedIn}/>
        {
        route ==='home'
        ?<div className="">
          <Logo/>
          <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
          <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition boxes={boxes} IMAGE_URL={input}/>
        </div> 

        :(
          route==='signin'
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
          :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
      
      }

        </div>
    );
  }
}

export default App;

