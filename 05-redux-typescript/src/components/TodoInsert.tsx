import React, { useState, ChangeEvent, FormEvent } from 'react';

function TodoInsert() {
  const [value, setValue] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    setValue('');
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <input placeholder="할 일을 입력하세요" value={value} onChange={onChangeHandler} />
      <button type="submit">등록</button>
    </form>
  );
}

export default TodoInsert;
