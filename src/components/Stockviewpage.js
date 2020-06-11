import React, { Component } from "react";
import "./style.css";
import * as firebase from "firebase";
import "../config";
import Model from "./Model";

export class Stockviewpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      buttonINTC: false,
      buttonBA: false,
      buttonMSFT: false,
      buttonMCD: false,
      buttonDIS: false,
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("data")
      .once("value")
      .then((snapShot) => {
        this.setState({
          arr: this.state.arr.concat(snapShot.val()),
        });
      });
  }

  fireDB = () => {
    firebase
      .database()
      .ref("data")
      .once("value")
      .then((snapShot) => {
        this.setState({
          arr: this.state.arr.concat(snapShot.val()),
        });
      });
    this.setState({
      arr: [],
    });
  };

  handlePopUP = (e, val) => {
    this.setState({
      ...this.state,
      [val]: !this.state[val],
    });
  };

  handlePopUPOff = (val2) => {
    this.setState({
      ...this.state,
      [val2]: !this.state[val2],
    });
  };

  deleteHandler = (e, y, symbol, name) => {
    firebase
      .database()
      .ref("data")
      .child(y)
      .remove()
      .catch(() => {
        alert("somthing went worg coudn't delete");
      });

    firebase.database().ref("data").child(y).update({
      symbol: symbol,
      name: name,
    });

    this.setState({
      ...this.state,
    });
    this.fireDB();
  };

  render() {
    return (
      <>
        {console.log(
          this.state.arr.map((z) => {
            return z.symbol === null;
          })
        )}

        <div className="main_div">
          <table className="table_container">
            <thead>
              <tr>
                <th>Stock symbol</th>
                <th>Stock name</th>
                <th>No.of shares</th>
                <th>Buy price</th>
                <th>Current price</th>
                <th>Profit/Loss</th>
                <th>Delete button</th>
              </tr>
            </thead>

            <tbody>
              {this.state.arr.map((items, index) => {
                if (items.currentPrice) {
                  return (
                    <tr key={items.symbol}>
                      <td>{items.symbol}</td>
                      <td>{items.name}</td>
                      <td>{items.noOfShares} </td>
                      <td>{items.buyPrice}</td>
                      <td>{Math.round(items.currentPrice)}</td>
                      <td>{Math.round(items.buyPrice - items.currentPrice)}</td>
                      <td>
                        <input
                          type="button"
                          value="Delete"
                          style={{ background: "red" }}
                          onClick={(e) => {
                            this.deleteHandler(
                              e,
                              index,
                              items.symbol,
                              items.name
                            );
                          }}
                        />
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
        <p style={{ marginLeft: "30%" }}>Add stocks to my stocks</p>
        <div className="main_btn_container">
          <div className="inner_btn_container_1">
            <button
              onClick={(e) => {
                this.handlePopUP(e, "buttonINTC");
              }}
              className="StockButton"
            >
              INTC
            </button>

            <span className="StockName">Intel Corporation</span>

            <br />

            <button
              onClick={(e) => {
                this.handlePopUP(e, "buttonMSFT");
              }}
              className="StockButton"
            >
              MSFT
            </button>
            <span className="StockName">Microsoft Corporation</span>
            <br />

            <button
              onClick={(e) => {
                this.handlePopUP(e, "buttonDIS");
              }}
              className="StockButton"
            >
              DIS
            </button>
            <span className="StockName">The Walt Disney Company</span>
          </div>
          <div className="inner_btn_container_2">
            <button
              onClick={(e) => {
                this.handlePopUP(e, "buttonBA");
              }}
              className="StockButton"
            >
              BA
            </button>
            <span className="StockName">The Boeing Company</span>
            <br />

            <button
              onClick={(e) => {
                this.handlePopUP(e, "buttonMCD");
              }}
              className="StockButton"
            >
              MCD
            </button>
            <span className="StockName">McDonald's Corporation</span>
          </div>
        </div>

        {/*Modal popup logic statement */}

        {this.state.buttonINTC ? (
          <Model
            ReverseHandlePopUP={() => {
              this.handlePopUPOff("buttonINTC");
            }}
            id={0}
            endPoint="INTC"
            data={() => {
              this.fireDB();
            }}
          />
        ) : null}

        {this.state.buttonBA ? (
          <Model
            ReverseHandlePopUP={() => {
              this.handlePopUPOff("buttonBA");
            }}
            id={1}
            endPoint="BA"
            data={() => {
              this.fireDB();
            }}
          />
        ) : null}

        {this.state.buttonMSFT ? (
          <Model
            ReverseHandlePopUP={() => {
              this.handlePopUPOff("buttonMSFT");
            }}
            id={2}
            endPoint="MSFT"
            data={() => {
              this.fireDB();
            }}
          />
        ) : null}

        {this.state.buttonMCD ? (
          <Model
            ReverseHandlePopUP={() => {
              this.handlePopUPOff("buttonMCD");
            }}
            id={3}
            endPoint="MCD"
            data={() => {
              this.fireDB();
            }}
          />
        ) : null}

        {this.state.buttonDIS ? (
          <Model
            ReverseHandlePopUP={() => {
              this.handlePopUPOff("buttonDIS");
            }}
            id={4}
            endPoint="DIS"
            data={() => {
              this.fireDB();
            }}
          />
        ) : null}
      </>
    );
  }
}

export default Stockviewpage;
