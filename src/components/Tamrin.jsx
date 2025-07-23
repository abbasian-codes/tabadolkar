// export default function ({ name }) {
//   return <h1>Hello {name}</h1>
// }

import { useEffect, useState } from "react"

// const Tamrin = (props) => <h2>Hello {props.name}</h2>
// const Tamrin = ({ name }) => (
//   <h2 className="h-11 bg-neutral-300">Hello {name}</h2>
// )

// export default Tamrin

// export default function Tamrin() {
//   const [count, setCount] = useState(0)
//   return (
//     <>
//       <p>count : {count}</p>
//       <button onClick={() => setCount(count + 1)}>ADD</button>
//     </>
//   )
// }
// export default function Tamrin() {
//   const [isOn, setIsOn] = useState(false)
//   return (
//     <div>
//       <button onClick={() => setIsOn(!isOn)}>
//         {" "}
//         {isOn ? "روشن " : "خاموش"}
//       </button>
//     </div>
//   )
// }

// export default function Tamrin(props) {
//   return (
//     <div>
//       <p>name: {props.user.name}</p>
//       <p>name: {props.user.age}</p>
//     </div>
//   )
// }

// export default function Tamrin({ user }) {
//     return (
//       <div>
//         <p>name: {user.name}</p>
//         <p>name: {user.age}</p>
//       </div>
//     )
//   }

// export default function Tamrin({ product }) {
//   return (
//     <>
//       <p>name: {product.name}</p>
//       <p>price: {product.price}</p>
//       <p>instock: {product.instock ? "موجود است " : "ناموجود"}</p>
//     </>
//   )
// }

// export default function Tamrin() {
//   useEffect(() => {
//     const timer = setInterval(() => {
//       console.log("تایمر کار میکنه ")
//     }, 1000)

//     return
//     ;() => {
//       clearInterval(timer)
//       console.log("تایمر پاک شد ")
//     }
//   }, [])

//   return <button onClick={() => clearInterval(timer)}>توقف </button>
// }

// export default function Tamrin() {
//   const [seconds, setSeconds] = useState(0)
//   useEffect(() => {
//     console.log("تایمر شروع شد ")
//     const interval = setInterval(() => {
//       setSeconds((prev) => prev + 1)
//     }, 1000)
//     return () => {
//       console.log("تایمر تمام شد ")
//       clearInterval(interval)
//     }
//   }, [])

//   return (
//     <div>
//       <p>Seconds:{seconds}</p>
//     </div>
//   )
// }
// export default function Tamrin() {
//   const [data, setData] = useState(null)
//   const [loading, setLoading] = useState(true) // حالت بارگذاری

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetch("https://jsonplaceholder.typicode.com/posts/4")
//         const json = await res.json()
//         setData(json)
//       } catch (error) {
//         console.log(error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchData()
//   }, [])
//   if (loading) {
//     return <p>در حال بارگذاری...</p> // نمایش پیام بارگذاری
//   }
//   return <pre>{JSON.stringify(data, null, 2)}</pre>
// }

export default function Tamrin() {
  //   const user = {
  //     name: "hasti",
  //     adress: {
  //       city: "Tehran",
  //     },
  //   }
  //   return (
  //     <>
  //       <p>{user.adress?.city}</p>
  //       <p>{user.contact?.phone}</p>
  //     </>
  //   )

  const order = {
    user: {
      name: "Hasti",

      contact: {
        email: "a@gmail.com",
        phone: null,
      },
    },
    items: [
      { title: "Laptop", price: 2000 },
      { title: "Mouse", price: 100 },
      { title: "Pen", price: null },
    ],
    payment: null,
  }

  const totalPrice = order.items.reduce(
    (sum, item) => sum + (item.price ?? 0),
    0
  )
  return (
    <>
      <p>{order.user?.name}</p>
      <p>{order.user.contact?.email}</p>
      <p>
        {/* {order.user.contact?.phone ? order.user.contact?.phone : "موجود نیست"} */}
        {order.user.contact?.phone ?? "موجود نیست"}
      </p>
      <p>{totalPrice ?? 0}</p>
      <p>{order.payment ?? " پرداخت نشده "}</p>
    </>
  )
}
