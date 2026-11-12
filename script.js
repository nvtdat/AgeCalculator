import datePicker from 'js-datepicker';
import {DateTime} from 'luxon';
import 'js-datepicker/dist/datepicker.min.css';

const form = document.querySelector('#age-form');//Gọi theo ID thì phải có dấu #
const input = document.querySelector('#birthday');
const result = document.querySelector('#result');

let selectedDate = null;

datePicker(input, {
  formatter: 'yyyy-MM-dd',
  onSelect: (instance, date) => {
    selectedDate = date;
  }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    result.textContent = '';
    if(!selectedDate) {
        result.textContent = 'Please choose your birthday';
        return;
    }

    //Lấy ngày sinh và ngày hiện tại
    const birthDate = DateTime.fromJSDate(selectedDate);
    const now = DateTime.now();

    //Kiểm tra ngày sinh có hợp lệ ko
    if(!birthDate.isValid || birthDate > now) {
      result.textContent = 'Invalid birthday. Please choose a valid date.';
      return;
    }

    const age  = now.diff(birthDate, ['years', 'months', 'days']).toObject();
    result.textContent = `You are ${Math.floor(age.years)} year, ${Math.floor(age.months)} month, ${Math.floor(age.days)} days old.`;

});