import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getListsImei, getUpcById } from '../../reduxs/index'
import { database } from '../../services/database'

import Header from '../../components/header';
import TableImei from '../../components/tableImei';
import Modal from '../../components/modal';
import Button from '@material-ui/core/Button';

export default function Imeis(props) {
    const { upc } = props.match.params
    const imeis = useSelector(state => state.imeisReducer)
    const [lists, setlists] = useState([]);
    const [dataUpc, setUpc] = useState([]);
    const dispatch = useDispatch()

    useEffect(async () => {
        const imeis = await database.getProducts(upc)
        console.log(imeis)
        setlists(imeis)
        getUpcById(dispatch, upc)
    }, [])

    // useEffect(() => {
    //     setlists(imeis.imeis)
    // }, [imeis])

    useEffect(() => {
        setUpc(imeis.upc)
    }, [imeis])
    return (
        <>
            <Header />
            <Modal data={upc} />
            <TableImei
                data={lists}
                dataUpc={dataUpc}
                history={props.history}
                typeTable={'imeis'}
            />
        </>
    )
}
