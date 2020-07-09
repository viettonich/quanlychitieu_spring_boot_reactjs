import React, { Component } from 'react';
import TableRow from './TableRow';

class Table extends Component {

    getRowTable = () => {
        const rows = this.props.consumptionList.map((item, index) =>
            <TableRow index={index + 1} key={index} consumption={item} delete={this.props.deleteConsumption}
                edit={this.props.editConsumption}></TableRow>
        );
        return rows;
    }

    render() {
        return (
            <table className="table table-striped table-bordered text-center">
                <thead className="bg-success">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Danh Mục</th>
                        <th scope="col">Tên khoản chi</th>
                        <th scope="col">Số tiền chi</th>
                        <th scope="col" width="140px;" />
                    </tr>
                </thead>
                <tbody>
                    {this.getRowTable()}
                </tbody>
            </table>
        );
    }
}

export default Table;