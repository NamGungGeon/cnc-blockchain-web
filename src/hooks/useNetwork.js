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
peerCMD.setCallback((type, cmd, data) => {
  listeners.forEach((cb) => {
    cb(type, cmd, data);
  });
});
export const useNetwork = () => {
  const network = peerCMD;
  const [avaliable, setAvaliable] = useState(isReady);
  const [tick, setTick] = useState(0);
  const [callback, setCallback] = useState(null);
  const handleListen = (type, cmd, data) => {
    if (callback) callback(type, cmd, data);
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
    listeners.push(handleListen);
    return () => {
      listeners.splice(listeners.indexOf(handleListen), 1);
    };
  }, []);
  useEffect(() => {
    listeners.splice(listeners.indexOf(handleListen), 1);
    listeners.push(handleListen);
  }, [callback]);

  return [network, avaliable, setCallback];
};
