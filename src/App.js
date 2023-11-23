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

  function handleAddCards(item) {
    setAllItems([...allItems, item]);
  }

  return (
    <div className="App">
      <button>Add</button>
      <ItemsList
        allItems={allItems}
        shopingItems={shopingItems}
        onAddCards={handleAddCards}
      />
      <AddFrom onAddCards={handleAddCards} />
    </div>
  );
}

function ItemsList({ allItems }) {
  return (
    <div className="list">
      {allItems.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </div>
  );
}

function Item({ item }) {
  const total = (item.price - (item.price * item.discount) / 100) * item.amount;

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
        <input type="number" />

        <p>{`Total to pay: ${total}`}</p>
        <button>Buy</button>
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
