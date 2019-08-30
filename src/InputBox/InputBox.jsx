import React from 'react';
import './InputBox.css';
const users = [
    {
        name: "Vishvas Nagpal",
        email: "vishvas.nagpal@gmail.com",
        id: 1
    },
    {
        name: "Anikt Nagpal",
        email: "ankit.nagpal@gmail.com",
        id: 2
    },
    {
        name: "Vipin Nagpal",
        email: "vipin.nagpal@gmail.com",
        id: 3
    },
    {
        name: "Sahil Banga",
        email: "sahil.banga@gmail.com",
        id: 4
    },
]
class InputBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            val: "",
            listItems: users,
            selected: [],
            showList: false,
            allItems: users,
            backspaceCount: 0
        }
        this.onChange = this.onChange.bind(this);
        this.filterList = this.filterList.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.toggleList = this.toggleList.bind(this);
        this.hideList = this.hideList.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }
    onChange(e) {
        const {value} = e.target;
        this.setState({
            val: value
        });
        this.filterList(value);
    }
    filterList(val) {
        if (!!val) {
            this.setState(oldState => ({
                listItems: oldState.allItems.filter(item => (item.name.toLowerCase().includes(val.toLowerCase())))
            }));
        } else {
            this.setState({
                listItems: this.state.allItems
            })
        }

    }
    onItemClick(item) {
        this.setState(oldState => {
            const filteredItems = oldState.allItems.filter(i => (i.id !== item.id));
            return {
                selected: [...oldState.selected, item],
                allItems: filteredItems,
                listItems: filteredItems
            }
        });
        this.hideList();
    }
    onRemove(item) {
        const {allItems, selected} = this.state;
        const removedItem = selected.filter(i => (i.id !== item.id));
        this.setState({
            selected: removedItem,
            allItems: [...allItems, item],
            listItems: [...allItems, item]
        })
    }
    hideList(e) {
        this.setState({showList: false})
    }
    toggleList(e) {
        this.setState({showList: true})
    }
    onKeyUp(e) {
        const key = e.which || e.keyCode || e.charCode;
        if(key === 8) {
            this.setState(oldState => ({
                backspaceCount: oldState.backspaceCount + 1
            }))
        }
    }
    render() {
        return (
            <div className="input-box">
                <div className="info-container">
                    <div className="tags">
                        {this.state.selected.map(item => (
                            <div title={item.name} className="tag" key={item.id}>
                                <span className="name">{item.name}</span>
                                <span className="close" onClick={() => this.onRemove(item)}>x</span>
                            </div>
                        ))}
                    </div>
                    <input
                        onChange={this.onChange}
                        onFocus={this.toggleList}
                        onKeyUp={this.onKeyUp}
                        type="text" name={this.props.name} value={this.state.value} />
                </div>
                {
                    this.state.showList ?
                        <ul className="list">
                            {this.state.listItems.map(item => (
                                <li key={item.id} onClick={() => this.onItemClick(item)}>
                                    <span>{item.name}</span>
                                    <span>{item.email}</span>
                                </li>
                            ))}
                        </ul> :
                        null
                }

            </div>
        );
    }
}

export default InputBox;
