const headerSearch = document.querySelector('.header__search');
const headerSearchInput = document.querySelector('.header__search-input');
const loader = document.querySelector('.scammer-list__loader')
const overlay = document.querySelector('.overlay')
const overlayImage = document.querySelector('.overlay img')
const searchRemove = document.querySelector('.header__search-remove')
const scammerApi = 'https://61e8b8af7ced4a00172ff662.mockapi.io/api/listscammer'
const scammerList = document.querySelector('.scammer-list')

// Event
headerSearchInput.addEventListener('click', (e) => {
    e.stopPropagation()
    headerSearch.classList.add('active')
})
headerSearchInput.addEventListener('change', debounceFn(function(e) {
    let path = scammerApi
    if (e.target.value !== "") {
        path = `${scammerApi}?accountNumber=${e.target.value}`
        searchRemove.classList.add('active')
    }
    getScammerList(path)
}, 500))

headerSearchInput.addEventListener('keyup', (e) => {
    if (e.target.value.length > 0) {
        searchRemove.classList.add('active')
    } else {
        searchRemove.classList.remove('active')

    }
})

searchRemove.addEventListener('click', () => {
    headerSearchInput.value = ""
    searchRemove.classList.remove('active')
    getScammerList()

})

window.addEventListener('click', (e) => {
    const active = document.querySelector('.active')
    if (active) {
        headerSearch.classList.remove('active')
    }
})

/* Function */
function start() {
    getScammerList()
}
start()

function debounceFn(func, wait, immediate) {
    let timeout;
    return function() {
        let context = this,
            args = arguments;
        let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function renderItem(item) {
    const template = `
    <div class="scammer-item">
        <div class="scammer-header">
            <div class="scammer-header__number">
                #${item.id < 10? '0' : ''}${item.id}
            </div>
            <span class="scammer-header__name">
                ${item.accountHolder}
            </span>
            <span class="scammer-header__more">
                Xem Chi Ti???t
            </span> 
        </div>
        <div class="scammer-info">
            <div class="scammer-info__item">
                <div class="scammer-info__title">
                    <i class="fas fa-user"></i>
                    H??? T??n:
                </div>
                <div id="info-name" class="scammer-info__name">
                    ${item.accountHolder}
                </div>
            </div>
            <div class="scammer-info__item">
                <div class="scammer-info__title">
                    <i class="fas fa-phone"></i>
                    S??T:
                </div>
                <div id="info-name" class="scammer-info__name">
                    ${item.phoneNumber}
                </div>
            </div>
            <div class="scammer-info__item">
                <div class="scammer-info__title">
                    <i class="far fa-address-card"></i>
                    STK:
                </div>
                <div id="info-name" class="scammer-info__name">
                    ${item.accountNumber}
                </div>
            </div>
            <div class="scammer-info__item">
                <div class="scammer-info__title">
                    <i class="fas fa-university"></i>
                    Ng??n H??ng:
                </div>
                <div id="info-name" class="scammer-info__name">
                    ${item.bank}
                </div>
            </div>
            <div class="scammer-info__item scammer-info__item-img">
                <div class="scammer-info__title">
                    <i class="fas fa-image"></i>
                    ???nh Ch???p B???ng Ch???ng:
                </div>
                <img src="${item.image}" alt="" class="scammer-info__img">
            </div>
            <div class="scammer-info__item scammer-info__item-desc">
                <div class="scammer-info__title">
                    <i class="fas fa-edit"></i>
                    H??nh Th???c L???a ?????o:
                </div>
                <div class="scammer-info__name">
                    ${item.content}
                </div>
            </div>
            <div class="scammer-author">
                <div class="scammer-author__heading">Ng?????i T??? C??o:</div>
                <div class="scammer-author__info">
                    <div class="scammer-author__info-item">
                        <div class="scammer-info__title">H??? V?? T??n:</div>
                        <div id="info-name" class="scammer-info__name">${item.authorName}</div>
                    </div>
                    <div class="scammer-author__info-item">
                        <div class="scammer-info__title">Li??n H???:</div>
                        <div id="info-name" class="scammer-info__name">${item.authorPhone}</div>
                    </div>
                    <div class="scammer-author__info-item">
                        <div class="scammer-info__title">Tr???ng th??i:</div>
                        <div id="info-name" class="scammer-info__name">${item.option}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
    scammerList.insertAdjacentHTML('afterbegin', template)
}

async function getScammerList(link = scammerApi) {
    loader.classList.add('active')
    const res = await fetch(link)
    const data = await res.json()
    scammerList.innerHTML = ''
    if (data.length > 0 && Array.isArray(data)) {
        data.forEach(item => {
            renderItem(item)
        })
    }
    loader.classList.remove('active')

}

function getUrlImage(urlImage) {
    const template = `
    <div class="overlay">
        <img src="${urlImage}" alt="">
    </div>
    `
    document.body.insertAdjacentHTML('beforeend', template)
}

// Event
scammerList.addEventListener('click', (e) => {
    if (e.target.matches('.scammer-header')) {
        const scammerInfo = e.target.nextElementSibling
        scammerInfo.style.height = `${scammerInfo.scrollHeight}px`
        scammerInfo.classList.toggle('active')
        if (!scammerInfo.classList.contains('active')) {
            scammerInfo.style.height = `0px`
        }
    } else if (e.target.matches('.scammer-info__img')) {
        const urlImage = e.target.getAttribute('src')
        getUrlImage(urlImage)
    }
})

document.body.addEventListener('click', (e) => {
    if (e.target.matches('.overlay')) {
        e.target.parentNode.removeChild(e.target)
    }
})


// Modal

const tempModal = `
    <div class="modal">
        <div class="modal-container">
        <i class="modal-close far fa-times-circle"></i>
        <div class="modal-content">
            <h2>
                <i class="fas fa-tools"></i>
                C???P NH???T
                <p>26-01-2022</p>
            </h2>
            <p>
                <i class="fas fa-circle"></i>
                ???? fix l???i t??nh n??ng <span class="primary-color">validate</span> c???a trang <a href="./page/report-scam.html" class="modal-link">G???i t??? c??o</a>
            </p>
            <h3>
                Thanks AE trong group ???? v??o test web v?? cho g??p ??
            </h3>
            <h3>????????????</h3>
            <br>
            <h3 class="primary-color"> - Th??i Thi???n -</h3>
        </div>
        </div>
    </div>
   <img class="hpny" src="./assets/images/tiger.png" alt="">

`

setTimeout(() => {
    document.body.insertAdjacentHTML('beforeend', tempModal)
}, 2000)

setTimeout(() => {
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('.modal')) {
            e.target.parentNode.removeChild(e.target)
        } else if (e.target.matches('.modal-close')) {
            const modal = document.querySelector('.modal')
            if (modal) {
                modal.parentNode.removeChild(modal)
            }
        }
    })
}, 2500)