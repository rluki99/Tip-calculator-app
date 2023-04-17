const billInput = document.querySelector('#bill')
const customInput = document.querySelector('#custom')
const peopleInput = document.querySelector('#people')
const tipBtns = document.querySelectorAll('.calculator__tip-btn')
const tip = document.querySelector('#tip')
const total = document.querySelector('#total')
const error = document.querySelector('.error')
const resetBtn = document.querySelector('.reset')

const count = () => {
    const whichActive = document.querySelector('.active')
    error.textContent = ''
    peopleInput.classList.remove('error')
    resetBtn.classList.add('prevent')

    if(billInput.value === '' || peopleInput.value === '' || (customInput.value === '' && (whichActive === null || whichActive.value === '' ))) {
        return;
    } else if (peopleInput.value === '0') {
        peopleInput.classList.add('error')
        error.textContent = `Can't be zero`
        tip.textContent = '0.00'
        total.textContent = '0.00'
        return;
    }

    resetBtn.classList.remove('prevent')

    const billValue = parseFloat(billInput.value)
    const peopleValue = parseInt(peopleInput.value)

    let tipValue;

    if (whichActive) {
        tipValue = parseFloat(whichActive.value);
    } else {
        tipValue = parseFloat(customInput.value) / 100;
    }

    const tipCount = (billValue * tipValue) / peopleValue
    const totalCount = (billValue + (billValue * tipValue)) / peopleValue

    tip.textContent = tipCount.toFixed(2)
    total.textContent = totalCount.toFixed(2)

}

tipBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        //add class 'active' to button
        tipBtns.forEach(btn => btn.classList.remove('active'))
        e.target.classList.add('active')

        //delete value from custom if button clicked
        customInput.value = '';
        count()
    })
})

customInput.addEventListener('input', e => {
    //delete class active from all btns
    tipBtns.forEach(btn => btn.classList.remove('active'))
    count()
})

const clear = () => {
    billInput.value = ''
    peopleInput.value = ''
    customInput.value = ''
    tipBtns.forEach(btn => btn.classList.remove('active'))
    error.textContent = ''
    tip.textContent = '0.00'
    total.textContent = '0.00'
    resetBtn.classList.add('prevent')
}

resetBtn.addEventListener('click', () => {
    if(!resetBtn.classList.contains('prevent')) {
        clear()
    }
})