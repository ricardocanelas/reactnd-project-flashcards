export function uuid(letterLength = 2) {
    return new Date().valueOf() + Math.random().toString(36).substr(2, letterLength);
}

export function datetimeNow() {
    const now = new Date();

    let year    = now.getFullYear();
    let month   = now.getMonth()+1;
    let day     = now.getDate();
    let hour    = now.getHours();
    let minute  = now.getMinutes();
    let second  = now.getSeconds();

    if(month.toString().length == 1)  month = '0'+month;
    if(day.toString().length == 1)    day = '0'+day;
    if(hour.toString().length == 1)   hour = '0'+hour;
    if(minute.toString().length == 1) minute = '0'+minute;
    if(second.toString().length == 1) second = '0'+second;

    return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
}

export function createDeckStructure (obj = {}) {
    return {
        id: 'deck' + uuid(),
        label: '',
        created_at: datetimeNow(),
        last_score: null,
        last_score_at: null,
        scores: [],
        cards: {},
        ...obj,
    }
}

export function createCardStructure (obj = {}) {
    return {
        id: 'card' + uuid(),
        question: '',
        answer: '',
        created_at: datetimeNow(),
        ...obj,
    }
}

export default {
    uuid,
    datetimeNow,
    createDeckStructure,
    createCardStructure,
}