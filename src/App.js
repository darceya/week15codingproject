import './App.css'
import {useState, useEffect} from 'react';
import NewUserForm from "./components/NewUserForm";






function App() {
  /* --  --*/
  const MOCK_API_URL = 'https://6541ce42f0b8287df1fee8ad.mockapi.io/GardenMembers'

const [users, setUsers] = useState([{
  firsName: 'Dudley',
  lastName: 'Dinosaur',
  favoritePlant: 'Dragon Show',
  membershipType: "Family"
}])

const [newUserFirstName, setNewUserFirstName] = useState('')
const [newUserLastName, setNewUserLastName] = useState('')
const [newUserFavoritePlant, setNewUserFavoritePlant] = useState('')
const [newUserMembershipType, setNewUserMembershipType] = useState('')

const [updatedFirstName, setUpdatedFirstName] = useState('')
const [updatedLastName, setUpdatedLastName] = useState('')
const [updatedFavoritePlant, setUpdatedFavoritePlant] = useState('')
const [updatedMembershipType, setUpdatedMembershipType] = useState('')

function getUsers() {
  fetch(MOCK_API_URL)
  .then(data => data.json())
  .then(data => setUsers(data))
}

useEffect(() => {
  getUsers()
  console.log(users)
}, [])

function deleteUser(id) {
  fetch(`${MOCK_API_URL}/${id}`, {
    method: 'DELETE'
  }).then(() => getUsers())

}

function postNewUser(e) {
  e.preventDefault()
  console.log(newUserFirstName, newUserLastName, newUserFavoritePlant, newUserMembershipType)

  fetch(MOCK_API_URL, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      firstName: newUserFirstName,
      lastName: newUserLastName,
      favoritePlant: newUserFavoritePlant,
      membershipType: newUserMembershipType
    })
  }).then(() => getUsers())
}

function updateUser(e, userObject) {
  e.preventDefault()
  let updatedUserObject = {
    ...userObject,
    firstName: updatedFirstName,
    lastName: updatedLastName,
    favoritePlant: updatedFavoritePlant,
    membershipType: updatedMembershipType
  }

  fetch(`${MOCK_API_URL}/${userObject.id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedUserObject),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(() => getUsers())
}

  return (
    <div className="App">
      {/*  */}
      <NewUserForm
        newUserFirstName={newUserFirstName}
        newUserLastName={newUserLastName}
        newUserFavoritePlant={newUserFavoritePlant}
        newUserMembershipType={newUserMembershipType}
        setNewUserFirstName={setNewUserFirstName}
        setNewUserLastName={setNewUserLastName}
        setNewUserFavoritePlant={setNewUserFavoritePlant}
        setNewUserMembershipType={setNewUserMembershipType}
        getUsers={getUsers}
        MOCK_API_URL={MOCK_API_URL}
      />

      {/*  */}
      {users.map((user, index) => (
        <div className="userContainer" key={index}>
          <div>
            First Name: {user.firstName}
            Last Name: {user.lastName}
            Favorite Plant: {user.favoritePlant}
            Membership Type: {user.membershipType}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
          <form>
            <h3>Update this User</h3>
            <label>Update First Name</label>
            <input onChange={(e) => setUpdatedFirstName(e.target.value)}></input><br></br>
            <label>Update Last Name</label>
            <input onChange={(e) => setUpdatedLastName(e.target.value)}></input><br></br>
            <label>Update Favorite Plant</label>
            <input onChange={(e) => setUpdatedFavoritePlant(e.target.value)}></input><br></br>
            <label>Update Membership Type</label>
            <input onChange={(e) => setUpdatedMembershipType(e.target.value)}></input><br></br>
            <button onClick={(e) => updateUser(e, user)}>Update</button>
      </form>
        </div>
      ))}
    </div>
  )
}

export default App