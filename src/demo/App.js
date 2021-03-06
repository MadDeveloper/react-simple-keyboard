import React, {Component} from 'react';
import Keyboard from '../lib';
import './css/App.css';

class App extends Component {
  state = {
    input: '',
    layoutName: "default"
  }
  
  onChange = (input) => {
    this.setState({
      input: input
    }, () => {
      console.log("Input changed", input);
    });
  }

  onKeyPress = (button) => {
    console.log("Button pressed", button);

    /**
     * Shift functionality
     */
    if(button === "{capslock}" || button === "{shiftleft}" || button === "{shiftright}")
      this.handleShiftButton();
  }

  handleShiftButton = () => {
    let layoutName = this.state.layoutName;
    let shiftToggle = layoutName === "default" ? "shift" : "default";

    this.setState({
      layoutName: shiftToggle
    });
  }

  onChangeInput = event => {
    let input = event.target.value;
    this.setState(
      {
        input: input
      },
      () => {
        this.keyboard.setInput(input);
      }
    );
  };
  
  render(){
    return (
      <div className={"demoPage"}>
        <div className={"screenContainer"}>
          <textarea className={"inputContainer"} value={this.state.input} onChange={e => this.onChangeInput(e)} />
        </div>
        <Keyboard
          ref={r => this.keyboard = r}
          onChange={input => this.onChange(input)}
          onKeyPress={button => this.onKeyPress(button)}
          layoutName={this.state.layoutName}
          newLineOnEnter={true}
          physicalKeyboardHighlight={true}

          layout={{
            'default': [
              '` 1 2 3 4 5 6 7 8 9 0 - = {backspace}',
              '{tab} q w e r t y u i o p [ ] \\',
              '{capslock} a s d f g h j k l ; \' {enter}',
              '{shiftleft} z x c v b n m , . / {shiftright}',
              '.com @ {space}'
            ],
            'shift': [
              '~ ! @ # $ % ^ & * ( ) _ + {backspace}',
              '{tab} Q W E R T Y U I O P { } |',
              '{capslock} A S D F G H J K L : " {enter}',
              '{shiftleft} Z X C V B N M < > ? {shiftright}',
              '.com @ {space}'
            ]
          }}
          theme={"hg-layout-default hg-theme-default"}
          debug={true}
        />
      </div>
    );
  }
 
}

export default App;