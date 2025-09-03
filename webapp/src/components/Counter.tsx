import { useAtom } from 'jotai';
import { counterAtom } from '../store/atoms';

export const Counter = () => {
  const [count, setCount] = useAtom(counterAtom);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
};
