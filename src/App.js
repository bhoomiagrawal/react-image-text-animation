import React from 'react';
import logo from './logo.svg';
import TextAnimator from './components/TextAnimator';
// import ReactImageTextAnimation from 'react-image-text-animation';

import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import './App.css';

class App extends React.Component  {
  state = {
    font: '',
    animation: 'slide ltr',
    duration: 1000,
    dataType: 'text',
    data: 'Lorem Ipsum',
    submit: false,
  }


   toBase64 = file => new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});



  handleChange = async(e) => {
    if(this.state.dataType == 'image' && e.target.name == 'data' ) {
       const file = e.target.files[0];
      //  console.log(await this.toBase64(file));
       let imgData = await this.toBase64(file)
      this.setState({
        data: imgData,
        submit: false
      }) 
    }  else {
      this.setState({
        [e.target.name]: e.target.value,
        submit: false
      })
    }
  }

  handleSubmit = () => {
    this.setState({
      submit: true
    })
  }


getBase64(file, cb) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
      cb(reader.result)
  };
  reader.onerror = function (error) {
      console.log('Error: ', error);
  };
}

  
  render() {
    const {animation, font, duration, dataType, data, submit } = this.state;
    return (
      <div className="App"> 
        <div className="column ">
          <Form className="colDvd">
            <FormGroup row>
              <Label for="fontSelect" sm={3}>Select Font:  </Label>
              <Col sm={9}>
                <Input type="select" name="font" id="fontSelect" onChange={this.handleChange} >
                  <option>20px</option>
                  <option>25px</option>
                  <option>30px</option>
                  <option>35px</option>
                  <option>40px</option>
                </Input>
              </Col>
              
            </FormGroup>

            <FormGroup row>
              <Label for="animationSelect" sm={3}>Select Animation:  </Label>
              <Col sm={9}>
              <Input type="select" name="animation" id="animationSelect" onChange={this.handleChange}>
                <option>slide ltr</option>
                <option>slide with bounce</option>
                <option>bounce</option>
                <option>text</option>
              </Input>
              </Col>
              
            </FormGroup>

            <FormGroup row>
              <Label for="durationSelect" sm={3}>Select Duration:  </Label>
              <Col sm={9}>
                <Input type="select" name="duration" id="durationSelect" onChange={this.handleChange}>
                  <option>1000</option>
                  <option>2000</option>
                  <option>3000</option>
                  <option>4000</option>
                  <option>5000</option>
                  <option>6000</option>
                </Input>
              </Col>
              
            </FormGroup>

              <FormGroup row>
                <Label for="dataSelect" sm={3}>Select Data Type:  </Label>
                <Col sm={9}>
                  <Input type="select" name="dataType" id="dataSelect" onChange={this.handleChange}>
                    <option>text</option>
                    <option>image</option>
                  </Input>
                </Col>
                
              </FormGroup>

              {
                dataType == 'text'
                ? 
                <FormGroup row>
                  <Label for="text" sm={3}>Type Your Text:  </Label>
                  <Col sm={9}>
                    <Input type="textarea" name="data" id="text" onChange={this.handleChange}>
                    </Input>
                    
                  </Col>
                  <Col sm={{ size: 10, offset: 6 }}><Button type="button" color="primary" onClick={this.handleSubmit} className="mt-2">Submit</Button></Col>
                  
                  
                </FormGroup>
                : 
                dataType == 'image'
                ?
                <FormGroup row>
                  <Label for="image" sm={3}>Upload Image:  </Label>
                  <Col sm={9}>
                    <Input type="file" name="data" id="image" onChange={this.handleChange}>
                    </Input>
                  </Col>
                  <Col sm={{ size: 10, offset: 6 }}><Button type="button" color="primary" onClick={this.handleSubmit} >Submit</Button></Col>
              
                </FormGroup> : ''
              }
            </Form>
        </div>
        <div className="column">
          <TextAnimator animation={animation} font={font} duration={duration} data={submit ? data : ''} dataType={dataType} className={'colDvd'} tStyle={{marginLeft: '25px'}}/>
        </div>
      </div>
    );
  }
}

export default App;
