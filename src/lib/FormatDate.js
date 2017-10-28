const padNums = (num) => {
  return (num < 10) ? ('0' + num.toString()) : num.toString();
};

class FormatDate {
  static getDDMMYYY(dateString) {
    const date = new Date(dateString);
    return `${padNums(date.getDate())}/${padNums(date.getMonth())}/${date.getYear()}`;
  }
}

export default FormatDate;
