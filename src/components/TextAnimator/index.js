import React, { Component } from 'react';
import './TextAnimator.scss';
// import meow from '../../assets/meow.png'

class TextAnimator extends Component {

    componentDidUpdate=() => {
        const {duration, animation, dataType} = this.props;
        console.log(duration, animation)
        if(animation === 'slide ltr') {
            this.slide(duration)
        } else if(animation === 'slide with bounce') {
            this.brick(duration)
        } else if(animation === 'bounce') {
           this.ball(duration)
        } else if(dataType == 'text' && animation === 'text' ) {
            this.animateText(duration)
        }
        // if (dataType == 'image') {
        // }
    }

    
    animate = ({duration, draw, timing}) => {
        let start = performance.now();
      
        requestAnimationFrame(function animate(time) {
          let timeFraction = (time - start) / duration;
          if (timeFraction > 1) timeFraction = 1;
      
          let progress = timing(timeFraction)
      
          draw(progress);
      
          if (timeFraction < 1) {
            requestAnimationFrame(animate);
          }
      
        });
    }



    makeEaseOut = (timing) => {
        console.log(timing, 'makeeaseout')
        return (timeFraction) => {
          return 1 - timing(1 - timeFraction);
        }
    }
  
    bounce = (timeFraction) => {
        for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (timeFraction >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
            }
        }
    }
    slide = (duration) =>  {
        console.log('slide function calling')
        this.animate({
            duration: duration,
            timing: (timeFraction) => {
                return timeFraction;
            },
            draw: (progress) => {
                // console.log(document.getElementById('elem'), "document.getElementById('elem')")
                if (document.getElementById('elem'))document.getElementById('elem').style.width = progress * 100 + '%';
            }
        });
    }
   
  
    brick = (duration) => {
        console.log('brick function for slide with bounce calling', document.getElementById('brick'))
        this.animate({
            duration: duration,
            timing: this.makeEaseOut(this.bounce),
            draw: (progress) => {
                // console.log(document.getElementById('brick'), "document.getElementById('brick')")
                if (document.getElementById('brick'))document.getElementById('brick').style.left = progress * 500 + 'px';
            
            }
        });
    };

    ball = (duration) =>  {
        console.log('ball function for bounce calling', document.getElementById('ball'))

        let to = document.getElementById('field').clientHeight - document.getElementById('ball').clientHeight;

        this.animate({
            duration: duration,
            timing: this.makeEaseOut(this.bounce),
            draw: (progress) => {
                // debugger
                // console.log(document.getElementById('ball'), "document.getElementById('ball')")
               if (document.getElementById('ball')) document.getElementById('ball').style.top = to * progress + 'px'
            }
        });
    }

    animateText = (duration) => {
        let textArea = document.getElementById('textExample');
        // console.log(textArea)
        let text = textArea.innerHTML;
        let to = this.props.data.length,
        from = 0;

        this.animate({
            duration: duration,
            timing: this.bounce,
            draw: (progress) => {
            let result = (to - from) * progress + from;
            textArea.innerHTML = text.substr(0, Math.ceil(result))
            }
        });
    }



    render() {
        const {animation, font, data, dataType, duration } = this.props;
        console.log(duration, animation, 'render')
        
        return(
            <div style={this.props.tStyle} className={this.props.className}>
                {
                    animation == 'slide ltr' &&
                    <div className="textAnimator" id="elem" style={{fontSize: font}}>
                        {dataType == 'text' ? data : <img src={data} />}
                        </div>
                }

                {
                    animation == 'slide with bounce' && 
                    <div id="path">
                        <div id="brick" style={{fontSize: font}}>
                            {dataType == 'text' ? data : <img src={data} />}
                        </div>
                    </div>
                }

                {
                    dataType == 'text' && animation == 'text' && 
                    <div id="textExample" style={{fontSize: font}}>
                        {data}
                    </div>
                }
                
                {
                    animation == 'bounce' && 
                    <div id="field">
                        <div id="ball"  style={{fontSize: font}}>
                            {dataType == 'text' ? data : <img src={data} />}
                        </div>
                    </div>
                }

              

           </div >
        )
    }
}
export default TextAnimator;