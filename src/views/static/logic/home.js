const form = document.getElementsByName('form')[0];
const searchText = document.getElementsByName('searchText')[0];
const searchDiv = document.getElementsByName('searchDiv')[0];
const submit = document.getElementsByName('submit')[0];
const id = document.getElementsByName('userId')[0];
const successBox = document.getElementById('successBox');
const loadingBox = document.getElementById('loadingBox');
const errorBox = document.getElementById('errorBox');

submit.addEventListener('click', async (e) => {
    e.preventDefault();
    const { data } = await axios.get('/api/v1/courses');
    const allCourses = [...data.course];
    const courses = [...allCourses];
    while (searchDiv.firstChild) {
        searchDiv.firstChild.remove();
    }
    const searchWord = searchText.value;
    const mapResult = courses.map((course) => {
        return { ...course, title: course.title.toLowerCase() };
    });
    const searchResult = mapResult.filter((course) => {
        if (course.title.includes(searchWord.toLowerCase().trim()))
            return course;
    });

    if (searchResult) {
        const template = searchResult.map((course) => {
            return `<div
                                class='card-deck d-flex justify-content-center'
                            >
                                <div class='card mb-4'>
                                    <img
                                        class='card-img-top'
                                        src=${course.imageUrl}
                                        alt='Card image cap'
                                        width='400'
                                    />
                                    <div class='card-body'>
                                        <h4 class='card-title'>${capitalizeFirstLetter(
                                            course.title
                                        )}</h4>
                                    </div>
                                    <div class='card-footer'>
                                        <a
                                            href='/course-details/${id.value}/${
                course._id
            }'
                                        ><button
                                                type='button'
                                                class='btn btn-info'
                                            >Details</button></a>
                                        <small
                                            class='float-right'
                                        >${course.createAt}</small>
                                    </div>
                                </div>
                            </div>`;
        });
        searchDiv.innerHTML = template.join(' ');
    }
    if (!searchResult) {
        const template = allCourses.map((course) => {
            return `<div
                                class='card-deck d-flex justify-content-center'
                            >
                                <div class='card mb-4'>
                                    <img
                                        class='card-img-top'
                                        src=${course.imageUrl}
                                        alt='Card image cap'
                                        width='400'
                                    />
                                    <div class='card-body'>
                                        <h4 class='card-title'>${capitalizeFirstLetter(
                                            course.title
                                        )}</h4>
                                    </div>
                                    <div class='card-footer'>
                                        <a
                                            href='/course-details/${id.value}/${
                course._id
            }'
                                        ><button
                                                type='button'
                                                class='btn btn-info'
                                            >Details</button></a>
                                        <small
                                            class='float-right'
                                        >${course.createdAt}</small>
                                    </div>
                                </div>
                            </div>`;
        });
        searchDiv.innerHTML = template.join(' ');
    }
});

function capitalizeFirstLetter(string) {
    const words = string.split(' ');
    return words
        .map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        })
        .join(' ');
}

searchText.addEventListener('change', async () => {
    const { data } = await axios.get('/api/v1/courses');
    const allCourses = [...data.course];
    if (!searchText.value) {
        const template = allCourses.map((course) => {
            return `<div
                                class='card-deck d-flex justify-content-center'
                            >
                                <div class='card mb-4'>
                                    <img
                                        class='card-img-top'
                                        src=${course.imageUrl}
                                        alt='Card image cap'
                                        width='400'
                                    />
                                    <div class='card-body'>
                                        <h4 class='card-title'>${capitalizeFirstLetter(
                                            course.title
                                        )}</h4>
                                    </div>
                                    <div class='card-footer'>
                                        <a
                                            href='/course-details/${id.value}/${
                course.id
            }'
                                        ><button
                                                type='button'
                                                class='btn btn-info'
                                            >Details</button></a>
                                        <small
                                            class='float-right'
                                        >${course.createAt}</small>
                                    </div>
                                </div>
                            </div>`;
        });
        searchDiv.innerHTML = template.join(' ');
    }
});
