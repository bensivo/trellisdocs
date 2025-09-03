import { useAtom } from 'jotai';
import { counterAtom, counterTimesTwoAtom, doubleAtom } from '../store/atoms';

export const Counter = () => {
  const [count, setCount] = useAtom(counterAtom);
  const [counterTimesTwo] = useAtom(counterTimesTwoAtom);
  const [_, double] = useAtom(doubleAtom);


  return (
    <div>
      <p>{count}</p>
      <p>Count * 2 = {counterTimesTwo}</p>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => double()}>Double</button>
    </div>
  );
};
