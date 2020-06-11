import React, { Component } from "react";
import * as firebase from "firebase";
import axios from "axios";
import "../config";
import "./style.css";

export class Model extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noOfShares: "",
      buyPrice: "",
      buyData: "",
      name: "",
    };
  }
  componentDidMount() {
    this.initialDataFromDatabase(this.props.id);
    this.getDataFromApi(this.props.endPoint, this.props.id);
  }

  getDataFromApi = (endpoint, userId) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${endpoint}&apikey=FKN7EAMLAZ78TT6S`;
    axios(url).then((res) => {
      let dailyData = res.data["Time Series (Daily)"];

      let latestData = Object.values(dailyData)[0];

      firebase.database().ref("data").child(userId).update({
        currentPrice: latestData["4. close"],
      });
    });
  };
  /*getting company name from database to show on pop modal */

  initialDataFromDatabase = (id) => {
    firebase
      .database()
      .ref("/data/" + id)
      .once("value")
      .then((snapShot) => {
        this.setState({
          ...this.state,
          name: snapShot.val().name,
        });
      });
  };

  /*getting input value by the user after filling the form */

  getDataFromModal = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  /*closing pop up modal logic*/

  popClose = () => {
    this.props.ReverseHandlePopUP();
  };

  /*sending database from modal flield */

  sendDataToTheDataBaseFromModal = (val3) => {
    firebase
      .database()
      .ref("data")
      .child(val3)
      .update({
        noOfShares: this.state.noOfShares,
        buyPrice: this.state.buyPrice,
      })
      .then(() => {
        this.props.data();
      })
      .then(() => {
        this.props.ReverseHandlePopUP();
      });
  };

  render() {
    return (
      <>
        <div className="model_main_container">
          <div className="model_inner_container">
            <input
              onClick={this.popClose}
              type="button"
              value="X"
              style={{ marginLeft: "94%" }}
            />
            <p style={{ textAlign: "center" }}>
              Add {this.state.name} to my stock
            </p>

            <div className="model_content_container">
              <div className="model_content_container_1">
                <p>company name:</p>
                <p>No. of Shares:</p>
                <p>Buy Price:</p>
                <p>Buy Date</p>
              </div>
              <div className="model_content_container_2">
                <p>{this.state.name}</p>
                <b />
                <input
                  onChange={this.getDataFromModal}
                  type="text"
                  placeholder="No. of Shares"
                  name="noOfShares"
                  value={this.state.noOfShares}
                  required
                />
                <br />
                <br />

                <input
                  onChange={this.getDataFromModal}
                  type="text"
                  placeholder="Buy Price"
                  name="buyPrice"
                  value={this.state.buyPrice}
                />
                <br />
                <br />
                <input type="Date" name="date" />
              </div>
            </div>
            <input
              onClick={() => {
                this.sendDataToTheDataBaseFromModal(this.props.id);
              }}
              type="button"
              name="add"
              value="Add"
              style={{
                marginLeft: "50%",
                marginRight: "50%",
                marginTop: "35px",
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Model;
