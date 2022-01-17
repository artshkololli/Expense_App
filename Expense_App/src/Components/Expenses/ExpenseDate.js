import "./ExpenseDate.css";

const ExpenseDate = (props) => {
  const day = props.date.substring(8,10);
  let month = props.date.substring(5,7);
  const year = props.date.substring(0,4);
  
  switch (month) {
    case "01": month = "Jan";
    break;
    case "02": month = "Feb";
    break;
    case "03": month = "Mar";
    break;
    case "04": month = "Apr";
    break;
    case "05": month = "May";
    break;
    case "06": month = "Jun";
    break;
    case "07": month = "Jul";
    break;
    case "08": month = "Aug";
    break;
    case "09": month = "Sep";
    break;
    case "10": month = "Oct";
    break;
    case "11": month = "Nov";
    break;
    case "12": month = "Dec";
    break;
    default: month= "";
  }

  return (
    <div className="expense-date">
      <div className="expense-date__day">{day}</div>
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
    </div>
  );
}

export default ExpenseDate;
