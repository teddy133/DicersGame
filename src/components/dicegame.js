/**
 * This component is where we set props and control the game
 * User profile is set and all scores are handled here
 */
import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'reactstrap';
import '../App.css';
import dice1 from '../images/dice1.png';
import dice2 from '../images/dice2.png';
import dice3 from '../images/dice3.png';
import dice4 from '../images/dice4.png';
import dice5 from '../images/dice5.png';
import dice6 from '../images/dice6.png';

class DiceGame extends Component {
  handleClick = (event, id) => {
    event.preventDefault();
    // this.props.toggleTurn();
    id === 1
      ? this.props.updatePlayer1Score()
      : this.props.updatePlayer2Score();
  };
  render() {
    const { name, results, isPlayerTurn, total, isWinner } = this.props;
    const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];
    return (
      <Card>
        <Row id="userDetails">
          <Col xs="6">
            <h3>{name}</h3>
          </Col>
          <Col xs="6">
            <h3>Total Score: {total}</h3>
          </Col>
        </Row>
        <Button
          id="playButton"
          onClick={event => this.handleClick(event, this.props.id)}
          disabled={!isPlayerTurn}
        >
          Play
        </Button>
        {results.map((result, index) => (
          <Row id="moverow" key={index}>
            {index > 2 ? 'Total:' : `Round ${index + 1}:`}
            <Col xs="6">
              <img
                src={diceImages[result - 1]}
                alt="dice game"
                style={{ maxWidth: '30px' }}
              />
            </Col>
          </Row>
        ))}
        <h3 id="moverow" hidden={!isWinner}>
          Winner
        </h3>
      </Card>
    );
  }
}

export default DiceGame;
