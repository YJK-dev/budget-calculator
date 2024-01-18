import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

// ExpenseItem 컴포넌트는 단일 지출 항목을 나타내고, 해당 항목에 대한 수정 및 삭제 기능을 제공합니다.
// expense prop은 각 지출 항목의 정보를 나타냅니다.
// handleEdit은 해당 항목을 수정하는 함수로, id를 매개변수로 받아 호출됩니다.
// handleDelete는 해당 항목을 삭제하는 함수로, id를 매개변수로 받아 호출됩니다.
const ExpenseItem = ({ expense, handleEdit, handleDelete }) => {
  const { id, charge, amount } = expense;

  return (
    <li className="item">
      {/* 지출 항목 정보를 나타내는 div */}
      <div className="info">
        {/* 항목 이름 */}
        <span className="expense">{charge}</span>
        {/* 항목 비용 */}
        <span className="amount">{amount}</span>
      </div>
      {/* 수정 및 삭제 버튼 영역 */}
      <div>
        {/* 수정 버튼 */}
        <button
          className="edit-btn"
          aria-label="edit button"
          onClick={() => handleEdit(id)}
        >
          <MdEdit />
        </button>
        {/* 삭제 버튼 */}
        <button
          className="clear-btn"
          aria-label="delete button"
          onClick={() => handleDelete(id)}
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
