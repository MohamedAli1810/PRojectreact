import axios from "axios";
import { useEffect, useState } from "react";
import { FaCaretRight , FaCaretDown} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [ closedId , setClosedId ] = useState()
const [ customers , setCustomers ] = useState([])
const [search, setSearch] = useState("");
const navigate = useNavigate();

  async function getCustomer() {


    const customers = await axios({
      url: "http://localhost:3000/customers",
    });


    const transactions = await axios({
      url: "http://localhost:3000/transactions",
    });
console.log(transactions);

    transactions.data.map((transaction)=>{
      customers.data.map((customer)=>{
        if (transaction.customer_id==Number(customer.id)){
          customer.transactions = customer.transactions || []; 
          customer.transactions.push(transaction);
        }
      })
    })
    setCustomers(customers.data);
  }
   useEffect(() => {
    getCustomer();
  }, []);

  return (
    <>
    <div className="container flex flex-wrap flex-col justify-center m-auto mt-40 items-center">
      <h1 className="text-5xl">Customer Transactions</h1>
      <input type="search"  className="bg-transparent focus:outline-none border  py-1 px-2 mt-6" 
      onChange={(e) => setSearch(e.target.value)} placeholder="Enter Name "
     />
      <div className="mt-24 w-[50%]">
      <div className="flex  flex-col ">
        <div className="flex  border px-2 py-2 rounded-t-md  ">
          <h3 className="me-6 w-6">ID</h3>
          <h3 className="w-40 ">Name</h3>
        </div>
        {
      customers && customers.length > 0? (
      customers?.filter((customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase())
      ).map((customer) => (
        <div key={customer.id} className="pt-2 mb-2 border-b pb-4">
          <div className="flex justify-center px-2 items-center relative">
            <h3 className="me-6 w-6">{customer.id}</h3>
            <h3 className="w-40 me-auto">{customer.name}</h3>
            <button onClick={() => {
                navigate("/graph", { state: { id: customer.id } });
              }} className="py-1 px-2 border rounded-md hover:text-2xl duration-500">Graph</button>
            <button onClick={() => {
              if (closedId==customer.id){
                setClosedId("")
                
              }else{
                setClosedId(customer.id)
              }
            }} className="absolute -left-7 text-xl">
              {closedId==customer.id ? <FaCaretDown /> : <FaCaretRight /> }
            </button>
          </div>
          <div className={ `${closedId==customer.id ? "block" : "hidden"} mt-3 grid grid-cols-4 gap-4`}>
            {
              customer.transactions.map((transaction)=>(
                <div key={transaction.id}>
              <h3 className=" ">Date: {transaction.date} </h3>
              <h3 className=" ">Amount:{transaction.amount}</h3>
            </div>
              ))
            }
          </div>
        </div>
      ))
    ) : (
      <p>No customers available</p>
    )
  }
      </div>  
      </div>
    </div>
      </>  )
}

export default Home