import { useState } from "react";
import "./App.css";

const shopingItems = [
  {
    name: "Water",
    price: 350,
    payed: true,
    discount: 10,
    amount: 2,
  },
  {
    name: "Bread",
    price: 50,
    payed: false,
    discount: 0,
    amount: 1,
  },
  {
    name: "Coffee",
    price: 100,
    payed: true,
    discount: 15,
    amount: 5,
  },
];

export default function App() {
  const [allItems, setAllItems] = useState([...shopingItems]);

  return (
    <div className="App">
      <ItemsList shopingItems={shopingItems} />
    </div>
  );
}

function ItemsList({ shopingItems }) {
  return (
    <div>
      <ul className="list">
        {shopingItems.map((item) => (
          <Item item={item} />
        ))}
        <button>Add new</button>
      </ul>
    </div>
  );
}

function Item({ item }) {
  const total = (item.price - (item.price * item.discount) / 100) * item.amount;
  const [isPayed, setIsPayed] = useState(false);

  function onToggleItem(id) {
    setIsPayed((allItems) =>
      allItems.map((item) =>
        item.id === id ? { ...item, payed: !item.payed } : item
      )
    );
  }

  return (
    <div
      className="card"
      style={item.payed ? { backgroundColor: "green", color: "#fff" } : null}
    >
      <p>{`Name: ${item.name}`}</p>
      <p>{`Price: ${item.price}`}</p>
      <p>{`Discount: ${item.discount}%`}</p>
      <p>{`Amount: ${item.amount}`}</p>
      <p>{`Total to pay: ${total}`}</p>
      <input
        type="checkbox"
        value={item.payed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
    </div>
  );
}
