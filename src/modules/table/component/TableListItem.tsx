import React, { useEffect } from 'react'
import { Invoice } from '../../../models/invoice'
import { Button } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import { deleteInvoice, selectDataList, setInvoiceList } from '../redux/tableReducer';


interface Props {
    ListTask: Invoice[],
    DeleteItem:(id:string) =>  void
}

function TableListItem(props: Props) {

    const {ListTask , DeleteItem} = props
    const ListTaskData: Invoice[] = useSelector(selectDataList)
    const dispatch = useDispatch()

    const DeleteItems = (id:string) => {
        DeleteItem(id)
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    <th scope="col">Client</th>
                    <th scope="col">Currency</th>
                    <th scope="col">Total</th>
                    <th scope="col">invoice</th>
                </tr>
            </thead>
            <tbody>
                {ListTask? 
                    ListTask.map((value, index) => {
                        return(
                            <tr key={index}>
                                <td scope="row">{value.Status ? 'Complete': 'Reject'}</td>
                                <td>{value.createdAt.split('T')[0].split('-').reverse().join('-')}</td>
                                <td>{value.client}</td>
                                <td>{value.Currency}</td>
                                <td>{value.Total}</td>
                                <td>{value.Invoice}</td>
                                <td><Button onClick={() => {DeleteItems(value.id)}} >Delete</Button></td>
                            </tr>
                        )
                    })
                :null}
            </tbody>
        </table>
    )
}

export default TableListItem