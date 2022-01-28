const scammerApi = 'https://61e8b8af7ced4a00172ff662.mockapi.io/api/listscammer'
const formPost = document.querySelector('.form-post')
const btnSubmit = document.querySelector('.btn-submit')
const loader = document.querySelector('.loader')

// Toast
function showSuccessToast() {
    toast({
        title: "Thành công!",
        message: "Dữ liệu đã được post lên. Vui lòng về lại trang chủ để xem",
        type: "success",
        duration: 3000
    });
}

Validator({
    form: '.form-post',
    formGroupSelector: '.form-item',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#accountHolder', 'Vui lòng nhập tên chủ tài khoản'),
        Validator.minLength('#accountHolder', 6),
        Validator.isRequired('#accountNumber', 'Vui lòng nhập STK '),
        Validator.minLength('#accountNumber', 10),
        Validator.isRequired('#bank', 'Vui lòng nhập tên ngân hàng'),
        Validator.minLength('#bank', 3),
        Validator.isRequired('#content', 'Vui lòng nhập nội dung tố cáo'),
        Validator.isRequired('#authorName', 'Vui lòng nhập tên của bạn'),
        Validator.minLength('#authorName', 6),
        Validator.isRequired('#authorPhone', 'Vui lòng nhập SĐT của bạn'),
        Validator.minLength('#authorPhone', 10),
    ],
    onSubmit: async function({accountHolder, phoneNumber, accountNumber, bank, image, content, option, authorName, authorPhone}) {
        btnSubmit.classList.add("is-loading");
        await fetch(scammerApi, {
            method: 'POST',
            body: JSON.stringify({
                accountHolder,
                phoneNumber,
                accountNumber,
                bank,
                image,
                content,
                option,
                authorName,
                authorPhone,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        btnSubmit.classList.remove("is-loading");
        showSuccessToast()
    }
});