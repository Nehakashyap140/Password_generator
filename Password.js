import React, { useCallback, useEffect, useState, Ref, useRef } from "react";

const Password = () => {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(true);
  const [char, setChar] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (char) str += "!%@#^$*()+_-[]`~";
    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(charIndex);

      console.log(str.length);
      console.log(charIndex);

      console.log(pass);
    }
    setPassword(pass);
  }, [length, number, char, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [number, char, length, passwordGenerator]);

  const lengthchange = (e) => {
    const value = e.target.value;
    console.log(value);
    setLength(value);
  };

  const copypasswordclipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 5);

    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div style={{ backgroundColor: "black" }}>
        <h1
          style={{ fontSize: "2.25rem", textAlign: "center", color: "white" }}
        >
          Password Generator
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <input
              type="text"
              value={password}
              placeholder="password"
              readOnly
              ref={passwordRef}
            />
          </div>
          <button
            style={{ background: "blue", color: "white" }}
            onClick={copypasswordclipboard}
          >
            Copy
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={lengthchange}
            />

            <label style={{ color: "white" }}>Length:{length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultValue={number}
              onChange={(e) => {
                setNumber(!e);
              }}
            />
            <label style={{ color: "white" }}>Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultValue={char}
              onChange={(e) => {
                setChar(!e);
              }}
            />
            <label style={{ color: "white" }}>Character</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Password;
