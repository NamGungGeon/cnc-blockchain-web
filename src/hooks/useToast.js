import { autorun, observable, when } from "mobx";

const globalToast = observable({
  value: [],
});
const useToast = () => {
  const addToast = (toast, time = 1500) => {
    globalToast.value = [...globalToast.value, toast];

    setTimeout(consumeToast, time);
  };
  const consumeToast = () => {
    globalToast.value = [...globalToast.value.slice(1)];
  };

  return [addToast, consumeToast, globalToast.value];
};

export default useToast;
