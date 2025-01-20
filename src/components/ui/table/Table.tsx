
type TableProps = {
    fields: never[]
    data: never[]
}

export function TableUI({fields, data}: TableProps) {
    // const listPagination = [
    //     10, 25, 50, 100
    // ]
    // const countTotalPage = (totalData: number, dataPerPage: number) => Math.floor(totalData / dataPerPage)


    // const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const searchString: string = event.target.value || ""
    //     setDataFiltered(initialData.suggestions.filter(v => v.name.toLowerCase().includes(searchString.toLowerCase())))
    // }
    //
    // const renderTotalPage = () => {
    //     const {totalData, dataPerPage, currentPage} = state.pagination
    //     const result = []
    //
    //     if (currentPage !== 1) {
    //         result.push(<li key={"first"} className="page-item" onClick={() => {
    //             setState({...state, pagination: {...state.pagination, currentPage: currentPage - 1}})
    //         }}>
    //             <a className="page-link text-foreground" aria-label="Previous">
    //                 <span aria-hidden="true">&laquo;</span>
    //             </a>
    //         </li>)
    //     }
    //     const totalPage = countTotalPage(totalData, dataPerPage)
    //     for (let i = currentPage; (i <= currentPage + 4) && (i < totalPage); i++) {
    //         result.push(<li key={i} className="page-item" onClick={() => {
    //             console.log(i)
    //             setState({...state, pagination: {...state.pagination, currentPage: i}})
    //         }}>
    //             <a className={`page-link text-foreground ${state.pagination.currentPage === i ? 'active' : ''}`}>
    //                 {i}
    //             </a>
    //         </li>)
    //     }
    //     if (currentPage !== totalPage - 1) {
    //         result.push(<li key={"last"} className="page-item" onClick={() => {
    //             setState({...state, pagination: {...state.pagination, currentPage: currentPage + 1}})
    //         }}>
    //             <a className="page-link text-foreground" aria-label="Next">
    //                 <span aria-hidden="true">&raquo;</span>
    //             </a>
    //         </li>)
    //     }
    //
    //     return result
    // }

    //
    // console.log(fields, data)
    // return <>
    //     <div className={"col-lg-12 d-flex flex-column align-items-end"}>
    //         <div className="col-3">
    //             <input type={"text"}
    //                    name={"search"}
    //                    className={"form-control"}
    //                    onInput={onSearch}
    //                    placeholder={"Cari..."}/>
    //         </div>
    //     </div>
    //
    //     <div className={"overflow-x-auto"}>
    //         <table className="table">
    //             <thead>
    //             <tr>
    //                 <th scope="col">No</th>
    //                 <th scope="col">Nama Pengirim</th>
    //                 <th scope="col">Email Pengirim</th>
    //                 <th scope="col">Tanggal</th>
    //                 <th scope="col" className={"text-center"}>Aksi</th>
    //             </tr>
    //             </thead>
    //             <tbody>
    //             {dataFiltered.map((v, i) => {
    //                 return <tr key={i}>
    //                     <th>{i + 1}</th>
    //                     <td>{v.name}</td>
    //                     <td>{v.email}</td>
    //                     <td>{new Date().toDateString()}</td>
    //                     <td className={"d-flex justify-content-center flex-row gap-2"}>
    //                         <button type="button" className="btn btn-outline-primary btn-link text-decoration-none"><i
    //                             className={"bi bi-search"}></i> Lihat
    //                         </button>
    //                         <button type="button" className="btn btn-outline-primary"
    //                                 data-bs-toggle="modal"
    //                                 data-bs-target="#exampleModal">
    //                             <i className={"bi bi-reply"}></i> Balas
    //                         </button>
    //                     </td>
    //                 </tr>
    //             })}
    //             </tbody>
    //         </table>
    //         <div className="d-flex flex-row justify-content-between pagination gap-5">
    //             <nav aria-label="suggestion">
    //                 <ul className="pagination">
    //                     <li className={"page-item"}><span className={"page-link border-0 text-muted"}
    //                                                       style={{fontSize: "small"}}>Data per halaman</span></li>
    //                     {listPagination.map(v => {
    //                         return <li key={v} className="page-item">
    //                             <a className={`page-link text-foreground ${state.pagination.dataPerPage === v ? 'active' : ''}`}
    //                                onClick={() => {
    //                                    setState({...state, pagination: {...state.pagination, dataPerPage: v}})
    //                                    // setDataFiltered(data.slice((pagination.currentPage - 1) * pagination.totalPage, pagination.dataPerPage))
    //                                }}>
    //                                 {v}
    //                             </a>
    //                         </li>
    //                     })}
    //                 </ul>
    //             </nav>
    //             <nav aria-label="suggestion">
    //                 <ul className="pagination">
    //                     {renderTotalPage()}
    //
    //                 </ul>
    //             </nav>
    //         </div>
    //     </div>
    //
    //     <div className="d-flex flex-row justify-content-between pagination gap-5">
    //         <nav aria-label="suggestion">
    //             <ul className="pagination">
    //                 <li className={"page-item"}><span className={"page-link border-0 text-muted"}
    //                                                   style={{fontSize: "small"}}>Data per halaman</span></li>
    //                 {listPagination.map(v => {
    //                     return <li key={v} className="page-item">
    //                         <a className={`page-link text-foreground ${state.pagination.dataPerPage === v ? 'active' : ''}`}
    //                            onClick={() => {
    //                                setState({...state, pagination: {...state.pagination, dataPerPage: v}})
    //                                // setDataFiltered(data.slice((pagination.currentPage - 1) * pagination.totalPage, pagination.dataPerPage))
    //                            }}>
    //                             {v}
    //                         </a>
    //                     </li>
    //                 })}
    //             </ul>
    //         </nav>
    //         <nav aria-label="suggestion">
    //             <ul className="pagination">
    //                 {renderTotalPage()}
    //             </ul>
    //         </nav>
    //     </div>
    // </>
}
