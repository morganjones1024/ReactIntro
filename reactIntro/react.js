const render = () => {
    document.getElementById("mountNode").innerHTML = `
          <div>
          Hello HTML
          <input />
          <pre>${new Date().toLocaleTimeString()}</p>
        </div>
      `;
  
    ReactDOM.render(
      React.createElement(
        "div",
        null,
        "Hello React",
        React.createElement("input", null),
        React.createElement("pre", null, new Date().toLocaleTimeString())
      ),
      document.getElementById("mountNode2")
    );
  };
  
  setInterval(render, 1000);
  
  
  //React Component Examples
  
  //The below JSX:
  function Button (props) {
    return <button type="submit">{props.label}</button>;
  }
  ReactDOM.render(<Button label="Save" />, mountNode);
  
  
  //is equivalent to:
  
  function Button (props) {
    return React.createElement(
      "button",
      { type: "submit" },
      props.label
    );
  }
  
  ReactDOM.render(
    React.createElement(Button, { label: "Save"}),
    mountNode
  );
  
  
  
  //React Hooks
  //React.useState() example with a simple button that starts at 0 and increments by 1 when clicked
  
  import React, { useState } from 'react';
  
  const Button = () => {
    const [count, setCount] = useState(0);
  
    return (
      <button onClick={() => setCount(count + 1)}>
        {count}
      </button>
    );
  };
  
  ReactDOM.render(<Button />, mountNode);
  
  
  
  //Top-level components
  //Wrapping the Button and Display elements in a new parent component
  
  const CountManager = () => {
      return (
        <>
          <Button />
          <Display />
        </>
      );
  };
  
  const Button = () => {
    return (
      <button onClick={() => console.log('TODO: Increment counter')}>+1
      </button>
    );
  };
  
  ReactDOM.render(<CountManager />, mountNode);
  
  
  
  //Moving the state up to CountManager and adding an increment counter function to update the state
  
  const Button = ({clickAction }) => {
    return(
      <button onClick={clickAction}>
        +1
      </button>
    );
  };
  
  const Display = ({ content }) => (
    <pre>{content}</pre>
  );
  
  const CountManager = () => {
    const [count, setCount] = useState(0);
    
  
    const incrementCounter = () => {
      setCount(count + 1);
    }
  
    return (
      <div>
        <Button clickAction={incrementCounter} />
        <Display content={count} />
      </div>
    );
  };
  
  ReactDOM.render(<CountManager />, mountNode);
  
  
  
  //Making the button component reusable and allowing it to implement count with different values by adding a new prop
  // Passed as numbers in {} and not strings
  
  const Button = ({clickValue, clickAction }) => {
    return(
      <button onClick={() => clickAction(clickValue)}>
        +{clickValue}
      </button>
    );
  };
  
  const Display = ({ content }) => (
    <pre>{content}</pre>
  );
  
  const CountManager = () => {
    const [count, setCount] = useState(0);
  
  const incrementCounter = (increment) => {
        setCount(count + increment);
      };
  
  return(
    <div>
    <Button clickAction={incrementCounter} clickValue={1} />     
    <Button clickAction={incrementCounter} clickValue={5} />
    <Button clickAction={incrementCounter} clickValue={10} />
    <Display content={count} />
    </div>
  );
  }
  
  ReactDOM.render(<CountManager />, mountNode);
  
  
  
  //Accepting user input - a character counter that makes use of onChange
  
  const CharacterCounter = () => {
    const [count, setCount] = useState(0);
    
    const handleChange = (event) => {
      const element = event.target;
      setCount(element.value.length);
    };
    
    return (
      <div>
        <textarea cols={80} rows={10} onChange={handleChange} />
        <div>Count: {count}</div>
      </div>
    );
  };
  
  ReactDOM.render(<CharacterCounter />, mountNode);
  
  //However, because the handleChange event calls setCount which computes the text length, there is some redundancy
  //Therefore, we can override the value of textarea and update it using a state change
  
  const CharacterCounter = () => {
    const [inputValue, setInputValue] = useState('');
    
    const handleChange = (event) => {
      const element = event.target;
      setInputValue(element.value);
    };
    
    return (
      <div>
        <textarea cols={80} rows={10} value={inputValue} onChange={handleChange} />
        <div>Count: {inputValue.length}</div>
      </div>
    );
  };
  
  ReactDOM.render(<CharacterCounter />, mountNode);
  