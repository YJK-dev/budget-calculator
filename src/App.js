import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import ExpenseList from "./components/ExpenseList";
import { v4 as uuid } from "uuid";

// 초기 지출 목록을 로컬 스토리지에서 불러오거나 빈 배열을 사용
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  // 상태 변수들 선언
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  // 컴포넌트가 렌더링될 때 로컬 스토리지에 지출 목록을 저장
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // 입력된 지출 항목의 이름을 처리하는 핸들러
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  // 입력된 비용을 처리하는 핸들러
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  // 알림을 처리하는 핸들러
  const handleAlert = ({ type, text }) => {
    setAlert({
      show: true,
      type,
      text,
    });
    // 3초 후에 알림을 숨김
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  // 양식 제출을 처리하는 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        // 수정 모드일 때, 해당 ID의 지출 항목을 수정하고 알림을 표시
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "아이템이 수정되었습니다." });
      } else {
        // 새로운 지출 항목을 추가하고 알림을 표시
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "아이템이 생성되었습니다." });
      }

      // 입력 필드 초기화
      setCharge("");
      setAmount("");
    } else {
      // 지출 항목 또는 비용이 부족할 경우 알림을 표시
      handleAlert({
        type: "danger",
        text: "지출 항목과 비용은 필수 항목입니다. 비용은 0보다 커야합니다.",
      });
    }
  };

  // 모든 지출 항목을 삭제하고 알림을 표시하는 핸들러
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "모든 항목이 삭제되었습니다." });
  };

  // 특정 ID의 지출 항목을 삭제하고 알림을 표시하는 핸들러
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "아이템이 삭제되었습니다." });
  };

  // 특정 ID의 지출 항목을 수정 모드로 설정하고 입력 필드에 해당 정보를 채우는 핸들러
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  // JSX로 컴포넌트를 렌더링
  return (
    <div>
      {/* 알림 컴포넌트를 표시 */}
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      {/* 제목 표시 */}
      <h1 className={"title"}>예산 계산기</h1>
      <main className="App">
        {/* 지출 양식 컴포넌트 표시 */}
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        {/* 지출 목록 컴포넌트 표시 */}
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      {/* 총 지출 표시 */}
      <h1 className="totalExpense">
        총 지출:{" "}
        {expenses.reduce((acc, curr) => {
          return (acc += parseInt(curr.amount));
        }, 0)}
        원
      </h1>
    </div>
  );
}

// 컴포넌트를 내보내기
export default App;
