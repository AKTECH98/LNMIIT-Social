import React from "react";
import Header from "../../components/Header";
import Personal from "../../components/Personal";
import { postRequest } from "../../components/CallApi";
import WidgetProject from "../../components/WidgetProject";
import WidgetHack from "../../components/WidgetHack";
import { Redirect } from "react-router-dom";

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personal: null,
    };
  }

  render() {
    const url = window.location.href;
    const parser = require("url-parameter-parser");
    const res = parser(url);
    const query = res.email;

    return (
      <div>
        {query == undefined ? (
          <Redirect
            to={"ProfilePage?email=" + window.localStorage.getItem("email")}
          />
        ) : (
          postRequest(
            "profile/getprofiledetails",
            {
              email: query.split("#")[0],
            },
            (res) => {
              this.setState({ personal: res.response });
            }
          )
        )}
        <Header logout={true} />
        <div className='profile__page'>
          <div className='profile__info'>
            <div className='profile__detail'>
              <Personal
                personal={this.state.personal}
                view={
                  query.split("#")[0] != window.localStorage.getItem("email")
                }
              />
            </div>
          </div>
          <div className='profile__widget'>
            <WidgetProject
              user={
                query.split("#")[0] == undefined
                  ? window.localStorage.getItem("email")
                  : query.split("#")[0]
              }
            />
            <WidgetHack
              user={
                query.split("#")[0] == undefined
                  ? window.localStorage.getItem("email")
                  : query.split("#")[0]
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
