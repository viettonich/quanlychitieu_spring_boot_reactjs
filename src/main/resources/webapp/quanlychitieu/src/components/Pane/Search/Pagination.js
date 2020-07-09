import React, { Component } from 'react';

class Pagination extends Component {


    render() {
        let pageNumbers = [];
        for (let i = 1; i <= this.props.totalPage; i++) {
            pageNumbers.push(i);
        }
        let renderPageNumbers = pageNumbers.map(number => {
            let classes = this.props.currentPage === number ? "page-item active" : "page-item";
            return (
                <li key={number} className={classes} onClick={() => this.props.changePage(number)}><a className="page-link" >{number}</a></li>
            );
        });
        let pre, next;
        if (this.props.totalPage>0) {
            pre = <li className={this.props.currentPage === 1 ? "page-item disabled" : "page-item"}
                onClick={() => this.props.changePage(1)}>
                <a className="page-link">Previous</a>
            </li>

            next = <li className={this.props.currentPage === this.props.totalPage ? "page-item disabled" : "page-item"}
                onClick={() => this.props.changePage(this.props.totalPage)}>
                <a className="page-link">Next</a>
            </li>

        }

        return <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {pre}
                {renderPageNumbers}
                {next}
            </ul>
        </nav>
    }
}

export default Pagination;