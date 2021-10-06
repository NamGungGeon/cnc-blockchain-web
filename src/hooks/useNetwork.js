import React, { useContext, useEffect, useState } from "react";
import { joinNetwork } from "cnc-blockchain";
import Peerjs from "peerjs";

const host = "3.37.53.134";

let isReady = false;
const peerCMD = joinNetwork(
  () => {
    isReady = true;
  },
  `http://${host}:3003`,
  new Peerjs(undefined, {
    // host: `${host}`,
    // port: "3004",
  })
);
const listeners = [];
peerCMD.setCallback(() => {
  listeners.forEach((cb) => {
    cb();
  });
});
export const useNetwork = () => {
  const network = peerCMD;
  const [avaliable, setAvaliable] = useState(isReady);
  const [tick, setTick] = useState(0);
  const callback = () => {
    setTick(Math.random());
  };
  useEffect(() => {
    if (!avaliable) {
      const timer = setInterval(() => {
        if (isReady) {
          setAvaliable(true);
          clearInterval(timer);
        }
      }, 300);

      return () => {
        clearInterval(timer);
      };
    }
  }, []);
  useEffect(() => {
    listeners.push(callback);
    return () => {
      listeners.splice(
        listeners.findIndex((cb) => cb === callback),
        1
      );
    };
  }, []);
  useEffect(() => {
    console.log(tick);
  }, [tick]);

  return [network, avaliable];
};
