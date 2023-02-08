import React, { Component } from "react";
// import issueRewards from "../../scripts/issue-Tokens";

class Airdrop extends Component {
  // Airdrop to have a timer that counts down
  // initialize the countdown after our customer have staked a certain amount like 50
  // timer functionality, countdown, starTimer, state - for time to work..

  constructor() {
    super();
    this.state = { time: {}, seconds: 5 }; // the airdrop will run 60 sec after staking.
    this.timer = 0; // Initialize timer

    // We bind this keyword to startTimer and countDown
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  // Build startTimer functionality
  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      // run countDown() function every 1s
      this.timer = setInterval(this.countDown, 1000); // 1000ms = 1s
    }
  }

  // Build countdown functionality
  countDown() {
    // 1. countdown one second at a time
    let seconds = this.state.seconds - 1;

    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // 2. Stop counting when we hit zero
    if (seconds === 0) {
      // issueRewards();
      clearInterval(this.timer);
    }
  }

  secondsToTime(secs) {
    let hours, seconds, minutes;
    hours = Math.floor(secs / (60 * 60));

    let devisor_for_minutes = secs % (60 * 60);
    minutes = Math.floor(devisor_for_minutes / 60);

    let devisor_for_seconds = devisor_for_minutes % 60;
    seconds = Math.ceil(devisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  // is called immediately the after the component mounted
  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  airdropReleaseTokens() {
    let stakingB = this.props.stakingBalance;

    // If staking balance is more than 50 usdt, begin the airdrop of reward token
    if (stakingB >= "50000000000000000000") {
      this.startTimer();
    }
  }

  render() {
    this.airdropReleaseTokens();
    return (
      <div style={{ color: "black" }}>
        {this.state.time.m}:{this.state.time.s}
      </div>
    );
  }
}

export default Airdrop;
