export type MetadataResp = {
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
    subjectID:number;
    hasHometask:boolean;
};
//#

export type SingleGameDataResp<T = string> = {
    game:string;
    section:T;
    levels:string;
    settings:{
        [key:string]:string;
    };
};

export type HomeworkDataResp<T = string> = {
    common:MetadataResp['common'];
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
        cartoonData:{needShow:boolean;};
    };
};

export type SaveGameFormDataT = {
    hometaskId:number;
    gameData:{
        userId:number;
        gameName:string;
        gameFinishDate:string;
        gameSettings:any;
        gameResult:{
            success:boolean;
        };
    };
};

export type SaveHomeworkGameResp = {
    gameResultSaverResponse:boolean;
    homeworkProgress:HomeworkDataResp['homeworkData']['progress'];
    homeworkProgressSaverResponse:{
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
    homework?:{
        id:number;
        gameSettings:SingleGameDataResp<any>;
        homeworkProgress?:HomeworkDataResp['homeworkData']['progress'];
    };
};
