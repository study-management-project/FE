const Cursor = ({ position }: { position: { top: number, left: number } }) => {
  return (
    <span
      className='w-[1px] h-6 bg-white'
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        animation: 'blink-effect 1s step-end infinite',
      }}
    ></span>
  );
};

export default Cursor;