function truthCheck(collection, pre) {
  // Trả về true nếu tất cả các đối tượng trong collection có thuộc tính 'pre' là truthy
  return collection.every((obj) => obj[pre]);
}

truthCheck([{name: "Quincy", role: "Founder", isBot: false}, {name: "Naomi", role: "", isBot: false}, {name: "Camperbot", role: "Bot", isBot: true}], "isBot");