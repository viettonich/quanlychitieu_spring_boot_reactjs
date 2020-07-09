import React, { Component } from 'react';

class Modal extends Component {

    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirm xóa</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Bạn có chắc chắn muốn xóa không?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary"
                                data-dismiss="modal" onClick={() => this.props.confirmDelete()}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;