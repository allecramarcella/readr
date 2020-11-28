import React, { Component } from 'react'

export default class SearchBar extends Component {

    state = {
        search: ''
    }

    changeHandler = (e) => {
        this.setState({search: e.target.value}, this.handleSubmit)
        this.handleSubmit()
    }

    handleSubmit = () => {
        this.props.searchTerm(this.state)
    }
    
    render() {
        return (
            <div>
                <form >
                    <input 
                        type="text" 
                        className="input search-bar" 
                        name="search" 
                        placeholder="Search" 
                        value={this.state.search}
                        onChange={this.changeHandler}
                        />
                </form>  
            </div>
        )
    }
}
