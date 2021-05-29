import axios from 'axios';

import {apiConfig} from './config';

import {outputActions} from './output-actions';
import {buildFormData} from './utils';
import {mainPageDataIsolatedResp, homeworkPageDataIsolatedResp, gamePageDataIsolatedResp} from './isolated-resps';
import {
    GamePageResp,
    MetadataResp,
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

    public getMainPageData():Promise<MetadataResp> {
        const data:RequestData = {
            action: this.actions.getMainPageData,
            method: 'get',
        };

        return this.request(data, false, mainPageDataIsolatedResp);
    }

    public getHomeworkPageData<T>():Promise<HomeworkDataResp<T>> {
        const data:RequestData = {
            action: this.actions.getHomeworkPageData,
            method: 'get',
        };

        return this.request(data, false, homeworkPageDataIsolatedResp);
    }

    public getGamePageData(isHomework:boolean, game:string):Promise<GamePageResp> {
        const data:RequestData = {
            action: this.actions.getGamePageData,
            method: 'get',
            params: {
                isHomework: isHomework ? 1 : 0,
                game
            }
        };

        return this.request(data, false, gamePageDataIsolatedResp);
    }

    public saveGame(p:Omit<SaveGameFormDataT, 'hometaskId'>):Promise<SaveGameResp> {
        const token = generateTokenForGameSaving(p);

        const data:RequestData = {
            action: this.actions.saveGame,
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
            action: this.actions.saveHomeworkGame,
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
            action: this.actions.startNewRound,
            method: 'get',
            params: {
                ...p
            }
        };

        return this.request(data, false, {});
    }

    //---------------

    private readonly actions = {
        getHomeworkPageData: 'student_interface_homework_page',
        getMainPageData: 'student_interface_subject_page',
        saveGame: 'student_interface_save_game_action',
        startNewRound: 'student_interface_start_new_round_action',
        saveHomeworkGame: 'student_interface_save_homework_progress',
        getGamePageData: 'student_interface_game_page'
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