import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './store.css'
function Store() {
  console.log('top');
  const [store, setStore] = useState([])
  const [perpage, setPerpage] = useState(1)
  const [pointer, setPointer] = useState(0)
  const [nextPointer, setNextPointer] = useState(perpage)




  useEffect(() => {
    console.log('in useeffect');
    axios.post('https://synergist-adminpanel-backend.alchemative.net/users/login', { email: "zahidnoor", password: "123456789" }).then((response) =>
      axios.get('https://synergist-adminpanel-backend.alchemative.net/stores/store'
        , {
          headers: {
            authorization: `Token ${response.data.token}`
          }
        })
        .then((res) => setStore(res.data))
    )
  }, [])


  return (
    <>
      {console.log('in pounter', pointer, nextPointer)}
      <div className="store">
        <div className="side-menu">
          <a href="#home" ><i class="fa fa-home"></i></a>
          <i class="fa fa-folder" ></i>
          <i class="fa fa-bars" ></i>
          <i class="fa fa-calendar" ></i>
          <i class="fa fa-gear" ></i>
        </div>
        <div >
          <div className="row">
            <h2>Stores</h2>
            <input type="text"></input>
            <button>Create New</button>
          </div>
          <table>
            <tr>
              <th>Sr.No</th>
              <th>Store Domain</th>
              <th>Name</th>
              <th>Email ID</th>
              <th>Installed Date</th>
              <th>last Update</th>
              <th>Status</th>
              <th>Approval</th>
            </tr>
            {store.slice(pointer, nextPointer).map((item) => <tr>
              <td>{item.id}</td>
              <td>{item.domain}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.created_at || 'N/A'}</td>
              <td>{item.updated_at}</td>
              <td>N/A</td>
              <td>{item.status}</td>
            </tr>)}
          </table>
          <select
            value={perpage}
            onChange={async e => {
              setPerpage(Number(e.target.value));
              if (store.length > (Number(e.target.value))) {
                setNextPointer(pointer + (Number(e.target.value)))
              }
              else {
                setNextPointer(store.length)
              }
              console.log(nextPointer)
            }}
          >
            {[1, 2, 3, 4, 5].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <button onClick={() => {
            if (pointer > 0) {
              setPointer(pointer - perpage);
              setNextPointer(nextPointer - perpage)
            }
            else {
              setPointer(0)
              setNextPointer(perpage)
            }
          }}>Prev</button>
          <button onClick={() => {
            if (nextPointer < 0 || store.length === nextPointer) {
              setPointer(0)
              setNextPointer(store.length)
            }
            else if (store.length > (nextPointer)) {
              setPointer(pointer + perpage);
              setNextPointer(nextPointer + perpage)
            }
            else if (pointer > 0) {
              setPointer(0)
              setNextPointer(perpage)
            }
          }}>Next</button>
        </div>
      </div>
    </>
  )
}

export default Store
