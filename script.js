const { format, fromUnixTime, getUnixTime, addMonths, subMonths, startOfWeek, startOfMonth, endOfWeek, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } = require("date-fns")

const button = document.querySelector('.date-picker-button')
const datePicker = document.querySelector('.date-picker')
const datePickerHeaderText = document.querySelector('.current-month')
const prevMonthButton = document.querySelector('.prev-month-button')
const nextMonthButton = document.querySelector('.next-month-button')
const dateGrid = document.querySelector('.date-picker-grid-dates')

let currentDate = new Date()

setDate(currentDate)

button.addEventListener('click', () => {
    datePicker.classList.toggle('show')
    const selectedDate = fromUnixTime(button.dataset.selectedDate)
    currentDate = selectedDate
    setupDatePicker(selectedDate)
})

function setupDatePicker(selectedDate) {
    datePickerHeaderText.innerText = format(currentDate, 'MMMM - yyyy')
    setupDates(selectedDate)
}

nextMonthButton.addEventListener('click', () => {
    currentDate = addMonths(currentDate, 1)
    const selectedDate = fromUnixTime(button.dataset.selectedDate)
    setupDatePicker(selectedDate)
})

prevMonthButton.addEventListener('click', () => {
    currentDate = subMonths(currentDate, 1)
    const selectedDate = fromUnixTime(button.dataset.selectedDate) 
    setupDatePicker(selectedDate)
})

function setDate(date) {
    button.innerText = format(date, 'MMMM do, yyyy')
    button.dataset.selectedDate = getUnixTime(date)
}

function setupDates(selectedDate) {
    const firstWeekStart = startOfWeek(startOfMonth(currentDate))
    const lastWeekEnd = endOfWeek(endOfMonth(currentDate))
    const dates = eachDayOfInterval({start: firstWeekStart, end: lastWeekEnd})
    dateGrid.innerHTML = ''

    dates.forEach(date => {
        const gridButton = document.createElement('button')
        gridButton.innerText = date.getDate(date)
        gridButton.classList.add('date')
        if (!isSameMonth(date, currentDate)) {
            gridButton.classList.add('date-picker-other-month-date')
        }
        if (isSameDay(date, selectedDate)) {
            gridButton.classList.add('selected')
        }
        
        gridButton.addEventListener('click', () => {
            setDate(date)
            datePicker.classList.remove('show')
        })
        dateGrid.appendChild(gridButton)
    })
}
