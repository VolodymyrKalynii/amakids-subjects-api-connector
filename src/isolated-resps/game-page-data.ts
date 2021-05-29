import {GamePageResp} from '../res-types';

export const gamePageDataIsolatedResp:Promise<GamePageResp> = new Promise((resolve) =>
    setTimeout(() => resolve({
        homework: {
            gameSettings: {
                section: 'mathematics',
                game: 'brain-crush',
                settings: {
                    level: '1',
                    exampleQty: '4',
                    countRange: '10',
                    actionType: 'addition'
                },
                levels: '2'
            },
            id: 2,
            homeworkProgress: {
                canStartNewRound: false,
                currentRoundFinished: false,
                hometaskDone: false,
                levelNow: 2,
                levelsDone: 1,
                levelsToDo: 2,
                roundNow: 1,
                roundsDone: 0,
                roundsToDo: 4,
                stageNow: 1,
                stagesDone: 0,
                stagesToDo: 3
            }
        }
    }), 100)
);