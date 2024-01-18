import { useEffect, useState } from 'react'
import './App.css'
import data from './Questions/data';

function App() {

  const [index, setIndex] = useState(0);
  const [ques, setQues] = useState({});
  const [resut, setResult] = useState(false);
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)

  useEffect(() => {
    console
    if (index <= data.length - 1) {
      setQues(data[index])
    }
    else {
      setResult(true)
    }
  }, [index])

  function check(e) {
    e.preventDefault();
    const ans = e.target.ans.value.toLowerCase()
    if (ans === ques.ans) {
      setCorrect(prev => prev + 1)
    } else {
      setWrong(prev => prev + 1)
    }
    e.target.ans.value = ''
    setIndex(prev => prev + 1)
  }
  function reset() {
    setIndex(0);
    setCorrect(0)
    setWrong(0)
    setResult(false)
  }
  return (
    <>
      {resut ? (
        <div className='box'>
          <h1>Quiz App</h1>
          <h2>Score</h2>
          <h2>Correct answer: {correct}</h2>
          <h2>Wrong answer: {wrong}</h2>
          <button onClick={reset}>Reset</button>
        </div>
      ) : (
        <div className='box'>
          <h1>Quiz App</h1>
          <h2>{ques.ques}</h2>
          <form onSubmit={check}>
            <input className='input-box' type='text' name='ans' placeholder='Enter the answer' required/>
            <div>
              <button type='submit'>Next</button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default App
