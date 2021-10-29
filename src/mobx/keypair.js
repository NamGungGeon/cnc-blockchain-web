import { autorun, observable, reaction, when } from "mobx";
import { generateKey, fromPrivateKey } from "cnc-blockchain";

const myPrivateKey = localStorage.getItem("privateKey");
const generatedKey = generateKey("myKey");
if (!myPrivateKey) {
  localStorage.setItem("privateKey", generatedKey.getPrivate("hex"));
}

const keypair = observable({
  value: myPrivateKey ? fromPrivateKey(myPrivateKey) : generatedKey
});

reaction(
  () => keypair.value,
  (kp, prevKp) => {
    if (kp.getPrivate("hex") !== prevKp.getPrivate("hex")) {
      localStorage.setItem("privateKey", kp.getPrivate("hex"));
    }
  }
);

export default keypair;
