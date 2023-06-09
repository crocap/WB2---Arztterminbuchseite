const helper = require('../helper.js');
const TermineDao = require('../dao/termineDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Termine');

serviceRouter.get('/termine/gib/:id', function(request, response) {
    console.log('Service Termine: Client requested one record, id=' + request.params.id);

    const termineDao = new TermineDao(request.app.locals.dbConnection);
    try {
        var obj = termineDao.loadById(request.params.id);
        console.log('Service Termine: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Termine: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/termine/alle', function(request, response) {
    console.log('Service Termine: Client requested all records');

    const termineDao = new TermineDao(request.app.locals.dbConnection);
    try {
        var arr = termineDao.loadAll();
        console.log('Service Termine: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Termine: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/termine/gib/arztunddatum/:arzt/:datum', function(request, response) {
    console.log('Service Termine: Client requested all records with arzt=' + request.params.arzt + ' and datum=' + request.params.datum);

    const termineDao = new TermineDao(request.app.locals.dbConnection);
    try {
        var obj = termineDao.loadByArztAndDatum(request.params.arzt, request.params.datum);
        console.log('Service Termine: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Termine: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});


serviceRouter.post('/termine', function(request, response) {
    console.log('Service Termine: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.datum)) 
        errorMsgs.push('datum fehlt');
    if (helper.isUndefined(request.body.fk_arzt)) 
        errorMsgs.push('fk_arzt fehlt');
    if (helper.isUndefined(request.body.uhrzeit)) 
        errorMsgs.push('uhrzeit fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Termine: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const termineDao = new TermineDao(request.app.locals.dbConnection);
    try {
        var obj = termineDao.create(request.body.fk_arzt, request.body.datum, request.body.uhrzeit);
        console.log('Service Termine: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Termine: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/termine/:id', function(request, response) {
    console.log('Service Termine: Client requested deletion of record, id=' + request.params.id);

    const termineDao = new TermineDao(request.app.locals.dbConnection);
    try {
        var obj = termineDao.loadById(request.params.id);
        termineDao.delete(request.params.id);
        console.log('Service Termine: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Termine: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/termine/existiert/:id', function(request, response) {
    console.log('Service Termine: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const termineDao = new TermineDao(request.app.locals.dbConnection);
    try {
        var exists = termineDao.exists(request.params.id);
        console.log('Service Termine: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Termine: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});


serviceRouter.put('/termine', function(request, response) {
    console.log('Service Termine: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.fk_arzt)) 
        errorMsgs.push('fk_arzt fehlt');
    if (helper.isUndefined(request.body.datum)) 
        errorMsgs.push('datum fehlt');
    if (helper.isUndefined(request.body.uhrzeit)) 
        errorMsgs.push('uhrzeit fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Termine: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const termineDao = new TermineDao(request.app.locals.dbConnection);
    try {
        var obj = termineDao.update(request.body.id, request.body.fk_arzt, request.body.datum, request.body.uhrzeit);
        console.log('Service Termine: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Termine: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

module.exports = serviceRouter;