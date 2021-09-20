import { observable } from "mobx";
import BlockchainModule from "../modules/blockchain";

const savedJSON = localStorage.getItem("blockchain");
const savedCncCoin = savedJSON && BlockchainModule.Blockchain.restore(JSON.parse(savedJSON));
console.log(savedCncCoin);

const cncCoin = observable({
  value: savedCncCoin || new BlockchainModule.Blockchain(),
});
const resetCoin = () => {
  cncCoin.value = new BlockchainModule.Blockchain();
  localStorage.setItem("blockchain", "");
};

export default [cncCoin, resetCoin];
