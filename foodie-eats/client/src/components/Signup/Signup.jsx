import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios' // send to backend

class App extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            username:'',
            password:''
        }
        this.changeEmail = this.changeEmail.bind(this)
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changeEmail(event){
        this.setState({
            email:event.target.value
        })
    }
    changeUsername(event){
        this.setState({
            username:event.target.value
        })
    }
    changePassword(event){
        this.setState({
            password:event.target.value
        })
    }
    onSubmit(event){
        event.preventDefault()

        const registered = {
            fullName: this.state.fullName,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http:localhost:4000/app/signup', registered) // POST registered (holds all data) to backend address
            .then(response => console.log(response.data))

        this.setState({
            fullName:'',
            username:'',
            email:'',
            password:''
        }) // window.location = '/home' (if have window to send after log in)
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <input type='text'
                            placeholder='E-mail'
                            onChange={this.changeEmail}
                            value={this.state.email}
                            className='form-control form-group'
                            />

                            <input type='text'
                            placeholder='Username'
                            onChange={this.changeUsername}
                            value={this.state.username}
                            className='form-control form-group'
                            />

                            <input type='password'
                            placeholder='Password'
                            onChange={this.changePassword}
                            value={this.state.password}
                            className='form-control form-group'
                            />

                            <input type='submit'
                            className='btn btn-danger btn-block' 
                            value='Submit'
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;