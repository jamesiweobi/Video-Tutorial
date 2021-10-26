const form = document.getElementsByName('form-layout')[0];
const username = document.getElementsByName('username')[0];
const password = document.getElementsByName('password')[0];
const submit = document.querySelector('.btn');
let timeout;

submit.addEventListener('click', async (e) => {
    e.preventDefault();
    const formData = {
        username: username.value,
        password: password.value,
    };
    try {
        const result = await axios.post('/api/v1/users/login', formData);
        const { data } = result;
        timeout = alertMessage(loadingBox, 'loading-message', 'Loading');
        if (data.status === 'Success') {
            clearTimeOut(timeout);
            timeout = alertMessage(successBox, 'success-message', data.message);
            window.location.replace(`/${data.user._id}`);
        } else {
            clearTimeOut(timeout);
            timeout = alertMessage(errorBox, 'error-message', data.message);
        }
    } catch (error) {
        clearTimeOut(timeout);
        alertMessage(
            errorBox,
            'error-message',
            'Incorrect Username or Password!'
        );
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

const successBox = document.getElementById('successBox');
const loadingBox = document.getElementById('loadingBox');
const errorBox = document.getElementById('errorBox');
const deleteCourse = async (id, userId) => {
    try {
        await axios.delete(`/api/v1/courses/${id}`);
        window.location.replace(`/home/${userId}`);
    } catch (err) {
        console.log(err);
    }
};
const enrollCourse = async (userId, courseId) => {
    try {
        const result = await axios.put(`/api/v1/courses/enroll`, {
            userId: userId,
            courseId: courseId,
        });
        alertMessage(successBox, 'success-message', 'Enrolled');
        location.reload();
    } catch (err) {
        console.log(err);
    }
};
const alertMessage = (element, messageClass, message) => {
    element.classList.toggle('visible');
    const innerMessage = document.querySelector(`.${messageClass}`);
    innerMessage.innerHTML = message;
    timeout = setTimeout(() => {
        element.classList.toggle('visible');
    }, 5000);
    return timeout;
};
