import React from 'react';
import WidgetDetails from './WidgetDetails';
import Button from './Button';

export default class ColabView extends React.Component{

  constructor(props){
    super(props)
  }

  w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
  }

  w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);     
      }
    }
    element.className = arr1.join(" ");
  }

  filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("colabDiv");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
      this.w3RemoveClass(x[i], "showColab");
      if (x[i].className.indexOf(c) > -1) this.w3AddClass(x[i], "showColab");
    }
  }

  componentDidMount(){
    this.filterSelection("all")
    var btntry = document.getElementById("filterColab");
    var btns = btntry.getElementsByClassName("filter__button");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function(){
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
  }

  render(){
    return(
      <div>
        {
          (this.props.collaborations.length==0)?
            "No Collaborations To Show"
          :
          <div id = "filterColab">
            <button className="filter__button active" onClick={()=>this.filterSelection('all')}> Show all</button>
            <button className="filter__button" onClick={()=>this.filterSelection('PROJECT')}> Projects</button>
            <button className="filter__button" onClick={()=>this.filterSelection('HACKATHON')}> Hackathons</button>
            <button className="filter__button" onClick={()=>this.filterSelection('OTHER')}> Other</button>
          </div>
        }
        <div className = "Widget__View">
        { 
          this.props.collaborations.map((colab,index) => (
              <div className = {"colabDiv "+colab.colab_type} key = {index}>
              <WidgetDetails
                optionText = {colab}
                Request = {this.props.Request}
              />
              </div>
          ))
        }
        </div>
      </div>
    )
  }
}