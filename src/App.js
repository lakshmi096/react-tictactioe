import React, { useState } from "react";
import Icon from "./components/Icon";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const itemArray = new Array(9).fill("empty");

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty", 0, 9);
  };

  const checkIsWinner = () => {
    //  checking  winner of the game
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      setWinMessage(`${itemArray[3]} won`);
    } else if (
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[6]} won`);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinMessage(`${itemArray[1]} won`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[2]} won`);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[2]} won`);
    } else {
      let itemsFilled = itemArray.filter(item => item !== "empty");
      if (itemsFilled.length === itemArray.length) {
        setWinMessage(`No winner`);
      }
    }
  };

  const changeItem = itemNumber => {
    if (winMessage) {
      return toast(winMessage, { type: "success", toastId: itemNumber });
    }

    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
    } else {
      return toast("Already filled", { type: "error", toastId: itemNumber });
    }

    checkIsWinner();
  };

  const displayMessage = winMessage ? (
    <div className="mb-2 mt-2">
      <h1 className="text-winner text-center text-uppercase">
        {winMessage}
      </h1>
      <Button className="player-won" block onClick={reloadGame}> Reload </Button>
    </div>
  ) : (
      <h1 className={"turn-text text-center text-uppercase "}>
        {isCross ? "Cross" : "Circle"}'s turn
      </h1>
    )


  const itemGrid = itemArray.map((item, index) => {
    return (
      <Card key={index} className={"ripple " + item} onClick={() => changeItem(index)}>
        <CardBody className="box">
          <Icon name={item} />
        </CardBody>
      </Card>
    )
  })

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
          {displayMessage}
          <div className="grid">
            {itemGrid}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
