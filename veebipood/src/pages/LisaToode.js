import React, { useRef, useState } from 'react'

function LisaToode() {
  const [sonum, muudaSonum] = useState("Lisa toode!");
  const nimiRef = useRef();

  // function lisa() {

  // }

  const lisa = () => {
    if (nimiRef.current.value === "") {
      muudaSonum("Toodet ei saa tühja nimega sisestada!");
      return;
    }
    muudaSonum("Toode lisatud: " + nimiRef.current.value);
  }

  return (
    <div>
      <div>{sonum}</div>
      <label>Toode</label> <br />
      <input ref={nimiRef} type="text" /> <br />
      <button onClick={lisa}>Sisesta</button> <br />
    </div>
  )
}

export default LisaToode