export type SubjectPageDataResp = {
    common:{
        documentsToAccepting:Array<string>;
        access:{
            status:boolean;
        };
        user:{
            id:number;
            name:string;
            status:'student'|'teach'|'franch'|'worker'|'boss'|'master';
            email:string;
            newsletterSubscription:boolean;
        };
        availableSubjects:{
            [key:number]:{
                id:number;
            };
        };
        settings:{
            langCode:string;
        };
        company:{
            title:string;
        };
        country:{
            id:string;
            title:string;
            currencySign:string;
        };
        course:{
            subjectID:number;
            status:'process'| 'access_to_platform'|'vacation'|'stopped';
            avatarID:number;
            isIntensive:boolean;
        };
        subjectID:number;
    };
    games?:{
        [key:string]:Array<string>;
    };
    enabledSections?:Array<string>;
    subjectID:number;
    hasHometask:boolean;
    hometaskSection?:string;
};
//#

export type SingleGameDataResp<T = string> = {
    game:string;
    section:T;
    levels:string;
    settings:{
        [key:string]:string|Array<string>;
    };
};

export type HomeworkDataResp<T = string> = {
    common:SubjectPageDataResp['common'];
    subjectID:number;
    hasAccessToPage:boolean,
    homeworkData:{
        hasAccess:boolean;
        hometaskID:number;
        task:{
            stages:{
                [key:number]:SingleGameDataResp<T>;
            };
            rounds:number;
            comment:string;
        },
        progress:{
            roundsToDo:number;
            roundsDone:number;
            roundNow:number;
            stagesToDo:number;
            stagesDone:number;
            stageNow:number;
            levelsToDo:number;
            levelsDone:number;
            levelNow:number;
            canStartNewRound:boolean;
            hometaskDone:boolean,
            currentRoundFinished:boolean;
        },
        cartoonData:{
            needShow:boolean;
            nextEpisodeDate?:string;
            urls?:Array<string>;
        };
    };
};

export type SaveGameFormDataT<T = string> = {
    hometaskId:number;
    gameData:{
        userId:number;
        gameName:string;
        gameFinishDate:string;
        gameSettings:any;
        gameResult:{
            success:boolean;
        };
        section:T;
    };
    subjectID:number;
};

export type SaveHomeworkGameResp = {
    gameResultSaverResponse:boolean;
    homeworkProgress:HomeworkDataResp['homeworkData']['progress'];
    homeworkProgressSaverResponse?:{
        action:'unlocked_new_element' | 'room_done' | 'round_done';
    };
};

export type SaveGameResp = {
    data?:{
        message:string;
    };
};

export type StartNewRoundResp<T> = HomeworkDataResp<T>;

export type GamePageResp = {
    common:SubjectPageDataResp['common'];
    game:string;
    isHomework?:boolean;
    homework?:{
        id:number;
        gameSettings:SingleGameDataResp<any>;
        homeworkProgress?:HomeworkDataResp['homeworkData']['progress'];
    };
};
