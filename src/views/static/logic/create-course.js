const form = document.getElementsByName('form-layout')[0];
const title = document.getElementsByName('title')[0];
const description = document.getElementsByName('description')[0];
const imageUrl = document.getElementsByName('imageUrl')[0];
const isPublic = document.getElementsByName('isPublic')[0];
const submit = document.querySelector('.btn');
const successBox = document.getElementById('successBox');
const loadingBox = document.getElementById('loadingBox');
const errorBox = document.getElementById('errorBox');
const id = document.getElementsByName('userId')[0];
let timeout;

submit.addEventListener('click', async (e) => {
    e.preventDefault();
    let isTrue = false;
    if (isPublic.value === 'on') isTrue = true;
    const formData = {
        title: title.value,
        description: description.value,
        imageUrl: imageUrl.value,
        isPublic: isTrue,
        createdBy: id.value,
    };
    try {
        const result = await axios.post('/api/v1/courses', formData);
        const { data } = result;
        alertMessage(loadingBox, 'loading-message', 'Loading');
        if (data.status === 'Success') {
            clearTimeOut(timeout);
            timeout = alertMessage(successBox, 'success-message', data.message);
            window.location.replace(`/home`);
        } else {
            clearTimeOut(timeout);
            timeout = alertMessage(errorBox, 'error-message', data.message);
        }
    } catch (error) {
        clearTimeOut(timeout);
        alertMessage(errorBox, 'error-message', 'Error creating course');
    }
});

const alertMessage = (element, messageClass, message) => {
    element.classList.toggle('visible');
    const innerMessage = document.querySelector(`.${messageClass}`);

    innerMessage.innerHTML = message;
    timeout = setTimeout(() => {
        element.classList.toggle('visible');
    }, 5000);
    clearMessage(innerMessage.innerHTML);
    return timeout;
};
const clearMessage = (element) => {
    element = '';
};
const clearTimeOut = (time) => {
    clearTimeout(time);
};

const fetchData = (username, password) => {
    return {
        username: username,
        password: password,
    };
};
