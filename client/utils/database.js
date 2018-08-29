import { database } from "./firebase";


const dbRefs = {};

export function buildDbRefs(userId) {
    // Todos Ref
    dbRefs['todosRef'] = database.ref('users/'+userId+'/todos');
}

export function getDbRef(refName) {
    return dbRefs[refName];
}

export function destroyDbRefs() {
    const refs = Object.getOwnPropertyNames(dbRefs);

    refs.forEach((ref) => {
        if ( dbRefs[ref].hasOwnProperty('off') )
            // Turn of change listener
            dbRefs[ref].off('value');

        delete dbRefs[ref];
    });
}

export default database
