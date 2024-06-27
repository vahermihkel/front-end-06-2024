import React, { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import tootedJSON from "../data/tooted.json";

function LisaToode() {
  const [sonum, muudaSonum] = useState("Lisa toode!");
  const nimiRef = useRef();
  const hindRef = useRef();
  const piltRef = useRef();
  const aktiivneRef = useRef();

  // function lisa() {

  // }

  const lisa = () => {
    if (nimiRef.current.value === "") {
      // muudaSonum("Toodet ei saa tühja nimega sisestada!");
      toast.error("Toodet ei saa tühja nimega sisestada!")
      return;
    }
    if (nimiRef.current.value.length < 4) {
      // muudaSonum("Toodet ei saa tühja nimega sisestada!");
      toast.error("Toote nimi liiga lühike!")
      return;
    }
    if (nimiRef.current.value[0] === nimiRef.current.value[0].toLowerCase()) {
      // muudaSonum("Toodet ei saa tühja nimega sisestada!");
      toast.error("Toode ei saa alata väikse tähega või numbriga!")
      return;
    }
    // muudaSonum("Toode lisatud: " + nimiRef.current.value);
    toast.success("Toode lisatud: " + nimiRef.current.value);

    const uusToode = {
      "nimi": nimiRef.current.value,
      "hind": Number(hindRef.current.value),
      "pilt": piltRef.current.value,
      "aktiivne": aktiivneRef.current.checked,
    }

    tootedJSON.push(uusToode);
  }

  const kontrolli = () => {
    if (piltRef.current.value.startsWith("https://") === false) {
      muudaSonum("Pildi URLi algus on vale!");
      return;
    }
    if (!(piltRef.current.value.endsWith(".png") ||
        piltRef.current.value.endsWith(".jpg") ||
        piltRef.current.value.endsWith(".jpeg"))) {
      muudaSonum("Pildi URLi lõpp on vale!");
      return;
    }
    muudaSonum("");
  }

  return (
    <div>
      <div>{sonum}</div>
      <label>Toote nimi</label> <br />
      <input ref={nimiRef} type="text" /> <br />
      <label>Toote hind</label> <br />
      <input ref={hindRef} type="number" /> <br />
      <label>Toote pilt</label> <br />
      <input onChange={kontrolli} ref={piltRef} type="text" /> <br />
      <label>Toote aktiivsus</label> <br />
      <input ref={aktiivneRef} type="checkbox" /> <br />
      <button onClick={lisa}>Sisesta</button> <br />
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        theme="dark"
        />
    </div>
  )
}

export default LisaToode