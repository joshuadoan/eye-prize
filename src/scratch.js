function fooBar() {
  const result = [];
  for (let i = 0; i < 100; i++) {
    if (i % 3 === 0) {
      result.push("fizz");
    }
    if (i % 5 === 0) {
      result.push("buzz");
    }
    if (i % 3 === 0 && i % 5 === 0) {
      result.push("fizzbuzz");
    } else {
      result.push(i);
    }
  }

  return result;
}

console.log(fooBar());
