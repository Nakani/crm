import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getListsUpc } from '../../reduxs/index'

import Header from '../../components/header';
import Table from '../../components/table';
import ModalUpc from '../../components/modalUpc';
import ModalDel from '../../components/modalDel';

export default function Products(props) {
    const products = useSelector(state => state.productsReducer)
    const [lists, setlists] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        getListsUpc(dispatch)
    }, [])

    useEffect(() => {
        setlists(products)
    }, [products])

    return (
        <>
            <Header />
            <ModalUpc history={props.history} />
            <Table
                data={lists}
                history={props.history}
                typeTable={'upcs'}
            />
        </>
    )
}
