import React from "react";

export default class NewUserForm extends React.Component {
    postNewUser = (e) => {
        e.preventDefault();
        const {
            newUserFirstName,
            newUserLastName,
            newUserFavoritePlant,
            newUserMembershipType,
            getUsers,
            MOCK_API_URL,
        } = this.props;

        console.log(newUserFirstName, newUserLastName, newUserFavoritePlant, newUserMembershipType);

        fetch(MOCK_API_URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: newUserFirstName,
                lastName: newUserLastName,
                favoritePlant: newUserFavoritePlant,
                membershipType: newUserMembershipType
            })
        }).then(() => getUsers());
    }

    render() {
        const {
            setNewUserFirstName,
            setNewUserLastName,
            setNewUserFavoritePlant,
            setNewUserMembershipType,
        } = this.props;

        return (
            <div className="newUserForm">
                <form>
                    <h3>New User Form</h3>
                    <label>First Name</label>
                    <input onChange={(e) => setNewUserFirstName(e.target.value)}></input>
                    <label>Last Name</label>
                    <input onChange={(e) => setNewUserLastName(e.target.value)}></input>
                    <label>Favorite Plant</label>
                    <input onChange={(e) => setNewUserFavoritePlant(e.target.value)}></input>
                    <label>Membership Type</label>
                    <input onChange={(e) => setNewUserMembershipType(e.target.value)}></input>
                    <button class="btn btn-success" onClick={(e) => this.postNewUser(e)}>Submit</button>
                </form>
            </div>
        )
    }
}
