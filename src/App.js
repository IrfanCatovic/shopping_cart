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
  let [totalBill, setTotalBill] = useState(null);

  function handleDelete(id) {
    setAllItems((allItems) => allItems.filter((item) => item.id !== id));
    //funckija filter prodje kroz ceo array items i proverava da li dobijeni id nije jednak id u nizu
    //ako nije jednak onda moze da nastavi u novi kreirani niz
    //ako je jednak on ne moze u novi niz nego bude izbrisan
  }

  function handleAddCards(item) {
    setAllItems([...allItems, item]);
  }

  function handleTotalBill(bill) {
    // setTotalBill(totalBill + bill);
    console.log(`Evo me u handle total i ovo je bill ${bill}`);
    setTotalBill((totalBill = totalBill + bill));
    console.log(`Ovo je total bill u handleTotalBill ${totalBill}`);
  }

  function deleteItems() {
    setAllItems([]);
  }

  function handleClearList() {
    setTotalBill(null);
  }

  return (
    <div className="shopping-cart">
      {/* <button>Add</button> */}
      <AddFrom onAddCards={handleAddCards} />
      <div>
        <ItemsList
          totalBill={totalBill}
          allItems={allItems}
          onHandleTotalBill={handleTotalBill}
          onHandleDelete={handleDelete}
          onClearList={handleClearList}
        />
      </div>
      {allItems.length > 0 && (
        <button onClick={deleteItems}>Format List</button>
      )}
    </div>
  );
}

function ItemsList({
  totalBill,
  allItems,
  onHandleTotalBill,
  onHandleDelete,
  onClearList,
}) {
  return (
    <div>
      <div className="list">
        {allItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onHandleTotalBill={onHandleTotalBill}
            onHandleDelete={onHandleDelete}
          />
        ))}
      </div>

      {totalBill !== null && totalBill !== 0 && (
        <div>
          <h2>Total Bill: ${totalBill}</h2>
          <button className="delete-button" onClick={() => onClearList()}>
            Clear list
          </button>
        </div>
      )}

      <div />
    </div>
  );
}

let totalBill = 0;

function Item({ item, onHandleTotalBill, onHandleDelete }) {
  let [amount, setAmount] = useState("");
  const [bill, setBill] = useState(totalBill);

  function calculateBill(totalBill, item, amount) {
    console.log(item.price, amount);
    totalBill = (item.price - (item.price * item.discount) / 100) * amount;
    console.log(totalBill);
    setBill((bill) => bill + totalBill);

    console.log(`sada sam u calculate Bill Item componenti ${bill}`);
    onHandleTotalBill(totalBill);
    setAmount("");
  }
  return (
    <div
      className="cart-item"
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

        {/* <p>{`Total to pay: ${bill}`}</p> */}

        <button onClick={() => calculateBill(totalBill, item, amount)}>
          Buy
        </button>
        <button
          className="delete-button"
          onClick={() => onHandleDelete(item.id)}
        >
          Delete
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

    console.log("Ovo me zanima");
    setName("");
    setPrice("");
    setDiscount("");
    console.log(name);
    console.log(newItem.name);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add new item shop</h3>
        <input
          placeholder="Enter name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Enter price"
          type="text"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <input
          type="text"
          value={discount}
          placeholder="Enter discount"
          onChange={(e) => setDiscount(Number(e.target.value))}
        />

        <button type="submit" className="submit-button">
          Add item
        </button>
      </form>
    </div>
  );
}
