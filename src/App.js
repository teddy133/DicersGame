import React, { Component } from 'react';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import './App.css';
import DiceGame from './components/dicegame';

class App extends Component {
  // Add constructor and set the state
  // isPlayerTurn checks if it is player turn to play.
  // Player can play up to three times
  constructor(props) {
    super(props);
    this.state = {
      player1: {
        id: 1,
        isPlayerTurn: true,
        results: [],
        totalScore: 0
      },
      player2: {
        id: 2,
        isPlayerTurn: false,
        results: [],
        totalScore: 0
      }
    };
  }

  toggleTurn = () => {
    this.setState(prevState => ({
      player1: {
        id: prevState.player1.id,
        isPlayerTurn: !prevState.player1.isPlayerTurn,
        results: prevState.player1.results,
        totalScore: prevState.player1.totalScore
      },
      player2: {
        id: prevState.player2.id,
        isPlayerTurn: !prevState.player2.isPlayerTurn,
        results: prevState.player2.results,
        totalScore: prevState.player2.totalScore
      }
    }));
  };

  updatePlayer1Score = () => {
    if (this.state.player1.results.length < 3) {
      let score = Math.floor(Math.random() * 6 + 1);
      this.setState(prevState => ({
        player1: {
          id: prevState.player1.id,
          isPlayerTurn: prevState.player1.isPlayerTurn,
          results: [...prevState.player1.results, score],
          totalScore: prevState.player1.totalScore + score
        }
      }));
      this.toggleTurn();
    }
  };
  updatePlayer2Score = () => {
    if (this.state.player2.results.length < 3) {
      let score = Math.floor(Math.random() * 6 + 1);
      this.setState(prevState => ({
        player2: {
          id: prevState.player2.id,
          isPlayerTurn: prevState.player2.isPlayerTurn,
          results: [...prevState.player2.results, score],
          totalScore: prevState.player2.totalScore + score
        }
      }));
      this.toggleTurn();
      if (this.state.player2.results.length > 3) {
        this.getWinner();
      }
    }
  };

  render() {
    const { player1, player2 } = this.state;
    return (
      <div className="App">
        <Container fluid>
          <Jumbotron id="jumbotron">
            <h1 className="display-3">Welcome to Gamers Dice Game</h1>
            <p>
              This is a dice game played by two players. <br />
              Each player has the opportunity to play three times. <br />
              Players play each after the other
              <br />
              The winner is the one who score the highest.
            </p>
          </Jumbotron>
          <Container>
            <Row>
              <Col xs="6">
                <DiceGame
                  id={this.state.player1.id}
                  name="Player 1"
                  results={player1.results}
                  isPlayerTurn={player1.isPlayerTurn}
                  toggleTurn={this.toggleTurn}
                  updatePlayer1Score={this.updatePlayer1Score}
                  total={this.state.player1.totalScore}
                  isWinner={
                    this.state.player1.totalScore >
                    this.state.player2.totalScore
                  }
                />
              </Col>
              <Col xs="6">
                <DiceGame
                  id={this.state.player2.id}
                  name="Player 2"
                  results={player2.results}
                  isPlayerTurn={player2.isPlayerTurn}
                  toggleTurn={this.toggleTurn}
                  updatePlayer2Score={this.updatePlayer2Score}
                  total={this.state.player2.totalScore}
                  isWinner={
                    this.state.player2.totalScore >
                    this.state.player1.totalScore
                  }
                />
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }
}

export default App;
