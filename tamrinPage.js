import { useState } from "react"
import Tamrin from "@/components/Tamrin"
export default function Tamrinpage() {
  const [showTimer, setShowTimer] = useState(true)
  return (
    <>
      <button onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? "شروع تایمر" : "پایان تایمر"}
      </button>
      {showTimer && <Tamrin />}
    </>
  )
}
