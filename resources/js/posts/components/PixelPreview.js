import React from "react";
import Pixel from "./Pixel";

const cols = 32;
const boxSize = 15;

export default React.forwardRef((props, ref) => {
  const { board } = props;
  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${boxSize}px)`,
        gridTemplateRows: `repeat(${cols}, ${boxSize}px)`,
      }}
    >
      {board.map((color, i) => (
        <Pixel key={i} index={i} bgColor={color} handleClick={() => {}} />
      ))}
    </div>
  );
});
