const helper = require('../helper.js');
const SchwerpunktDao = require('../dao/schwerpunktDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Schwerpunkt');

serviceRouter.get('/schwerpunkt/gib/:id', function(request, response) {
    console.log('Service Schwerpunkt: Client requested one record, id=' + request.params.id);

    const schwerpunktDao = new SchwerpunktDao(request.app.locals.dbConnection);
    try {
        var obj = schwerpunktDao.loadById(request.params.id);
        console.log('Service Schwerpunkt: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Schwerpunkt: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/schwerpunkt/alle', function(request, response) {
    console.log('Service Schwerpunkt: Client requested all records');

    const schwerpunktDao = new SchwerpunktDao(request.app.locals.dbConnection);
    try {
        var arr = schwerpunktDao.loadAll();
        console.log('Service Schwerpunkt: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Schwerpunkt: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/schwerpunkt/existiert/:id', function(request, response) {
    console.log('Service Schwerpunkt: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const schwerpunktDao = new SchwerpunktDao(request.app.locals.dbConnection);
    try {
        var exists = schwerpunktDao.exists(request.params.id);
        console.log('Service Schwerpunkt: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Schwerpunkt: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/schwerpunkt', function(request, response) {
    console.log('Service Schwerpunkt: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.Beschreibung)) 
        errorMsgs.push('Beschreibung fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Schwerpunkt: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const schwerpunktDao = new SchwerpunktDao(request.app.locals.dbConnection);
    try {
        var obj = schwerpunktDao.create(request.body.Beschreibung);
        console.log('Service Schwerpunkt: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Schwerpunkt: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/schwerpunkt', function(request, response) {
    console.log('Service Schwerpunkt: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.Beschreibung)) 
        errorMsgs.push('Beschreibung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Schwerpunkt: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const schwerpunktDao = new SchwerpunktDao(request.app.locals.dbConnection);
    try {
        var obj = schwerpunktDao.update(request.body.id, request.body.Beschreibung);
        console.log('Service Schwerpunkt: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Schwerpunkt: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/schwerpunkt/:id', function(request, response) {
    console.log('Service Schwerpunkt: Client requested deletion of record, id=' + request.params.id);

    const schwerpunktDao = new SchwerpunktDao(request.app.locals.dbConnection);
    try {
        var obj = schwerpunktDao.loadById(request.params.id);
        schwerpunktDao.delete(request.params.id);
        console.log('Service Schwerpunkt: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Schwerpunkt: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;