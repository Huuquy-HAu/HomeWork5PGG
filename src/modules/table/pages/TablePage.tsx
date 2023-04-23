import React, { useEffect, useState } from 'react'
import Table from '../component/TableListItem'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { deleteInvoice, selectDataList, setInvoiceList } from '../redux/tableReducer'
import { Invoice, SearchParams } from '../../../models/invoice'
import { Input, Form, Pagination, Select, DatePicker, Button } from 'antd';
import type { PaginationProps } from 'antd';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


interface QueryParams {
    page: number;
    pagesize: number;
}

function TablePage() {
    const dispatch = useDispatch()
    const ListTask: Invoice[] = useSelector(selectDataList)
    const [ListDataShow, setListDataShow] = useState<Invoice[]>([])
    let [Page, setPage] = useState<Number>(1);
    let [PageSize, setPageSize] = useState<Number>(10);
    const nav = useNavigate()
    const search = useLocation()
    let [count, setCount] = useState(1)


    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onChange: PaginationProps['onChange'] = (page: number, pagesize: number) => {
        console.log(page, pagesize);
        setPage(page);
        setPageSize(pagesize)
        setListDataShow([...ListTask.slice((page - 1) * 10, pagesize * page)])
        nav(`/?page=${page}&pagesize=${pagesize}`)
    };

    const DeleteItem = (id: string) => {
        const result = parseQueryString(search.search)
        dispatch(deleteInvoice(id))
        if (result) {
            return setListDataShow([...ListTask.slice((result.page - 1) * 10, result.pagesize * result.page)])
        }
        setListDataShow([...ListTask.slice(0, 10)])
        setCount(count += 1)
    }
    const getData = async (page?: number, pagesize?: number) => {
        const res = await axios.get('https://6444d218914c816083c055af.mockapi.io/api/v1/task')
        dispatch(setInvoiceList(res.data))
        if (page && pagesize) {
            const data = res.data.slice((page - 1) * 10, pagesize * page)
            return setListDataShow(data)
        }
        const data = res.data.slice(0, 10)
        setListDataShow(data)
    }

    const parseQueryString = (queryString: string): QueryParams => {
        const sanitizedString = queryString.substring(1);
        const keyValuePairs = sanitizedString.split("&");
        const result: QueryParams = {
            page: NaN,
            pagesize: NaN,
        };

        keyValuePairs.forEach((keyValuePair) => {
            const [key, value] = keyValuePair.split("=");
            if (key in result) {
                result[key as keyof QueryParams] = parseInt(value, 10);
            }
        });

        return result;
    };
    const filterInvoices = (invoices: Invoice[], searchParams: SearchParams): Invoice[] => {
        return invoices.filter(invoice => {
            // Lọc theo tiêu chí Status
            if (searchParams.Status !== undefined && invoice.Status !== searchParams.Status) {
                return false;
            }

            // Lọc theo tiêu chí Client
            if (searchParams.Client !== undefined && !invoice.client.toLowerCase().includes(searchParams.Client.toLowerCase())) {
                return false;
            }

            // Lọc theo tiêu chí from
            if (searchParams.from !== undefined && new Date(invoice.createdAt) < searchParams.from) {
                return false;
            }

            // Lọc theo tiêu chí to
            if (searchParams.to !== undefined && new Date(invoice.createdAt) > searchParams.to) {
                return false;
            }

            // Lọc theo tiêu chí Invoice
            if (searchParams.Invoice !== undefined && !invoice.Invoice.toLowerCase().includes(searchParams.Invoice.toLowerCase())) {
                return false;
            }

            return true;
        });
    }

    const onFinish = (values: any) => {
        console.log('Success:', filterInvoices(ListDataShow,values));
        setListDataShow([...filterInvoices(ListDataShow,values)])
    };


    useEffect(() => {
        const result = parseQueryString(search.search);
        console.log(result);
        getData(result.page, result.pagesize)
    }, [])

    return (
        <>
            <h5>Payroll Transactions List</h5>

            <div className="filter">
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    style={{ maxWidth: 1000, display: 'flex' }}
                >
                    <Form.Item
                        name="Status"
                    >
                        <Select
                            style={{ width: 120 }}
                            onChange={handleChange}
                            placeholder="Status"
                            options={[
                                { value: true, label: 'Complete' },
                                { value: false, label: 'Reject' },
                            ]}
                        />

                    </Form.Item>

                    <Form.Item
                        name="Client"
                        style={{ width: 200 }}
                    >
                        <Input placeholder='Client' />

                    </Form.Item>

                    <Form.Item
                        name="from"
                        style={{ width: 200 }}
                    >
                        <DatePicker placeholder='From' />
                    </Form.Item>

                    <Form.Item
                        name="to"
                        style={{ width: 200 }}
                    >
                        <DatePicker placeholder='To' />
                    </Form.Item>

                    <Form.Item
                        name="Invoice"
                        style={{ width: 200 }}
                    >
                        <Input placeholder='Invoice #' />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div className="table">
                <Table ListTask={ListDataShow} DeleteItem={DeleteItem} />
            </div>

            <div className="Pagination">
                <Pagination defaultCurrent={1} total={ListTask.length} onChange={onChange} />
            </div>
        </>
    )
}

export default TablePage