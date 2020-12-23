import React from 'react';
import { CarouselProvider, Slider, Slide, Dot, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import HeaderDetails from './DetailsHeader';

export default class WidgetView extends React.Component {

  constructor(props)
  {
    super(props);
  }

  render(){
    return(
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={'firContent'}
        totalSlides={this.props.work.length}
        isPlaying = {true}
        interval = {2000}
        isIntrinsicHeight = {true}
        dragEnabled = {false}
        touchEnabled = {false}
      >
        <Slider>
          {
            this.props.work.map((project,index) => (
              <Slide index={index} key = {index}>
                <div className = "item">
                  <HeaderDetails
                    optionText = {project}
                    index = {index}
                  />
                </div>
              </Slide>
            ))
          }
        </Slider>
      </CarouselProvider>
    )
  }
}
