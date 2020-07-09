import React, { Component } from 'react';
import { format_curency, getCurrentDate } from "./../../Common/common";
import CategoryService from '../../../services/CategoryService';
import ConsumptionService from '../../../services/ConsumptionService';
import Table from './Table';

class Addition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idEdit: false,
            sltDanhMuc: "1",
            txtDate: getCurrentDate(),
            txtTenKhoanChi: "",
            txtSoTienChi: "",

            consumptionList: [],
            categoryList: []
        };
    }

    componentDidMount = () => {
        CategoryService.retrieveAllCategory()
            .then(response => {
                this.setState({
                    categoryList: response.data
                })
            });

        ConsumptionService.findByDate(this.state.txtDate)
            .then(response => {
                this.setState({
                    consumptionList: response.data
                })
            });

    }

    getOpntionCategory = () => {
        const options = this.state.categoryList.map(item =>
            <option key={item.id} value={item.id}>{item.name}</option>
        );
        return options
    }

    validateForm = (consumption) => {
        if (consumption.dateCreate === "" || consumption.name === "" || consumption.amount === "") {
            return false;
        } else {
            return true;
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let consumption = {};

        const idCategory = this.state.sltDanhMuc;
        const categories = this.state.categoryList;
        let category = categories.find(item => item.id === parseInt(idCategory));

        consumption.name = this.state.txtTenKhoanChi;
        consumption.amount = this.state.txtSoTienChi;
        consumption.dateCreate = this.state.txtDate;
        consumption.category = category;

        if (this.validateForm(consumption) === true) {
            let consumptionList = this.state.consumptionList;

            if (this.state.isEdit) {
                ConsumptionService.updateConsumption(this.state.id, consumption).then(response => {
                    consumption = response.data;
                    consumptionList.forEach(item => {
                        if (item.id === consumption.id) {
                            item.amount = consumption.amount;
                            item.name = consumption.name;
                            item.dateCreate = consumption.dateCreate;
                            item.category = consumption.category;
                        }
                    })
                    this.setState({
                        consumptionList: consumptionList,
                        isEdit: false,
                        txtSoTienChi: '',
                        txtTenKhoanChi: ''
                    });
                });

            } else {
                ConsumptionService.createConsumption(consumption).then(response => {
                    consumption = response.data;
                    consumptionList.push(consumption);
                    this.setState({
                        consumptionList: consumptionList,
                        txtSoTienChi: '',
                        txtTenKhoanChi: ''
                    });
                });

            }
        } else {
            alert("Vui lòng nhập đầy đủ thông tim vào form");
        }

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });

        if (name === "txtDate") {
            ConsumptionService.findByDate(value)
                .then(response => {
                    this.setState({
                        consumptionList: response.data
                    })
                });
        }
    }

    totalMoney = () => {
        let total = this.state.consumptionList.reduce(((accumulator, currentValue) => accumulator + parseFloat(currentValue.amount)), 0);
        return format_curency(total);
    }

    deleteConsumption = (id) => {
        const result = window.confirm("Bán có chắc chắn muốn xóa không?");
        if (result) {
            ConsumptionService.deleteConsumption(id).then(response => {
                if (response.status === 204) {
                    this.setState({
                        consumptionList: this.state.consumptionList.filter(item => item.id !== parseInt(id))
                    })
                }

            });
        }

    }

    editConsumption = (id) => {
        let consumption = this.state.consumptionList.find(item => item.id === parseInt(id));
        this.setState({
            isEdit: true,
            txtSoTienChi: consumption.amount,
            sltDanhMuc: consumption.category.id,
            txtDate: consumption.dateCreate.slice(0, 10),
            txtTenKhoanChi: consumption.name,
            id: id
        })
    }

    getNameButtonSubmit = () => {
        if (this.state.isEdit) {
            return "Sửa";
        } else {
            return "Thêm";
        }
    }

    render() {
        return (
            <div className="row mt-3">
                <div className="col-lg-3">
                    <h4 className="mb-3">Thêm khoản chi tiêu</h4>
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="txtDate">Date</label>
                            <input className="form-control" type="date" name="txtDate" value={this.state.txtDate} id="txtDate"
                                onChange={e => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sltDanhMuc">Danh mục</label>
                            <select id="sltDanhMuc" value={this.state.sltDanhMuc} name="sltDanhMuc"
                                onChange={e => this.handleInputChange(e)} className="form-control">
                                {this.getOpntionCategory()}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="txtTenKhoanChi">Tên khoản chi tiêu</label>
                            <input type="text" className="form-control" name="txtTenKhoanChi" id="txtTenKhoanChi"
                                onChange={e => this.handleInputChange(e)} placeholder="Nôi dung khoản chi tiêu" value={this.state.txtTenKhoanChi} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="txtSoTienChi">Số tiền chi</label>
                            <input type="number" className="form-control" name="txtSoTienChi" id="txtSoTienChi"
                                placeholder="Số tiền chi" onChange={e => this.handleInputChange(e)} value={this.state.txtSoTienChi} />
                        </div>
                        <button type="submit" className="btn btn-primary">{this.getNameButtonSubmit()}</button>
                    </form>
                </div>
                <div className="col-lg-9">
                    <h4 className="mb-3">Danh sách các khoản chi trong ngày {this.state.txtDate}</h4>
                    <Table consumptionList={this.state.consumptionList}
                        deleteConsumption={this.deleteConsumption}
                        editConsumption={this.editConsumption}></Table>
                    <p className="text-danger float-right">Tổng số tiền chi tiêu: {this.totalMoney()} VND</p>
                </div>

            </div>
        );
    }
}

export default Addition;