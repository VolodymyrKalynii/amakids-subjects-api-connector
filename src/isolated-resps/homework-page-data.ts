import {HomeworkDataResp} from '../res-types';

export const homeworkPageDataIsolatedResp:Promise<HomeworkDataResp> = new Promise((resolve) => {
    setTimeout(() => {
        resolve({
            homeworkData: {
                hasAccess: true,
                hometaskID: 123,
                task: {
                    rounds: 4,
                    comment: 'asd',
                    stages: {
                        1: {
                            game: 'bright-numbers',
                            levels: '5',
                            settings: {
                                level: '1',
                                picture: '1',
                                countRange: '9',
                            },
                            section: 'mathematics'
                        },
                        // 2: {
                        //     game: 'number-composition',
                        //     settings: {
                        //         level: 1,
                        //         exampleQty: 4,
                        //         countRange: 3,
                        //     },
                        //     levels: 5,
                        //     section: 'mathematics'
                        // },
                        // 3: {
                        //     game: 'order',
                        //     settings: {
                        //         level: 1,
                        //         exampleQty: 4,
                        //         countRange: 3,
                        //         numbersInRow: 3,
                        //         direction: 1,
                        //     },
                        //     levels: 5,
                        //     section: 'mathematics'
                        // },
                        // 4: {
                        //     game: 'cobweb',
                        //     settings: {
                        //         level: 1,
                        //         fieldsInRow: 3,
                        //         direction: 1,
                        //         exampleQty: 4,
                        //     },
                        //     levels: 5,
                        //     section: 'mathematics'
                        // },
                        // 5: {
                        //     game: 'pirate-cipher',
                        //     settings: {
                        //         level: 1,
                        //         gameFieldSize: 3,
                        //         exampleQty: 4,
                        //     },
                        //     levels: 5,
                        //     section: 'mathematics'
                        // }
                    }
                },
                progress: {
                    roundsToDo: 1,
                    roundsDone: 1,
                    roundNow: 1,
                    stagesToDo: 1,
                    stagesDone: 1,
                    stageNow: 1,
                    levelsToDo: 1,
                    levelsDone: 1,
                    levelNow: 1,
                    canStartNewRound: false,
                    hometaskDone: false,
                    currentRoundFinished: false,
                },
                cartoonData: {
                    needShow: true
                }
            },
            hasAccessToPage: true,
            subjectID: 11,
            common: null
        });
    }, 2000);
});