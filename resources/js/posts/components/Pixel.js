import React from "react";

const boxSize = "100%";

export default function Pixel({ index, bgColor, handleClick }) {
  const onClick = () => handleClick(index);
  const onMouseOver = (e) => {
    if (e.buttons == 1 || e.buttons == 3) {
      onClick();
    }
  };
  const onContextMenu = (e) => {
    e.preventDefault();
    handleClick(index, true);
  };
  return (
    <div
      style={{ background: bgColor, width: boxSize, height: boxSize }}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onContextMenu={onContextMenu}
    />
  );
}
