import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Items } from "./items";

export default function Pagination({ data }: any) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 200;
  const items = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / 200);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 200) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div style={{ display: "grid", gridTemplateRows: "auto max-content" }}>
      <Items items={items} />
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
