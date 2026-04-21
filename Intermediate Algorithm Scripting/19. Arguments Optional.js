function addTogether() {
  const [first, second] = arguments;

  // Kiểm tra xem đối số đầu tiên có phải là số không
  if (typeof first !== "number") {
    return undefined;
  }

  // Nếu chỉ có một đối số, trả về một function mới (Currying)
  if (arguments.length === 1) {
    return (second) => {
      if (typeof second !== "number") {
        return undefined;
      }
      return first + second;
    };
  }

  // Nếu có từ hai đối số, kiểm tra đối số thứ hai
  if (typeof second !== "number") {
    return undefined;
  }

  return first + second;
}

addTogether(2,3);