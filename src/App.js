import { useState } from "react";
import "./App.css";

const shopingItems = [
  {
    name: "Water",
    price: 350,
    payed: true,
    discount: 10,
    amount: 2,
    id: 1,
  },
  {
    name: "Bread",
    price: 50,
    payed: false,
    discount: 0,
    amount: 1,
    id: 2,
  },
  {
    name: "Coffee",
    price: 100,
    payed: true,
    discount: 15,
    amount: 5,
    id: 3,
  },
];

export default function App() {
  const [allItems, setAllItems] = useState([]);
  const [totalBill, setTotalBill] = useState(null);
  function handleAddCards(item) {
    setAllItems([...allItems, item]);
  }

  function handleTotalBill(bill) {
    setTotalBill(totalBill + bill);
    console.log("Sada sam u handle total");
    console.log(totalBill);
  }

  return (
    <div className="App">
      <button>Add</button>
      <ItemsList allItems={allItems} onHandleTotalBill={handleTotalBill} />
      <AddFrom onAddCards={handleAddCards} />
    </div>
  );
}

function ItemsList({ allItems, onHandleTotalBill }) {
  const sendComponentToParent = (totalBill) => {
    onHandleTotalBill(totalBill);
  };
  return (
    <div className="list">
      {allItems.map((item) => (
        <Item item={item} key={item.id} onHandleTotalBill={onHandleTotalBill} />
      ))}
    </div>
  );
}

let totalBill = 0;
function Item({ item, onHandleTotalBill }) {
  let [amount, setAmount] = useState("");
  const [bill, setBill] = useState(0);

  function calculateBill(totalBill, item, amount) {
    totalBill = (item.price - (item.price * item.discount) / 100) * amount;

    setBill(bill + totalBill);

    const newBill = bill;

    console.log("sada sam u calculate Bill Item componenti");
    onHandleTotalBill(newBill);
  }
  return (
    <div
      className="card"
      style={item.payed ? { backgroundColor: "green", color: "#fff" } : null}
    >
      <div className="card-content">
        <p>{`Name: ${item.name}`}</p>
        <p>{`Price: ${item.price}`}</p>
        <p>{`Discount: ${item.discount}%`}</p>

        <span>Choose amount </span>
        <input
          type="text"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
        />

        <p>{`Total to pay: ${bill}`}</p>
        <button onClick={() => calculateBill(totalBill, item, amount)}>
          Buy
        </button>
      </div>
    </div>
  );
}

function AddFrom({ onAddCards }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = { name, price, discount, id: Date.now() };

    onAddCards(newItem);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add new item shop</h3>
        <input
          placeholder="Enter name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Enter price"
          type="text"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Enter discount"
          onChange={(e) => setDiscount(Number(e.target.value))}
        />

        <button type="submit">Add item</button>
      </form>
    </div>
  );
}
