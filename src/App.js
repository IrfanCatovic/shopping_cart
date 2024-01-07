import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useLocalStorageState } from "./Hooks/useLocalStorageState";
import { useKey } from "./Hooks/useKey";

let totalBill = 0;

export default function App() {
  const [allItems, setAllItems] = useLocalStorageState([], "artikli");
  let [totalBill, setTotalBill] = useState(0);

  //FUNCTION FOR ENTERING AMOUNT IN CARDS
  function enterAmount(item, num) {
    item.amount = item.amount + num;

    console.log(item.amount);
  }

  //FUNCTION FOR DELETE ONE CARD OF THE LIST
  function handleDelete(itemFromCard) {
    setAllItems((allItems) =>
      allItems.filter((item) => item.id !== itemFromCard.id)
    );
    let trenutniBIll = 0;

    trenutniBIll =
      totalBill -
      itemFromCard.price * Number(itemFromCard.amount) +
      (itemFromCard.price / 100) *
        Number(itemFromCard.discount) *
        Number(itemFromCard.amount);

    console.log("Iznad je kolicina");
    setTotalBill(trenutniBIll);
    console.log(trenutniBIll);
    console.log(totalBill);
    //funckija filter prodje kroz ceo array items i proverava da li dobijeni id nije jednak id u nizu
    //ako nije jednak onda moze da nastavi u novi kreirani niz
    //ako je jednak on ne moze u novi niz nego bude izbrisan
  }

  //FUNCTION TO ADD NEW CARD TO THE LIST
  function handleAddCards(item) {
    setAllItems([...allItems, item]);
    console.log(item.amount);
  }

  function handleTotalBill(bill) {
    console.log(`Evo me u handle total i ovo je bill ${bill}`);
    setTotalBill((totalBill = totalBill + bill));
    console.log(`Ovo je total bill u handleTotalBill ${totalBill}`);
  }

  function deleteItems() {
    setAllItems([]);
    setTotalBill(null);
  }

  function handleClearList() {
    setTotalBill(null);

    const updatedObjects = allItems.map((obj) => ({
      ...obj,
      amount: 0,
      bill: 0,
    }));

    setAllItems(updatedObjects);
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
          onEnterAmount={enterAmount}
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
  onEnterAmount,
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
            onEnterAmount={onEnterAmount}
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

function Item({ item, onHandleTotalBill, onHandleDelete, onEnterAmount }) {
  let [amount, setAmount] = useState("");

  function calculateBill(totalBill, item, amount) {
    totalBill = (item.price - (item.price * item.discount) / 100) * amount;

    item.bill = item.bill + totalBill;
    console.log(
      `Ovo je total bill ${totalBill}, a ovo je item.bill ${item.bill}`
    );

    onEnterAmount(item, amount);

    onHandleTotalBill(totalBill);
    setAmount("");
  }

  const inputEl = useRef(null);
  // inputEl.trim() !== "";

  return (
    <div
      className="cart-item"
      style={item.payed ? { backgroundColor: "green", color: "#fff" } : null}
    >
      <div className="card-content">
        <p>{`Name: ${item.name}`}</p>
        <p>{`Price: ${item.price}`}</p>
        <p>{`Discount: ${item.discount}%`}</p>
        <p>{`Amount: ${item.amount}`}</p>

        <input
          type="text"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
          ref={inputEl}
        />

        <p>{`Total to pay: ${item.bill}`}</p>

        <div className="card-btn">
          <button onClick={() => calculateBill(totalBill, item, amount)}>
            Buy
          </button>
          <button
            className="delete-button"
            onClick={() => onHandleDelete(item)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function AddFrom({ onAddCards }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  let amount = 0;
  let bill = 0;

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = { name, price, discount, amount, bill, id: Date.now() };

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
