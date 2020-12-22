import React from 'react';

import HeaderDetails from './DetailsHeader';

export default class WidgetView extends React.Component {

  constructor(props)
  {
    super(props);
  }

  componentDidMount(){
    
    if(this.props.work.length!=0)
    {
      var slideIndex = 0;
      showSlide();

      function showSlide() {
        var i;
       // const type = this.props.type
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active__dot", "");
        }
        slides[slideIndex-1].style.display = "block";  
        dots[slideIndex-1].className += " active__dot";
        setTimeout(showSlide, 2000); // Change image every 2 seconds
      }
    }
  }

  render(){
    return(
      <div>
        <div className="slideshow-container">
        {
          this.props.work.map((project,index) => (
            <div className="item mySlides fade" key = {index}>
            <HeaderDetails
              optionText = {project}
              index = {index}
            />
            </div>
          ))
        }
        </div>
        <br/>
        
        <div className = "slideshow--dot">
        {
          this.props.work.map((project,index) => (
            <span className="dot" key = {index}></span>  
          ))
        }
        </div>
      </div>
    )
  }
}
