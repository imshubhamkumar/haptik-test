import React, { useState } from 'react';
import ConfirmDelete from '../confirmDelete.jsx';

const ListItem = ({ data, myFavorite, onDelete }) => {
    const [confirm, setConfirm] = useState(false);
    return ( 
        <>
    <li>
        <div className="card">
            <div className="card-body row">
                <div className="col-7">
                    <div className="name">
                        {data.name}
                    </div>
                    <span className="label">
                        is your friend
                    </span>
                </div>
                <div className="col-2 icon" onClick={() => myFavorite(data.id)}>
                    <i className={['bi', data.favorite ? 'bi-star-fill' : 'bi-star'].join(' ')}></i>
                </div>
                <div className="col-2 icon" onClick={() => setConfirm(true)}>
                    <i className="bi bi-trash"></i>
                </div>
            </div>
        </div>
    </li>
    {confirm &&
    <ConfirmDelete
        data={data}
        onDelete={onDelete}
        onClose={setConfirm}
        isShow={confirm}
    />}
    </>

     );
}
 
export default ListItem;