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
  let [totalBill, setTotalBill] = useState(0);
  let [amount, setAmount] = useState("");
  let [cardBill, setCardBill] = useState(null);
  

  function enterAmount(item, num) {
    item.amount = item.amount + num;

    console.log(item.amount)
    


  }
  function handleDelete(itemFromCard) {
    setAllItems((allItems) => allItems.filter((item) => item.id !== itemFromCard.id));
    let trenutniBIll = 0;

    trenutniBIll = totalBill - (itemFromCard.price  * Number(itemFromCard.amount)) + 
    ((itemFromCard.price / 100 * Number(itemFromCard.discount) * Number(itemFromCard.amount))) ;

    
    console.log(amount)
    console.log("Iznad je kolicina")
    setTotalBill(trenutniBIll)
    console.log(trenutniBIll)
    console.log(totalBill)
    //funckija filter prodje kroz ceo array items i proverava da li dobijeni id nije jednak id u nizu
    //ako nije jednak onda moze da nastavi u novi kreirani niz
    //ako je jednak on ne moze u novi niz nego bude izbrisan
  }

  function handleAddCards(item) {
    setAllItems([...allItems, item]);
    console.log(item.amount)
  }

  function handleTotalBill(bill) {
    // setTotalBill(totalBill + bill);
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

let totalBill = 0;

function Item({ item, onHandleTotalBill, onHandleDelete, onEnterAmount }) {
  const [bill, setBill] = useState(totalBill);
  let [amount, setAmount] = useState("");


  function calculateBill(totalBill, item, amount) {
    
    totalBill = (item.price - (item.price * item.discount) / 100) * amount;
    
    setBill((bill) => bill + totalBill);

    onEnterAmount(item, amount);

    
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
        <p>{`Amount: ${item.amount}`}</p>

        <input
          type="text"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
        />

        <p>{`Total to pay: ${bill}`}</p>

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
  let amount=0; 

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = { name, price, discount, amount ,  id: Date.now() };

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
