import { Component, Fragment } from 'react';
import './App.css';
import questions from './Apprentice_TandemFor400_Data.json';

// function to randomize arrays, Durstenfeld-style
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
// copying the correct answers into the same arrays as the incorrect, so they can all be mapped together
for (let i = 0; i < questions.length ; i++) {
  questions[i].incorrect.push(questions[i].correct);
  shuffleArray(questions[i].incorrect)
}

// using a class component, because I find it a lot easier to manage state than in a functional component
class App extends Component {
  constructor(props) {
    super(props);
    // randomize the order of the questions, just once, not every re-render
    this.questions = shuffleArray(questions);
    this.state = { answer: null, score: 0, qNum: 0 }
  }

  inputHandler = (e) => {
    this.setState({ answer: e.target.value })
    if (e.target.value === questions[this.state.qNum].correct)
    {this.setState({ correct: true, score: this.state.score + 1, qNum: this.state.qNum + 1 })}
    if (e.target.value !== questions[this.state.qNum].correct)
    {this.setState({ correct: false, qNum: this.state.qNum + 1 })}
  }

  render() {
    let response;
    if (this.state.correct === true) {
      response = "You are correct!"
    }
    if (this.state.correct === false) {
      response = "Wrong! The correct answer was " + questions[this.state.qNum - 1].correct + "." 
    }
    if (this.state.qNum > 9) {
      return <span>Game over! You got {this.state.score} out of 10 correct.</span>
    }

    return (
      <Fragment>
      <div className="App">
        Tandem Triva Score = {this.state.score}
      </div>
      <div>
      {questions[this.state.qNum].question}
      </div>
      <div>
          {questions[this.state.qNum].incorrect.map(
            (ans) => 
              <ul key={ans}><button value={ans} onClick={this.inputHandler}>{ans}</button></ul>
            )}
      </div>
      <div>
        {response}
      </div>
      </Fragment>
    );
  }
}

export default App;