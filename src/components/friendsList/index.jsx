import React, { useState } from 'react';
import ListItem from '../listItem';
import Pagination from '../pagination';

const FriendsList = () => {
    const [friendLit, setFriendList] = useState([]);
    const [nonFilter, setNonFilter] = useState([]);
    const [addName, setAddNAme] = useState('');
    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(Math.ceil(friendLit.length/4))

    const onNextPage = () => {
        setMaxPage(Math.ceil(friendLit.length/4));
        const totalPage = Math.ceil(friendLit.length/4);
        setPage((page+1)%totalPage);
        setFriendList(nonFilter);
    }
    const onPrevPage = () => {
        setMaxPage(Math.ceil(friendLit.length/4));
        const totalPage = Math.ceil(friendLit.length/4);
        if ((page+4-1)%totalPage < 0) {
            return false;
        }
        setPage((page+4-1)%totalPage);
        setFriendList(nonFilter);
    }
    const onPageClick = (pageNo) => {
        setMaxPage(Math.ceil(friendLit.length/4));
        setPage(pageNo);
        setFriendList(nonFilter);
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            let list = [...friendLit];
            list.push({id: list.length + 1, name: addName, favorite: false});
            setFriendList(list);
            setNonFilter(list);
            setAddNAme('')
        }
    }

    const handleFavorite = (id) => {
        let list = [...friendLit];
        list.filter((item) => {
            if (item.id === id) {
                if (item.favorite) {
                    item.favorite = false;
                } else {
                    item.favorite = true;
                }
            }
            return item;
        })
        setFriendList(list);
        setNonFilter(list);
        setMaxPage(Math.ceil(friendLit.length/4));
    } 
    const handleDelete = (id) => {
        let list = [...friendLit];
        list = [...list.filter((item) => item.id !== id)];
        setFriendList(list)
        setNonFilter(list);
        if (Math.ceil(list.length/4) < page + 1) {
            setPage(page - 1);   
        }
    }
    const handleSearch = (str) => {
        let list = [...friendLit];
        setPage(0)
        const temp = [...nonFilter]
        list = [...temp.filter((item) => item.name.toLowerCase().indexOf(str.toLowerCase()) > -1)];
        if (!str) {
            setFriendList(temp)
        } else {
            setFriendList(list);
        }
    }
    const handleSort = () => {
        let list = [...friendLit];
        setPage(0)
        list = [...list.sort((a,b)=> ((a.favorite === b.favorite) ? 0 : (a.favorite ? -1 : 1)))];
        setFriendList(list);
    }
    return ( 
        <>
         <div className="list-container shadow-sm">
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            Friends List
                        </a>
                        <div className="d-flex">
                            <input className="form-control"
                                onChange={(e) => handleSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
                        </div>
                        <form className="d-flex">
                            <span className="sort-btn" onClick={() => handleSort()}>Sort by favorite</span>
                        </form>
                    </div>
                </nav>
                <div className="add-name-container">
                    <input 
                        type="text"
                        name="addName"
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setAddNAme(e.target.value)}
                        value={addName}
                        placeholder="Enter you friend's name"
                        className="form-control"
                    />
                </div>
                <div className="list">
                    <ul>
                        {friendLit.slice(page*4, 4*(page+1)).map((item, idx) => 
                            <ListItem
                                key={idx}
                                data={item}
                                myFavorite={handleFavorite}
                                onDelete={handleDelete}
                            />)}
                    </ul>
                </div>
                {Math.ceil(friendLit.length/4) > 1 &&
                <Pagination
                    onNextPage={onNextPage}
                    onPrevPage={onPrevPage}
                    maxPage={maxPage}
                    friendLit={friendLit}
                    onPageClick={onPageClick}
                    currentPage={page}
                />}
            </div>
        </>
     );
}
 
export default FriendsList;