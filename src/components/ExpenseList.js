import React from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

// ExpenseList 컴포넌트는 지출 항목 목록을 표시하고, 각 항목에 대한 수정 및 삭제 기능을 제공합니다.
// expenses prop은 지출 항목의 배열을 나타냅니다.
// handleEdit, handleDelete는 각각 항목의 수정 및 삭제 이벤트를 처리하는 함수입니다.
// clearItems는 모든 항목을 삭제하는 함수로, 목록이 비어있지 않은 경우에만 표시됩니다.
const ExpenseList = ({ expenses, handleEdit, handleDelete, clearItems }) => {
  return (
    <>
      {/* 지출 항목 목록을 나타내는 ul 요소 */}
      <ul className="list">
        {expenses.map((expense) => {
          return (
            // 각 지출 항목에 대한 ExpenseItem 컴포넌트를 렌더링
            <ExpenseItem
              key={expense.id}
              expense={expense}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      {/* 목록이 비어있지 않은 경우에만 표시되는 '목록 지우기' 버튼 */}
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          목록 지우기
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
