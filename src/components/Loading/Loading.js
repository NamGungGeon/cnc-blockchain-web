import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Cover = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

const InCenter = styled.div`
  position: relative;
  width: 256px;
  height: 256px;
`;

const Loading = ({}) => {
  const blockCnt = 20;
  const [points, setPoints] = useState([]);
  const ref = useRef();
  const [thetaPoint, setThetaPoint] = useState(0);

  const renderPoints = () => {
    const intervalThetaOfNode = Math.PI / 10;

    const { offsetHeight, offsetTop, offsetWidth, offsetLeft } = ref.current;
    const centerY = offsetTop + offsetHeight / 2;
    const centerX = offsetLeft + offsetWidth / 2;
    const radius = 256;

    const cords = [];
    Array(parseInt(blockCnt / 2))
      .fill(0)
      .forEach((_, idx) => {
        const currentTheta = thetaPoint + intervalThetaOfNode * idx;
        const dy = Math.sin(currentTheta) * radius;
        console.log("theta", currentTheta);

        console.log(idx, dy);

        let dx = Math.sqrt(Math.pow(radius, 2) - Math.pow(dy, 2));

        cords.push([centerX - dx, centerY - dy, `${dy} ${currentTheta}`]);
        cords.push([centerX + dx, centerY + dy, `${dy} ${currentTheta}`]);
      });
    console.log(cords);
    setPoints(cords);
  };
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    console.log(ref.current);
    renderPoints();

    setTimeout(() => {
      setThetaPoint(thetaPoint + Math.PI / 90);
    }, 30);
  }, [ref, thetaPoint]);
  return (
    <Cover>
      <InCenter ref={ref}>
        {points.map((point) => {
          return (
            <img
              width={"36px"}
              height={"36px"}
              src="/cube-icon.png"
              alt={point[2]}
              style={{
                position: "fixed",
                left: point[0] + "px",
                top: point[1] + "px",
              }}
            />
          );
        })}
      </InCenter>
    </Cover>
  );
};

export default Loading;
