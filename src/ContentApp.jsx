import React from 'react';

export class ContentApp extends React.Component {
    render() {
        let { items } = this.props;
        return (
            <div className="listApp">
                { items.length > 0 &&
                <ul className="list-group">
                    { items.map((value, index) => <li key={index}>{value}</li>) }
                </ul>
                }
                { items.length === 0 &&
                <p>Add new todo</p>
                }
            </div>
        )
    }
}