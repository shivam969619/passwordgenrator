import { useState, useCallback,useEffect,useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charactorAllowed, setcharactorAllowed] = useState(false);
  const [password, setpassword] = useState("");
  const passwordref=useRef(null);

  const passwordgenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charactorAllowed) str += "!@#$%^&*_[]{}~`+-";
    for (let i = 1; i <= length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberAllowed, charactorAllowed, setpassword]);
 const copypassword=useCallback(()=>{
  passwordref.current?.select();
  passwordref.current?.setSelectionRange(0,101);

  window,navigator.clipboard.writeText(password);
 },[password])

  useEffect(() => {
    passwordgenrator();
  }, [length, numberAllowed, charactorAllowed, passwordgenrator]);
 return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password genrator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordref}
          />
          <button
            onClick={copypassword}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2"></div>
        <div className="flex items-sm gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setlength(e.target.value);
            }}
          />
          <label>Length:{length}</label>

          <div className="flex items-center  gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput"> Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charactorAllowed}
              id="charInput"
               onChange={() => {
                setcharactorAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput"> Charactors</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
