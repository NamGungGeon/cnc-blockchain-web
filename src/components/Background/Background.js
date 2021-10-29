import React from "react";
import styles from "./Background.module.css";

const Background = ({ src, width = "auto", height = "auto", style }) => {
  return (
    <div
      className={styles.background}
      style={{
        ...style,
        backgroundImage: `url("${src}")`,
        width,
        height
      }}
    ></div>
  );
};

export default Background;
