import React from "react"
import axiosWithAuth from './../utils/axiosWithAuth'

class FriendsList extends React.Component {
    state = {
        friends: []
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axiosWithAuth()
            .get('/api/friends')
            .then(res => {
                this.setState({
                    friends: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    render(){
        return(
            <div>
                {
                  this.state.friends.map(friend => 
                  <>
                    <div className="friends">
                    <h2>{friend.name}</h2>
                    <h2>{friend.age}</h2>
                    <h2>{friend.email}</h2>
                    </div>
                  </>
                    ) 
                }
            </div>
        )
    }
}

export default FriendsList