import React, { Component } from "react";
import tether from "../tether.png";
import Airdrop from "./Airdrop";

class Main extends Component {
  //our React Code goes in here!
  render() {
    return (
      <div id="content" className="mt-3">
        <table className="table text-muted text-center">
          <thead>
            <tr style={{ color: "white" }}>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: "white" }}>
              <td>
                {window.web3.utils.fromWei(this.props.stakingBalance, "Ether")}{" "}
                USTD
              </td>
              <td>
                {window.web3.utils.fromWei(this.props.rwdBalance, "Ether")} RWD
              </td>
            </tr>
          </tbody>
        </table>
        <div className="card mb-2" style={{ opacity: ".9" }}>
          {/* onSubmit takes and event and will execute when form is submitted */}
          <form
            className="mb-3"
            onSubmit={(event) => {
              event.preventDefault();
              let amount = this.input.value.toString();
              amount = window.web3.utils.toWei(amount, "Ether");
              this.props.stakeTokens(amount);
            }}
          >
            <div style={{ borderSpacing: "0 1em" }}>
              <label className="float-left" style={{ marginLeft: "15px" }}>
                <b>Stake Tokens</b>
              </label>
              <span className="float-right" style={{ marginRight: "8px" }}>
                <b>
                  Balance:{" "}
                  {window.web3.utils.fromWei(this.props.tetherBalance, "Ether")}
                </b>
              </span>
              <div className="input-group mb-4">
                {/* set input here to this.input to be used in onSubmit() */}
                <input
                  type="text"
                  placeholder="0"
                  required
                  ref={(input) => (this.input = input)}
                />
                <div className="input-group-open">
                  <div className="input-group-text">
                    <img alt="tether" src={tether} height="32" />
                    &nbsp;&nbsp;&nbsp;USDT
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                DEPOSIT
              </button>
            </div>
          </form>
          <button
            className="btn btn-primary btn-lg btn-block"
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              this.props.unstakeTokens();
            }}
          >
            WITHDRAW
          </button>
          <div className="card-body text-center" style={{ color: "blue" }}>
            AIRDROP
            <Airdrop
              stakingBalance={this.props.stakingBalance}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
