import React, {useEffect, useState} from 'react'

import './table.css'

const TableDontLimit = props => {

    let pages = 1

    let range = []

    if (props.limit !== undefined) {
        let page = Math.floor(props.bodyData.length / Number(props.limit))
        pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1
        range = [...Array(pages).keys()]
    }

    const [currPage, setCurrPage] = useState(0)

    const selectPage = page => {
        const start = Number(props.limit) * page
        const end = start + Number(props.limit)
        setCurrPage(page)
    }
    return (
        <div>
            <div className="table-wrapper">
                <table>
                    {
                        props.headData && props.renderHead ? (
                            <thead>
                            <tr>
                                {
                                    props.headData.map((item, index) => props.renderHead(item, index))
                                }
                            </tr>
                            </thead>
                        ) : null
                    }
                    {
                        props.bodyData ? (
                            <tbody>
                            {
                                props.bodyData.map((item, index) => {

                                        return props.renderBody(item, index+1)

                                })
                            }
                            </tbody>
                        ) : null
                    }
                </table>
            </div>
        </div>
    )
}

export default TableDontLimit
