import React from "react";
import { readDictionary } from "./Reader";

class Dictionary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            filteredItems: []
        };
    }

    componentDidMount() {
        // set the values of the dictionary
        const items = readDictionary();

        // no filter on start
        const filteredItems = items;
        this.setState({
            items: items,
            filteredItems: filteredItems
        })
    }

    filterItems(searchTerm) {
        // shallow copy of states items
        let items = this.state.items.slice()
        const result = items.filter(item => {
            return item.name.startsWith(searchTerm.target.value);
        })

        this.setState({ filteredItems: result })
    }

    showDefinition(event, item) {
        // set boolean of clicked item to show/hide def
        let items = this.state.filteredItems.map(dictItem => {
            if (dictItem === item) {
                dictItem.showDefinition = !item.showDefinition
            }
            return dictItem;
        });
        // update state to rerender
        this.setState({ filteredItems: items })
        // prevent navigation change (stay on the site)
        event.preventDefault();
    }

    sortItems() {
        return this.state.filteredItems.sort((item1, item2) => (item1.name > item2.name) ? 1 : -1)
    }

    displayItems() {
        // if searchterm does not match any item show default message
        if (!this.state.filteredItems.length) {
            return <span className="def">No items found</span>
        }

        //sort items by name
        const filteredItems = this.sortItems();

        // go through each item of the dictionary and show the name
        // when user clicks on a name change the showDef boolean to display the definition
        const items = filteredItems.map(item => (
            <div key={item.name} className="dictionaryItem" onClick={(e) => this.showDefinition(e, item)}>
                <span className="item">
                    {item.name}
                    <span className="spelling"> {item.spelling}</span>
                </span>
                <br />
                <span className="def">
                    {(item.showDefinition) && 
                    <div> 
                        <hr className= "defDevider"/>
                        {item.definition}
                    </div>}
                </span>
            </div>));
        return items;
    }

    render() {
        return (
            <div>
                <div className="box">
                    <h1>Dictionary</h1>
                    <input
                        name="search"
                        className="searchField"
                        placeholder="Type in your search Term"
                        autoComplete="off"
                        onChange={e => this.filterItems(e)} />
                </div>
                <hr />
                <div className="box">
                    {this.displayItems()}
                </div>
            </div>
        );
    }
}

export default Dictionary;
