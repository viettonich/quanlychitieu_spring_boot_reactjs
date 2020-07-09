import React, { Component } from 'react';
import { format_curency, getCurrentDate } from "./../../Common/common";
import ConsumptionService from '../../../services/ConsumptionService';

import Table from './Table';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            consumptionList: [],
            txtSearch: '',
            totalMoney: ""
        };
        this.txtMonth = React.createRef();

    }


    componentDidMount = () => {
        const date = getCurrentDate().slice(0, 7)
        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        ConsumptionService.findByMonth(year, month)
            .then(response => {
                this.setState({
                    consumptionList: response.data
                })
            });
    }

    totalMoney = () => {
        let total = this.state.consumptionList.reduce(((accumulator, currentValue) => accumulator + parseFloat(currentValue.amount)), 0);
        return format_curency(total);
    }

    searchByMonth = () => {
        const year = this.txtMonth.current.value.slice(0, 4);
        const month = this.txtMonth.current.value.slice(5, 7);
        ConsumptionService.findByMonth(year, month)
            .then(response => {
                this.setState({
                    consumptionList: response.data
                })
            });
    }

    keyPressSearch = (event) => {
        const keyword = event.target.value;
        this.setState({
            txtSearch: keyword
        })
    }

    render() {

        return (
            <div className="row mt-3">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-1">
                            <h6 style={{ width: '200px' }}>Chọn tháng</h6>
                        </div>
                        <div className="col-lg-2">
                            <input className="form-control" type="month" onChange={() => this.searchByMonth()}
                                defaultValue={getCurrentDate().slice(0, 7)} style={{ width: '200px' }} ref={this.txtMonth} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 mt-3">
                    <h4 style={{ margin: '0 auto' }} className="mb-3">Danh sách các khoản chi tiêu</h4>

                    <div>
                        <input className="form-control" value={this.state.txtSearch} type="text" style={{ width: '500px' }}
                            onChange={(e) => this.keyPressSearch(e)} placeholder="Tìm kiếm" />
                        <p className="text-danger float-right">Tổng số tiền chi tiêu: {this.totalMoney()} VND</p>
                    </div>
                    <Table consumptionList={this.state.consumptionList} txtSearch={this.state.txtSearch}></Table>

                </div>
            </div>
        );
    }
}

export default Search;