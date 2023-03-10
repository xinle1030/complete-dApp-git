import React, { Component } from "react";
import "./App.css";
import Web3 from "web3";
import Navbar from "./Navbar.js";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import Main from "./Main.js";
import ParticleSettings from "./ParticleSettings.js";

// core component
class App extends Component {

  // run the function before the rendering component
  async UNSAFE_componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereum browser detected! You can check out MetaMask");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();

    //Load Tether Contract
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      this.setState({ tether: tether });
      let tetherBalance = await tether.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ tetherBalance: tetherBalance.toString() });
    } else {
      window.alert("Error! Tether contract not deployed - no detected network");
    }

    //Load RWD Contract
    const rwdData = RWD.networks[networkId];
    if (tetherData) {
      const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
      this.setState({ rwd: rwd });
      let rwdBalance = await rwd.methods.balanceOf(this.state.account).call();
      this.setState({ rwdBalance: rwdBalance.toString() });
    } else {
      window.alert("Error! RWD contract not deployed - no detected network");
    }

    //Load Decentral Contract
    const decentralBankData = DecentralBank.networks[networkId];
    if (tetherData) {
      const decentralBank = new web3.eth.Contract(
        DecentralBank.abi,
        decentralBankData.address
      );
      this.setState({ decentralBank: decentralBank });
      let stakingBalance = await decentralBank.methods
        .stakingBalance(this.state.account)
        .call();
      this.setState({ stakingBalance: stakingBalance.toString() });
    } else {
      window.alert(
        "Error! DecentralBank contract not deployed - no detected network"
      );
    }

    this.setState({ loading: false });
  }

  // two functions : one that stakes and one that unstakes
  // leverage our decentralBank contract - deposit tokens and unstaking

  // .... For staking phase ....
  // depositTokens transferFrom ... => requires function approve transaction hash ----
  // STAKING FUNCTION ?? >> decentralBank.depositTokens(send transactionHash ==>)

  stakeTokens = async (amount) => {
    this.setState({ loading: true });
    // tether needs to approve the third party transaction from acc to decentralBank
    // approve the destination address = decentralBank._address

    await this.state.tether.methods
      .approve(this.state.decentralBank._address, amount)
      .send({ from: this.state.account })
      .on("transactionHash", async (hash) => {
        console.log(hash);

        // grab tether from acc and deposit to decentralBank
        await this.state.decentralBank.methods
          .depositTokens(amount)
          .send({ from: this.state.account })
          .on("transactionHash", (hash) => {
            console.log(hash);
            window.location.reload(true);
            this.setState({ loading: false });
          })
          .on("error", (err) => {
            console.log(err.message);
          });
      });
  };

  // unstake everything
  unstakeTokens = () => {
    this.setState({ loading: true });
    this.state.decentralBank.methods
      .unstakeTokens()
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        window.location.reload(true);
        this.setState({ loading: false });
      });
  };

  constructor(props) {
    super(props);
    // initialize state
    this.state = {
      account: "0x0",
      // contract is a JS obj
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: "0",
      rwdBalance: "0",
      stakingBalance: "0",
      loading: true,
    };
  }

  render() {
    let content = this.state.loading ? (
      <p
        id="loader"
        className="text-center"
        style={{ margin: "30px", color: "white" }}
      >
        LOADING PLEASE...
      </p>
    ) : (
      <Main
        tetherBalance={this.state.tetherBalance}
        rwdBalance={this.state.rwdBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
      />
    );
    return (
      <div className="App" style={{ position: "relative" }}>
        {/* for ParticlesSettings to be fixed in position regardless of components around, we use "absolute" position */}
        <div style={{ position: "absolute" }}>
          <ParticleSettings />
        </div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            {/* 100vm means 100% percent of the view */}
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "600px", minHeight: "100vm" }}
            >
              <div>{content}</div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
