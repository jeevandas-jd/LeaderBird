import React, { useRef } from "react";
const SwipeableViews = require("react-swipeable-views").default;


const Brackets: React.FC = () => {
  const swipeRef = useRef<typeof SwipeableViews | null>(null);

  return (
    <SwipeableViews ref={swipeRef}>
      <div style={{ padding: 20, background: "lightblue" }}>Page 1</div>
      <div style={{ padding: 20, background: "lightgreen" }}>Page 2</div>
      <div style={{ padding: 20, background: "lightcoral" }}>Page 3</div>
    </SwipeableViews>
  );
};

export default Brackets;
