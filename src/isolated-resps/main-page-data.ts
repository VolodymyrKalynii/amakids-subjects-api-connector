import {SubjectPageDataResp} from '../res-types';

export const subjectPageDataIsolatedResp:Promise<SubjectPageDataResp> = new Promise((resolve) =>
    setTimeout(() => resolve(
        {
            'common': {
                'documentsToAccepting': [],
                'access': {'status': true},
                'user': {
                    'id': 47048,
                    'name': 'Дима',
                    'status': 'student',
                    'email': 'olga1975.oo@gmail.com',
                    'newsletterSubscription': true
                },
                'availableSubjects': {'1': {'id': 1}, '11': {'id': 11}},
                'settings': {'langCode': 'ru'},
                'company': {'title': 'SmartUm'},
                'country': {'id': '1', 'title': 'Украина', 'currencySign': 'грн.'},
                'course': {'subjectID': 11, 'status': 'process', 'avatarID': 0, 'isIntensive': false},
                'subjectID': 11
            },
            'subjectID': 11,
            'hasHometask': true
        }
    ), 100)
);