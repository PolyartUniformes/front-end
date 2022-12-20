import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Faction } from "../../../utils/types";
import Items from "./items";

type Data = {
  data: Faction[];
};

export default function Pagination({ data }: Data) {
  const [itemOffset, setItemOffset] = useState(0);

  const itemsData = data.filter((element) => {
    return !element.finished;
  });

  const endOffset = itemOffset + 1;
  const items = itemsData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / 1);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 1) % data.length;
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
