import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

const ButtonLoading = styled.button`
:hover {
    cursor: wait;
}
`

class Login extends React.Component {
    state = {
        credentials: {
            username: 'lambda',
            password: 'school',
        },
        isLoading: false
    }


    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };

    login = e => {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        axios.post('http://localhost:5000/api/login', this.state.credentials)
            .then(res => {
                console.log(">>>>>>", res.data)
                localStorage.setItem('token', res.data.payload);
                this.props.history.push('/protected');
            })
            .catch(err => {
                console.log(err);
                // this.setState({
                //     isLoading: false
                // })
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.login}>
                    <input
                        type='text'
                        name='username'
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                    />
                    <input
                        type='password'
                        name='password'
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />
                    {this.isLoading ? <ButtonLoading>Loading</ButtonLoading> : <button>Log in</button>}
                    
                </form>
            </div>
        )
    }
}

export default Login;