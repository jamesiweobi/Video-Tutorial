const successBox = document.getElementById('successBox');
const loadingBox = document.getElementById('loadingBox');
const errorBox = document.getElementById('errorBox');
const deleteCourse = async (id, userId) => {
    try {
        await axios.delete(`/api/v1/courses/${id}`);
        window.location.replace(`/create-course/${userId}`);
    } catch (err) {
        console.log(err);
    }
};

const enrollCourse = async (userId, courseId) => {
    try {
        await axios.put(`/api/v1/courses/enroll`, {
            userid: userId,
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
