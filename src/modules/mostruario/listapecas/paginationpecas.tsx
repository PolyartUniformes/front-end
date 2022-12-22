import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Items } from "./itemspecas";

export default function Pagination({ data, parents }: any) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 20;
  const items = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / 20);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 20) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div style={{ display: "grid", gridTemplateRows: "auto max-content" }}>
      <Items items={items} parents={parents} />
      <ReactPaginate
        className="pagination"
        activeClassName="activePage"
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={0}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={undefined}
      />
    </div>
  );
}
