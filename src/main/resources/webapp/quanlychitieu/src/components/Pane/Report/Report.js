import React, { Component } from 'react';
import { Line, Doughnut } from "react-chartjs-2";
import ConsumptionService from '../../../services/ConsumptionService';
class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statisticAmountDayInMonth:{
                labels:[],
                datasets:[]
            },
            labels: ["01-07-2020", "02-07-2020", "03-07-2020", "04-07-2020", "05-07-2020", "06-07-2020", "07-07-2020", "01-07-2020", "01-07-2020", "08-07-2020"]
        };

    }

    componentDidMount = () => {

        ConsumptionService.statisticAmountDayInMonth()
            .then(response => {
                let labels=[];
                let datasets=[];
                response.data.forEach(element => {
                    labels.push(element[0].slice(0,10));
                    datasets.push(element[1])
                });
                this.setState({
                    statisticAmountDayInMonth: {
                        labels: labels,
                        datasets: datasets
                    }
                })
            });

    }

    render() {
        return (
            <div>
                <div style={{ width: "100%" }}>
                    <Line
                        data={{
                            labels: this.state.statisticAmountDayInMonth.labels,
                            datasets: [
                                {
                                    data: this.state.statisticAmountDayInMonth.datasets,
                                    label: "Số tiền tiêu",
                                    borderColor: "#3e95cd",
                                    fill: false
                                }
                            ]
                        }}
                        options={{
                            title: {
                                display: true,
                                text: "Số tiền chi tiêu theo ngày trong tháng (VND)"
                            },
                            legend: {
                                display: true,
                                position: "bottom"
                            }
                        }}
                    />
                </div>
                
                <div className="mt-3">
                    <Doughnut
                        data={{
                            labels: [
                                "Shopping",
                                "Ăn uống",
                                "Giải trí",
                                "Xe",
                                "Hóa đơn"
                            ],
                            datasets: [
                                {
                                    label: "Population (millions)",
                                    backgroundColor: [
                                        "#3e95cd",
                                        "#8e5ea2",
                                        "#3cba9f",
                                        "#e8c3b9",
                                        "#c45850"
                                    ],
                                    data: [2478, 5267, 734, 784, 433]
                                }
                            ]
                        }}
                        option={{
                            title: {
                                display: true,
                                text: "Thống kê tổng tiền các mục chi tiêu trong tháng"
                            },
                            legend: {
                                display: true,
                                position: "bottom"
                            }
                        }}
                    />
                </div>
            </div>
            
        );
    }
}

export default Report;