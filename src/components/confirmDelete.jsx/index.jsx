import React from 'react';

const ConfirmDelete = ({ data, isShow, onClose, onDelete }) => {
    const handleDelete = (id) => {
        onDelete(id);
        onClose(false);
    }
    return ( 
        <>
        <div className={['modal', isShow ? 'show' : ''].join(' ')} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" onClick={() => onClose(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h3>Are you sure?</h3>
                        <p>You want to remove <strong>{data.name}</strong> from your friend list.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={() => onClose(false)} className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        <button type="button" onClick={() => handleDelete(data.id)} className="btn btn-primary">Yes</button>
                    </div>
                </div>
            </div>
        </div>
        <div className={['modal-backdrop fade', isShow ? 'show' : ''].join(' ')}></div>
        </>
     );
}
 
export default ConfirmDelete;