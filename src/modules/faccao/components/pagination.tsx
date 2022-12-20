import { Data } from "../../../utils/types";
import { useState } from "react";
import Items from "./items";
import ReactPaginate from "react-paginate";

type Item = {
  data: Data;
  filter: { code: number; name: string };
  itemsLimit: number;
};

export default function PaginatedItems({ data, filter, itemsLimit }: Item) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsLimit;
  const items = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsLimit);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsLimit) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div style={{ display: "grid", gridTemplateRows: "auto max-content" }}>
      <Items items={items} value={filter} itemsLimit={itemsLimit} />
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
