//! HTML'den gelen elemanlar
const nameInput = document.getElementById('name-input');
const priceInput = document.getElementById('price-input');
const addBtn = document.querySelector('#add-btn');
const listArea = document.getElementById('list');
const statusCheckbox = document.getElementById('status-check');
const sumInfo = document.getElementById('sum-info');
const deleteBtn = document.getElementById('delete');
const userInput = document.getElementById('user-input');
const select = document.querySelector('select');

//! izledeğimiz olaylar
addBtn.addEventListener('click', addExpense);
listArea.addEventListener('click', handleUpdate);
userInput.addEventListener('input', saveUser);
document.addEventListener('DOMContentLoaded', getUser);
select.addEventListener('change', handleFilter);

// toplamın değerni burada tutucaz
let sum = 0;

function updateSum(price) {
    // js'deki toplam depğerini günceller
    sum += Number(price);

    //htmldeki toplam bilgi alanını güncelleme
    sumInfo.innerText = sum;
}

// eventLİstener ile çalıştırılan fonksiyonlara
// olay hakkında bilgileri içeren bir parametre gider
function addExpense(event) {
    // sayfayı yenilemesini engelleme
    event.preventDefault();

    //! 1- inputların biri bile boş ise: alert ver ve  fonksiyonu durdur
    if (!nameInput.value || !priceInput.value) {
        alert('Lütfen formu doldurunuz..');
        return;
    }

    //! 2- inputlar doluysa bir kart oluştur ve html'e gönder
    //a- div oluşturma
    const expenseDiv = document.createElement('div');

    //b- dive class ekleme
    expenseDiv.classList.add('expense');

    //eğerki ödendi checbox'ına tıklandıysa ödendi class'ı ekle
    if (statusCheckbox.checked === true) {
        expenseDiv.classList.add('payed');
    }

    //c- içeresinde HTML'i belirleme
    expenseDiv.innerHTML = `
          <h2 class="name">${nameInput.value}</h2>
          <h2 class="price">${priceInput.value}</h2>
          <div class="btns">
            <img id="edit" src="/images/pay-icon.png" />
            <img id="delete" src="/images/delete-icon.png" />
          </div>
  `;

    //d- oluşan elemanı html'e gönderme
    listArea.appendChild(expenseDiv);

    // toplam alanını güncelleme
    updateSum(priceInput.value);

    // formu temzileme
    nameInput.value = '';
    priceInput.value = '';
    statusCheckbox.checked = false;

    console.log(listArea);
}

// listedeki bir elemana tıklayınca çlışır
function handleUpdate(event) {
    // tıklanılan elemana erişme
    const ele = event.target;
    // silme resminin kapasayıcısına eişme
    const parent = ele.parentElement.parentElement;

    // yalnızca silme resmine tıklanınca çalışacak kod
    if (ele.id === 'delete') {
        // elementi silme
        parent.remove();

        // toplam bilgisini güncelleme
        const price = parent.querySelector('.price').textContent;
        updateSum(Number(price) * -1);
    }

    // tıklanılılan elemanın id'si edit ise harcamanın  payed classı varsa çıkar yoksa ekle
    if (ele.id === 'edit') {
        parent.classList.toggle('payed');
    }
}

// kullanıcıyı local'a kaydetme
function saveUser(event) {
    localStorage.setItem('username', event.target.value);
}

// kullanıcı local'de varsa onu alma
function getUser() {
    // local'edn ismi al | isim yoksa null yerine "" olsun
    const username = localStorage.getItem('username') || '';

    // kullanıcı ismini inputa aktar
    userInput.value = username;
}

// filtreleme kısmı
function handleFilter(event) {
    const selected = event.target.value;
    const items = list.childNodes;

    // bütün elemanları dönme
    items.forEach((item) => {
        // selecetd alabilceği değerleri izleme
        switch (selected) {
            case 'all':
                // hepsini göster
                item.style.display = 'flex';
                break;

            case 'payed':
                //  elema payed class'ına sahipse onu göster değilse gizle
                if (item.classList.contains('payed')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
                break;

            case 'not-payed':
                //  elema payed class'ına sahip değilse onu göster değilse gizle
                if (!item.classList.contains('payed')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
                break;
        }
    });
}