const btn = document.querySelector('.btn');
const startDate = document.querySelector('#firstDate');
const endDate = document.querySelector('#secondDate');
const minDate = document.querySelector('#minCurrDate');
const maxDate = document.querySelector('#maxCurrDate');
const minCurr = document.querySelector('#minCurrValue');
const maxCurr = document.querySelector('#maxCurrValue');
const help = document.querySelector('#dateHelp');

btn.addEventListener('click', () => {
    if (startDate.value > endDate.value) {
        help.classList.add('red');
        // minDate.value = '';
        // maxDate.value = '';
        minCurr.value = '';
        maxCurr.value = '';
        return
    } else {
        let dates = [];
        for (let i = startDate.valueAsNumber; i <= endDate.valueAsNumber; i += 86400000) {
            dates.push(i);
        }
        // console.log(dates);

        let dates2 = dates.map((datesNumbers) => {
            let newDate = new Date(datesNumbers);
            let dates3 = `${newDate.getFullYear()}-${newDate.getMonth() + 1
                }-${newDate.getDate()}`;
            return dates3;
        })
        // console.log(dates2);

        let currs = dates2.map((date) => {
            return `https://www.nbrb.by/api/exrates/rates/usd?parammode=2&ondate=${date}`;
        });
        // console.log(currs);

        let courses = [];
        let dates4 = [];
        Promise.all(currs.map((currs1) => fetch(currs1)
            .then((response) => response.json())))
            .then((curr) => {
                curr.forEach((cur) => {
                    courses.push(cur.Cur_OfficialRate);
                    dates4.push(cur.Date);
                })
                // console.log(courses);
                // console.log(dates4);

                let minValue = Math.min(...courses);
                let maxValue = Math.max(...courses);
                minDate.value = dates4[courses.indexOf(minValue)].slice(0, 10);
                maxDate.value = dates4[courses.indexOf(maxValue)].slice(0, 10);
                minCurr.value = minValue;
                maxCurr.value = maxValue;
            });
    }
})

