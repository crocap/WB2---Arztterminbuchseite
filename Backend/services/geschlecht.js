const helper = require('../helper.js');
const GeschlechtDao = require('../dao/geschlechtDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Geschlecht');

serviceRouter.get('/geschlecht/gib/:id', function(request, response) {
    console.log('Service Geschlecht: Client requested one record, id=' + request.params.id);

    const geschlechtDao = new GeschlechtDao(request.app.locals.dbConnection);
    try {
        var obj = geschlechtDao.loadById(request.params.id);
        console.log('Service Geschlecht: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Geschlecht: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

/*
serviceRouter.get('/Geschlecht/alle', function(request, response) {
    console.log('Service Geschlecht: Client requested all records');

    const geschlechtDao = new geschlechtDao(request.app.locals.dbConnection);
    try {
        var arr = geschlechtDao.loadAll();
        console.log('Service Geschlecht: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Geschlecht: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});


serviceRouter.get('/Geschlecht/existiert/:id', function(request, response) {
    console.log('Service Geschlecht: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const geschlechtDao = new geschlechtDao(request.app.locals.dbConnection);
    try {
        var exists = geschlechtDao.exists(request.params.id);
        console.log('Service Geschlecht: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Geschlecht: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/Geschlecht', function(request, response) {
    console.log('Service Geschlecht: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Geschlecht: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const geschlechtDao = new geschlechtDao(request.app.locals.dbConnection);
    try {
        var obj = geschlechtDao.create(request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Geschlecht: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Geschlecht: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/Geschlecht', function(request, response) {
    console.log('Service Geschlecht: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Geschlecht: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const geschlechtDao = new geschlechtDao(request.app.locals.dbConnection);
    try {
        var obj = geschlechtDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Geschlecht: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Geschlecht: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/Geschlecht/:id', function(request, response) {
    console.log('Service Geschlecht: Client requested deletion of record, id=' + request.params.id);

    const geschlechtDao = new geschlechtDao(request.app.locals.dbConnection);
    try {
        var obj = geschlechtDao.loadById(request.params.id);
        geschlechtDao.delete(request.params.id);
        console.log('Service Geschlecht: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Geschlecht: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});
*/

module.exports = serviceRouter;
