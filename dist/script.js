var timerId;

//React
const App = props => {

  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(25);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [breakLength, setBreakLength] = React.useState(5);
  const [isTimerOn, setTimerOn] = React.useState(false);
  const [currentState, setCurrentState] = React.useState("Ready to work?");

  React.useEffect(() => {
    setMinutes(sessionLength);
  }, [sessionLength]);

  const handleBreakChange = e => {
    if (e.type == "click") {
      if (e.target.id == "break-increment" && breakLength < 60) setBreakLength(prevState => prevState + 1);
      if ((e.target.id == "break-decrement" || e.target.parentElement.id == "break-decrement") && breakLength > 1) setBreakLength(prevState => prevState - 1);
    } else {
      setBreakLength(e.target.value);
    }
  };

  const handleSessionChange = e => {
    if (e.type == "click") {
      if (e.target.id == "session-increment" && sessionLength < 60) setSessionLength(prevState => prevState + 1);
      if ((e.target.id == "session-decrement" || e.target.parentElement.id == "session-decrement") && sessionLength > 1) setSessionLength(prevState => prevState - 1);
    } else {
      setSessionLength(e.target.value);
    }
  };

  const playSound = () => {
    document.getElementById("beep").play();

  };


  // Button Logic

  var now;
  var endTime;

  const startTimer = () => {

    setTimerOn(true);
    now = new Date().getTime();
    endTime = now + sessionLength * 60 * 1000;

    if (minutes != sessionLength && seconds != 0) {
      endTime = now + minutes * 60 * 1000 + seconds * 1000;
    }
    document.getElementById("play_pause_button").classList.remove("fa-play");
    document.getElementById("play_pause_button").classList.add("fa-pause");


    //     document.getElementById("timer-label").style.opacity = 0


    //       setTimeout(() => {

    //         setCurrentState("Get to it!")
    //         document.getElementById("timer-label").style.opacity = 1
    //       }, 1000)

    setCurrentState("Get to it!");




    //session interval logic

    timerId = setInterval(() => {
      now = new Date().getTime();

      let mins = Math.floor((endTime - now) / (60 * 1000));
      let secs = Math.round((endTime - now) / 1000) % 60;

      if (secs / 10 < 1) mins = Math.round((endTime - now) / (60 * 1000));

      //switch at 0

      if (mins == -0 && secs == -0) {
        clearInterval(timerId);
        startBreak();
        playSound();
      }

      setMinutes(mins);
      setSeconds(secs);
    }, 1000);
  };

  const pauseTimer = () => {
    console.log("pausing");
    document.getElementById("play_pause_button").classList.remove("fa-pause");

    document.getElementById("play_pause_button").classList.add("fa-play");

    setTimerOn(false);
    clearInterval(timerId);
  };

  const startBreak = () => {


    setTimerOn(true);
    now = new Date().getTime();
    endTime = now + breakLength * 60 * 1000;

    if (minutes != sessionLength && seconds != 0) {
      endTime = now + minutes * 60 * 1000 + seconds * 1000;
    }document.getElementById("play_pause_button").classList.remove("fa-play");

    document.getElementById("play_pause_button").classList.add("fa-pause");

    setCurrentState("Take a break!");

    timerId = setInterval(() => {
      now = new Date().getTime();

      let mins = Math.floor((endTime - now) / (60 * 1000));
      let secs = Math.round((endTime - now) / 1000) % 60;

      if (secs / 10 < 1) mins = Math.round((endTime - now) / (60 * 1000));

      if (mins == -0 && secs == -0) {
        document.getElementById("beep").play();
        clearInterval(timerId);
        startTimer();
      }
      setMinutes(mins);
      setSeconds(secs);
    }, 1000);
  };


  const resetTimer = () => {
    document.getElementById("play_pause_button").classList.remove("fa-pause");
    document.getElementById("play_pause_button").classList.add("fa-play");

    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;



    setCurrentState("Ready to work?");

    setTimerOn(false);
    clearInterval(timerId);
    setMinutes(sessionLength);
    setSeconds(0);
    setBreakLength(5);
    setSessionLength(25);
  };

  const startStop = () => {
    if (currentState == "Get to it!" && !isTimerOn) {
      startTimer();
    } else if (currentState == "Take a break!" && !isTimerOn) {
      startBreak();
    } else if (!isTimerOn) {
      startTimer();
    } else pauseTimer();
  };


  return /*#__PURE__*/(
    React.createElement("div", { id: "timer-area", className: "container-fluid" }, /*#__PURE__*/
    React.createElement("h1", { id: "timer-title", className: "text-center" }, "Pomodoro Timer", /*#__PURE__*/

    React.createElement("audio", { id: "beep", src: "https://drive.google.com/uc?export=view&id=1ARD2RMoCf5LnIrh56eNuOQwP2F53mI3A", preload: "auto" })), /*#__PURE__*/


    React.createElement("div", { id: "counter-area", className: "row m-3 justify-content-center" }, /*#__PURE__*/
    React.createElement("div", { id: `break-counter`, className: "counter col-xs-6 col-sm-3 col-md-3 col-lg-3" }, /*#__PURE__*/
    React.createElement("div", { id: `break-label`, className: "text-center text-muted" }, `Break length:`), /*#__PURE__*/
    React.createElement("div", { className: "card" }, /*#__PURE__*/
    React.createElement("div", { className: "card-body text-center" }, /*#__PURE__*/
    React.createElement("div", { id: "break-length", className: "text-center" },
    breakLength))), /*#__PURE__*/



    React.createElement("div", { className: "btn-group d-flex" }, /*#__PURE__*/
    React.createElement("button", { id: "break-increment", className: "btn btn-outline-dark", onClick: e => {handleBreakChange(e);} }, /*#__PURE__*/React.createElement("i", { className: "fas fa-arrow-up" })), /*#__PURE__*/
    React.createElement("button", { id: "break-decrement", className: "btn btn-outline-dark", onClick: e => {handleBreakChange(e);} }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-arrow-down" })))), /*#__PURE__*/




    React.createElement("div", { id: `session-counter`, className: "counter col-xs-6 col-sm-3 col-md-3 col-lg-3" }, /*#__PURE__*/
    React.createElement("div", { id: "session-label", className: "text-center text-muted" }, `Session length:`), /*#__PURE__*/
    React.createElement("div", { className: "card" }, /*#__PURE__*/
    React.createElement("div", { className: "card-body text-center" }, /*#__PURE__*/
    React.createElement("div", { id: "session-length", className: "text-center" },
    sessionLength))), /*#__PURE__*/



    React.createElement("div", { className: "btn-group d-flex" }, /*#__PURE__*/
    React.createElement("button", { id: "session-increment", className: "btn btn-outline-dark", onClick: e => {handleSessionChange(e);} }, /*#__PURE__*/React.createElement("i", { className: "fas fa-arrow-up" })), /*#__PURE__*/
    React.createElement("button", { id: "session-decrement", className: "btn btn-outline-dark", onClick: e => {handleSessionChange(e);} }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-arrow-down" }))))), /*#__PURE__*/




    React.createElement("div", { className: "d-flex justify-content-center m-3" }, /*#__PURE__*/
    React.createElement("div", { className: "card bg-success col-12 col-sm-6", id: "counter-display" }, /*#__PURE__*/
    React.createElement("div", { id: "time-left", className: "card-body text-center text-white" },
    minutes / 10 >= 1 ? minutes : "0" + minutes, ":", seconds / 10 >= 1 ? seconds : '0' + seconds), /*#__PURE__*/

    React.createElement("div", { id: "interaction-area", className: "d-flex" }, /*#__PURE__*/
    React.createElement("button", { id: "start_stop", className: "btn btn-outline-dark p-3", onClick: startStop }, /*#__PURE__*/React.createElement("i", { id: "play_pause_button", className: "fas fa-play" })), /*#__PURE__*/
    React.createElement("button", { id: "reset", className: "btn btn-outline-dark p-3", onClick: resetTimer }, /*#__PURE__*/React.createElement("i", { className: "fas fa-redo" }))))), /*#__PURE__*/



    React.createElement("div", { id: "timer-label", class: "d-flex justify-content-center" }, currentState)));



};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app-container'));