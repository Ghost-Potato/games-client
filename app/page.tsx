'use client'; //React Hook only uses Client Component
//state hook to persist a var on page re-render and track its value
import {useState} from "react";

export default function Home() {
  //create numeric state var, defaulting to 0, along with setter method
  const[counter, setCounter] = useState<number>(0);
  return (
    //every react component must have one parent element
    <main>
      <h1>COMP2068G Game Library</h1>
      <p>You've clicked the button {counter} times.</p>
      <button onClick={(e) => setCounter(counter + 1)}>Click Me</button>
      <button onClick={(e) => setCounter(0)}>Reset</button>
    </main> 
  );
}
