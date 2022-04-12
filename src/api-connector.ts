import axios from 'axios';

import {apiConfig} from './config';

import {outputActions} from './output-actions';
import {buildFormData} from './utils';
import {subjectPageDataIsolatedResp} from './isolated-resps';
import {
    GamePageResp,
    SubjectPageDataResp,
    SaveGameFormDataT,
    SaveGameResp,
    HomeworkDataResp,
    SaveHomeworkGameResp, StartNewRoundResp
} from './res-types';
import {generateTokenForGameSaving, generateTokenForHomeworkGameSaving} from './tokens-generators';

export type RequestData = {
    action:string;
    method?:'get' | 'post';
    params?:{} // get params
    dataParams?:{};//post params
};

type P = {
    isIsolated:boolean;
    apiHost:string;
    homeworkPath:string;
    moveToRoot:() => void;
    openNotificationWithIcon:(props) => void;
};

export class ApiConnector {
    private static instance:ApiConnector;
    private readonly moveToRoot:() => void;
    private readonly openNotificationWithIcon:(props) => void;
    private readonly apiHost:string;
    private readonly homeworkPath:string;
    private readonly isIsolated:boolean;

    public static getInstance(p:P):ApiConnector {
        if (!ApiConnector.instance) {
            ApiConnector.instance = new ApiConnector(p);
        }

        return ApiConnector.instance;
    }

    public getSubjectPageData(subjectID?:number, isolatedResp?:SubjectPageDataResp):Promise<SubjectPageDataResp> {
        const data:RequestData = {
            action: this.ACTIONS.GET_SUBJECT_PAGE_DATA,
            method: 'get',
            params: {
                subjectID
            }
        };

        return this.request(
            data,
            false,
            isolatedResp
                ? isolatedResp
                : subjectPageDataIsolatedResp);
    }

    public getHomeworkPageData<T>(isolatedResp:HomeworkDataResp<T>, subjectID?:number):Promise<HomeworkDataResp<T>> {
        const data:RequestData = {
            action: this.ACTIONS.GET_HOMEWORK_PAGE_DATA,
            method: 'get',
            params: {
                subjectID
            }
        };

        return this.request(data, false, isolatedResp);
    }

    public getGamePageData(isHomework:boolean, game:string, isolatedResp:GamePageResp, subjectID?:number):Promise<GamePageResp> {
        const data:RequestData = {
            action: this.ACTIONS.GET_GAME_PAGE_DATA,
            method: 'get',
            params: {
                isHomework: isHomework ? 1 : 0,
                game,
                subjectID
            }
        };

        return this.request(data, false, isolatedResp);
    }

    public saveGame(p:Omit<SaveGameFormDataT, 'hometaskId'>):Promise<SaveGameResp> {
        const token = generateTokenForGameSaving(p);

        const data:RequestData = {
            action: this.ACTIONS.SAVE_GAME,
            method: 'get',
            params: {
                token,
                ...p
            }
        };

        return this.request(data, false, {});
    }

    public saveHomeworkGame(p:SaveGameFormDataT):Promise<SaveHomeworkGameResp> {
        const token = generateTokenForHomeworkGameSaving(p);

        const data:RequestData = {
            action: this.ACTIONS.SAVE_HOMEWORK_GAME,
            method: 'get',
            params: {
                token,
                ...p
            }
        };

        return this.request(data, false, {});
    }

    public startNewRound<T>(p:{ subjectID:number; userID:number; }):Promise<StartNewRoundResp<T>> {
        const data:RequestData = {
            action: this.ACTIONS.START_NEW_ROUND,
            method: 'get',
            params: {
                ...p
            }
        };

        return this.request(data, false, {});
    }

    //---------------

    private readonly ACTIONS = {
        GET_HOMEWORK_PAGE_DATA: 'student_interface_homework_page',
        GET_SUBJECT_PAGE_DATA: 'student_interface_subject_page',
        SAVE_GAME: 'student_interface_save_game_action',
        START_NEW_ROUND: 'student_interface_start_new_round_action',
        SAVE_HOMEWORK_GAME: 'student_interface_save_homework_progress',
        GET_GAME_PAGE_DATA: 'student_interface_game_page'
    };

    private constructor({isIsolated, apiHost, homeworkPath, moveToRoot, openNotificationWithIcon}:P) {
        this.moveToRoot = moveToRoot;
        this.openNotificationWithIcon = openNotificationWithIcon;
        this.apiHost = apiHost;
        this.isIsolated = isIsolated;
        this.homeworkPath = homeworkPath;
    }

    private async request(data:RequestData, noReloadIfStatusFalse = false, isolatedResp) {
        if (this.isIsolated) {
            return await isolatedResp;
        }

        const {method = 'get', action, params = {}, dataParams: initDataParams} = data;
        const url = this.apiHost + action;
        const dataParams = method === 'post' ? (initDataParams ? initDataParams : params) : {};

        const formData = new FormData();

        buildFormData(formData, dataParams);

        const requestBody = {
            method: method,
            url: url,
            params: {
                app_code: apiConfig.APP_CODE,
                ...params
            },
            withCredentials: true,
            data: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const serverResponse = await axios(requestBody);

        const resData = await serverResponse.data;

        const {status, data: outputData} = resData;

        if (status) {
            return outputData;
        }

        const {message, action: outputAction} = outputData;

        if (message) {
            this.openNotificationWithIcon({type: 'warning', msg: message});

            if (outputAction) {
                const resolver = outputActions[outputAction];

                if (typeof resolver === 'function') {
                    resolver(this.homeworkPath);
                }
            } else {
                if (!noReloadIfStatusFalse) {
                    setTimeout(() => {
                        this.moveToRoot();
                    }, 2000);
                }
            }
        } else {
            this.moveToRoot();
        }

        return null;
    }
}