import { observable } from "mobx";
import { generateKey, fromPrivateKey } from "../modules/keygen";

const myPrivateKey = localStorage.getItem("privateKey");
const generatedKey = generateKey("myKey");
if (!myPrivateKey) {
  localStorage.setItem("privateKey", generatedKey.getPrivate("hex"));
}

const keypair = observable({
  value: myPrivateKey ? fromPrivateKey(myPrivateKey) : generatedKey,
});

export default keypair;
