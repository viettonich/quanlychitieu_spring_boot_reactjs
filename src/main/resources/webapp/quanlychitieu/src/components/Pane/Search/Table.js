import React, { Component } from 'react';
import { format_curency, changeAlias } from "./../../Common/common";
import Pagination from './Pagination';

const pageSize = 5;

class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalPage: 1,
            currentPage: 1,
            consumptionList: []
        };
    }

    componentWillReceiveProps(nextProps) {
        let txtSearch = nextProps.txtSearch;

        // filter data
        let filterConsumptionList = nextProps.consumptionList.filter(item => {
            return txtSearch === "" ||
                changeAlias(item.name).includes(changeAlias(txtSearch)) ||
                changeAlias(item.category.name).includes(changeAlias(txtSearch)) ||
                item.dateCreate.includes(txtSearch);
        });
        const number = Math.round(filterConsumptionList.length / pageSize);
        this.setState({
            totalPage: number,
            consumptionList: filterConsumptionList,
            currentPage: 1
        });
    }

    getRowTable = () => {
        let rows;
        if (this.state.consumptionList.length === 0) {
            rows = <tr><td colSpan={5}>No Data</td></tr>
        } else {

            // pagination
            const begin = (this.state.currentPage - 1) * pageSize;
            const end = this.state.currentPage * pageSize;

            const paginationConsumptionList = this.state.consumptionList.slice(begin, end);
            rows = paginationConsumptionList.map((item, index) => {
                return (<tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{format_curency(item.amount)}</td>
                    <td>{item.dateCreate.slice(0, 10)}</td>
                </tr>)
            });
        }

        return rows;
    }

    changePage = (page) => {
        this.setState({
            currentPage: page
        });
    }



    render() {
        return (
            <div>
                <table className="table table-striped table-bordered text-center">
                    <thead className="bg-success">
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Danh Mục</th>
                            <th scope="col">Tên khoản chi</th>
                            <th scope="col">Số tiền chi</th>
                            <th scope="col" width="200px;">Ngày chi tiêu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getRowTable()}
                    </tbody>
                </table>
                <Pagination totalPage={this.state.totalPage} currentPage={this.state.currentPage} changePage={this.changePage}></Pagination>
            </div>
        );
    }
}

export default Table;