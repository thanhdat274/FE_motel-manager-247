import { Table } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import 'antd/dist/antd.css';

const { Column, ColumnGroup } = Table;
type Props = {
    data: any
}

const TabBillServiceHistory= ({ data }: Props) => {


    const femaleStudents = data.filter((item: { model: string }, index: any) => {
        return item.model === 'Bill Service';
    })

    return (
        <div>
          
            <Table
                dataSource={femaleStudents?.map((item: { _id: any; roomName: any; title: any; content: any; model: any; createdAt: moment.MomentInput }, index: number) => ({
                    index: index + 1,
                    content: item.content,
                    model: item.model,
                    title: item.title,
                    date: moment(item.createdAt).format('DD/MM/YYYY'),
                }))}
                pagination={{ pageSize: 6 }}
            >
                <Column title="STT" dataIndex="index" key="name" />
                <Column title="Tiêu đề" dataIndex="title" key="title" />
                <Column title="Nội dung" dataIndex="content" key="contents" width={500} render={(content) => {
                    return (
                        <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    )
                }} />
                <Column title="Ngày " dataIndex="date" key="date" />

            </Table>



        </div>


    )
}

export default TabBillServiceHistory