import React, { Component } from 'react';
import { format_curency } from "./../../Common/common";

class TableRow extends Component {

    delete = () => {
        this.props.delete(this.props.consumption.id);
    }

    edit = ()=>{
        this.props.edit(this.props.consumption.id);
    }

    render() {
        return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.consumption.category.name}</td>
                <td>{this.props.consumption.name}</td>
                <td>{format_curency(this.props.consumption.amount)}</td>
                <td><button className="btn btn-warning" onClick={()=>this.edit()}>Sửa</button>&nbsp;
                    <button className="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => this.delete() }>Xóa</button>
                </td>
            </tr>
        );
    }
}

export default TableRow;