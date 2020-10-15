import React from "react";
import _ from "lodash";
import "./inputArea.css";

const InputButton = (props) => {
  const { num, inputHandler } = props;
  return (
    <button className="inputButton" onClick={inputHandler.bind(this, num)}>
      {num}
    </button>
  );
};

const InputArea = (props) => {
  const nums = _.range(1, 10);
  const { inputHandler, interactionHandler } = props;

  return (
    <>
      <div className="inputIcons">
        {["Clear", "Erase", "Notes", "Hints"].map((i) => (
          <div
            className="icons"
            onClick={interactionHandler.bind(this, i)}
            key={i}
          >
            <div className={i}></div>
          </div>
        ))}
      </div>
      <div className="inputArea">
        {nums.map((n) => (
          <InputButton key={n} num={n} inputHandler={inputHandler} />
        ))}
      </div>
    </>
  );
};

export default InputArea;
