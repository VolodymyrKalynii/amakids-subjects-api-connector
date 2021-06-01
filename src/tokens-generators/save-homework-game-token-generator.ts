import md5 = require("md5");

import {SaveGameFormDataT} from '../res-types';
import {apiConfig} from '../config';

export const generateTokenForHomeworkGameSaving = (p:SaveGameFormDataT) => {
    const {gameData, hometaskId} = p;
    const {userId} = gameData;

    const mixedItems = apiConfig.APP_CODE.toString().length
        + userId.toString()
        + apiConfig.APP_CODE
        + hometaskId
        + userId.toString().length
        + hometaskId.toString().length;

    return md5(mixedItems);
};