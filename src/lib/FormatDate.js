const padNums = (num) => {
  return (num < 10) ? ('0' + num.toString()) : num.toString();
};

class FormatDate {
  static getDDMMYYY(dateString) {
    const date = new Date(dateString);
    console.log(date.getFullYear());
    return `${padNums(date.getDate())}/${padNums(date.getMonth() + 1)}/${date.getFullYear()}`;
  }

  //Some functions for sorting homework objects by setDate
  static sortAsc(hw1, hw2) {
    return Date.parse(hw1.setDate) - Date.parse(hw2.setDate);
  }

  static sortDesc(hw1, hw2) {
    return Date.parse(hw2.setDate) - Date.parse(hw1.setDate);
  }
}

export default FormatDate;
