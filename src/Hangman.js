import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import words from "./words";

class Hangman extends Component {
  static defaultProps = {
    maxGuess: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  state = {
    nWrong: 0,
    answer: words[Math.floor(Math.random() * words.length)],
    guessed: new Set(),
    isGameOver: false,
    nRight: 0,
    won: false
  };

  guessedWord = () => {
    return this.state.answer
      .split("")
      .map(letter =>
        this.state.isGameOver
          ? letter
          : this.state.guessed.has(letter)
          ? letter
          : "_"
      );
  };

  handleGuess = evt => {
    let letter = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(letter),
      nWrong: st.nWrong + (st.answer.includes(letter) ? 0 : 1),
      nRight: st.nRight + (st.answer.includes(letter) ? 1 : 0),
      isGameOver: st.nWrong === this.props.maxGuess - 1 ? true : false,
      won: st.nRight === String.prototype.concat(...new Set(this.state.answer)).length - 1 ? true : false
    }));
  };

  generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter, index) => (
      <button
        key={index}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
        hidden={this.state.isGameOver ? true : this.state.won ? true :false}
      >
        {letter}
      </button>
    ));
  };

  handleReset = () => {
    this.setState({
      nWrong: 0,
      answer: words[Math.floor(Math.random() * words.length)],
      guessed: new Set(),
			isGameOver: false,
			won:false,
			nRight:0
    });
  };

  render() {
    return (
      <div className="Hangman">
        <h1>
          {this.state.isGameOver
            ? "GameOver"
            : this.state.won
            ? "You Won"
            : "Hangman"}
        </h1>
        <img
          src={this.props.images[this.state.nWrong]}
          alt={`${this.state.nWrong} out of ${this.props.maxGuess}`}
        />
        <p>Max Guess : {this.props.maxGuess}</p>
        <p>
          {this.state.nWrong > 0 ? `Wrong Guess : ${this.state.nWrong}` : ""}
        </p>
        <p className="Hangman-word">{this.guessedWord()}</p>
        <p className="Hangman-btn">{this.generateButtons()}</p>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}

export default Hangman;
