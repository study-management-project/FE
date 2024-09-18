import { List } from "immutable";

const Caret = ({ position }: { position: List<number> }) => {
  return (
    <div
      className='absolute w-[1px] h-6 bg-white'
      style={{
        top: `${position.get(0)}px`,
        left: `${position.get(1)}px`,
        animation: 'blink-effect 1s step-end infinite',
      }}
    ></div>
  );
};

export default Caret;