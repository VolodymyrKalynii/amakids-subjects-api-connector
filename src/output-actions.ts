export const outputActions = {
    redirectToHomeworkPage: (homeworkPath) => setTimeout(() => {if (homeworkPath) document.location.href = homeworkPath;}, 1000)
};