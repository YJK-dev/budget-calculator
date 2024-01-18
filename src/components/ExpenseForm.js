import React from "react";
import { MdSend } from "react-icons/md";

// ExpenseForm 컴포넌트는 지출 항목을 입력하는 양식을 표시하고 관리합니다.
// charge, amount는 각각 지출 항목과 비용을 나타내는 상태 값이며,
// handleCharge, handleAmount는 해당 입력값을 처리하는 이벤트 핸들러 함수입니다.
// handleSubmit은 양식이 제출될 때 호출되는 함수로, edit prop에 따라 '수정' 또는 '제출' 버튼이 표시됩니다.
const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        {/* 지출 항목 입력란 */}
        <div className="form-group">
          <label htmlFor="charge">지출 항목</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="예) 렌트비"
            value={charge}
            onChange={handleCharge}
          />
        </div>
        {/* 비용 입력란 */}
        <div className="form-group">
          <label htmlFor="amount">비용</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="0"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      {/* 제출 또는 수정 버튼 */}
      <button type="submit" className="btn">
        {edit ? "수정" : "제출"} <MdSend className="btn-icon" />
      </button>
    </form>
  );
};

export default ExpenseForm;
