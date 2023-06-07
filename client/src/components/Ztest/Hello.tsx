import React from 'react';

interface HelloProps {
  name: string;
  onClick(name: string): void;
}

const Hello = ({ name, onClick }: HelloProps) => {
  const handleClick = () => onClick(name);

  return (
    <>
      <h1>Hello, {name}</h1>
      <div>
        <button onClick={handleClick}>Click Me</button>
      </div>
    </>
  );
};

export default Hello;
