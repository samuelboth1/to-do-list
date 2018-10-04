import React from 'react';
import './addBar.css';

class AddBar extends React.Component {

    render(props) {
        return (
            <div className="container">
                <UserInput />
            </div>
        );
    }
}
class UserInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            toDoListCounter: 0,
            thingsToDo: []
        };

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
        this.delete = this.delete.bind(this);
    }
    componentDidMount(){
        // get data from db
        fetch('/api/tasks')
            .then(res => res.json())
            .then(result => this.setState({
                thingsToDo: result
            }, () => console.log('fetched tasks', result)));
        // push data to db
        
    }
    change(e) {
        this.setState({ value: e.target.value});
    }
    submit(e) {
        // var newId = this.state.thingsToDo.length() + 1;
        fetch('/save/task', {
            body: {
                value: [this.state.value, ...this.state.thingsToDo],
                id: 1
            }
        }).then(() => {
            console.log('new task added...');
        });
//         if (this.state.value === '') {
//            alert('please fill something in');
//         }
//         else {
//             this.setState({ 
//                 toDoListCounter: this.state.toDoListCounter + 1,
//                 thingsToDo: [this.state.value, ...this.state.thingsToDo],
//                 value: '',
//             });

//             e.preventDefault();
//         }
//   ;
    }
    render() {
        this.state.thingsToDo.map(() => {
            return this.state.todoListCounter + 1;
        });
        return (
            <div>
                <form onSubmit={this.submit}>
                    <h1>things to do {this.state.toDoListCounter}</h1>
                    <input className="input" type="text" placeholder="type something" value={this.state.value} onChange={this.change} />
                    <input type="submit" value="Submit" className="input-btn" />
                </form>
                {this.state.thingsToDo.map((item) => {
                    return(
                        <button key={item.id} className="item-container" onClick={this.delete}>
                            <p className="item">{item.value}</p>
                            <hr />
                        </button>
                    );
                })}
            </div>
        );
    }
    delete(){
        this.state.thingsToDo.slice(this.state.value);
        this.setState({
            todoListCounter: this.state.toDoListCounter - 1,
            thingsToDo: [],
        });
    }
}


export default AddBar;