import { React, useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import api_fetch  from "./utils/api_fetch";

function App() {
  const [counter, setCounter] = useState(0);
  const [user, setUser] = useState("");

  useEffect(async () => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(user);
    }
    let response = await (await (api_fetch.get(`/v1/get-counter`, {
      user_id: user
    }, {}, "", {
    })
    )).json();
    if(response.success){
      setCounter(response.counter);
    } else{
      localStorage.setItem("user", "");
      setUser("");
    }
  }, []);

  //increase counter
  const increase = async () => {
    let response = await (await (api_fetch.post(`/v1/set-counter`, {
      user_id: user
    }, {}, "", {
      counter: counter + 1
    })
    )).json();
    if(response.success){
      setCounter(counter + 1);
    }
  };
 
  //decrease counter
  const decrease = async () => {
    let response = await (await (api_fetch.post(`/v1/set-counter`, {
      user_id: user
    }, {}, "", {
      counter: counter -1
    })
    )).json();
    if(response.success){
      setCounter(counter - 1);
    }
  };
 
  //reset counter 
  const reset =  async () => {
    let response = await (await (api_fetch.post(`/v1/set-counter`, {
      user_id: user
    }, {}, "", {
      counter: 0
    })
    )).json();
    if(response.success){
      setCounter(0);
    }
  };
 const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const generateString = (length) => {
      let result = '';
      const charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result;
  }

  const generateUser = async () =>{
    let user_id = generateString(10);
    let response = await (await (api_fetch.post(`/v1/check-user`, {
    }, {}, "", {
      user_id: user_id
    })
    )).json();
    if(response.success){
      localStorage.setItem("user", user_id);
      setUser(user_id);
    } else {
      alert(`User ${user_id} might be already available. Please try again`);
    }
  }

  return (
    <div className="counter">
      <h1>React Counter</h1>
      <span className="counter__output">{counter}</span>
      { user != "" &&  
        <div className="btn__container">
          <button className="control__btn" onClick={increase}>+</button>
          <button className="control__btn" onClick={decrease}>-</button>
          <button className="reset" onClick={reset}>Reset</button>
        </div>
      } {
        user == "" &&
        <div className="btn__container">
          <button className="reset" onClick={generateUser}>Generate User</button>
        </div>
      }
    </div>
  );
}

export default App;
