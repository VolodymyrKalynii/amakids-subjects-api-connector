import md5 from 'md5';
import {SaveGameFormDataT} from '../res-types';

export const generateTokenForGameSaving = ({gameData}:Omit<SaveGameFormDataT, 'hometaskId'>) => {
    const {gameName, userId, gameFinishDate, gameResult: {success}} = gameData;
    const gameNameLength = gameName.length.toString();

    const mixedItems = gameNameLength
        + userId
        + (success ? 1 : 0)
        + gameFinishDate;

    return md5(mixedItems);
};