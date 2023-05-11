const helper = require('../helper.js');
const KontaktDao = require('../dao/kontaktDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Kontakt');


serviceRouter.get('/kontakt/gib/:id', function(request, response) {
    console.log('Service Kontakt: Client requested one record, id=' + request.params.id);

    const kontaktDao = new KontaktDao(request.app.locals.dbConnection);
    try {
        var obj = kontaktDao.loadById(request.params.id);
        console.log('Service Kontakt: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Kontakt: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/kontakt/alle', function(request, response) {
    console.log('Service Kontakt: Client requested all records');

    const kontaktDao = new KontaktDao(request.app.locals.dbConnection);
    try {
        var arr = kontaktDao.loadAll();
        console.log('Service Kontakt: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Kontakt: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/kontakt/existiert/:id', function(request, response) {
    console.log('Service Kontakt: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const kontaktDao = new KontaktDao(request.app.locals.dbConnection);
    try {
        var exists = kontaktDao.exists(request.params.id);
        console.log('Service Kontakt: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Kontakt: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});


serviceRouter.post('/kontakt', function(request, response) {
    console.log('Service Kontakt: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.email)) 
        errorMsgs.push('E-Mail fehlt');
    if (helper.isUndefined(request.body.ueberschrift)) 
        errorMsgs.push('Überschrift fehlt');
    if (helper.isUndefined(request.body.anliegen)) 
        errorMsgs.push('Anliegen anliegen');    
    

    
    if (errorMsgs.length > 0) {
        console.log('Service Kontakt: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const kontaktDao = new KontaktDao(request.app.locals.dbConnection);
    try {
        var obj = kontaktDao.create(request.body.email, request.body.ueberschrift, request.body.anliegen);
        console.log('Service Kontakt: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Kontakt: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/kontakt', function(request, response) {
    console.log('Service Kontakt: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.email)) 
        errorMsgs.push('email fehlt');
    if (helper.isUndefined(request.body.ueberschrift)) 
        errorMsgs.push('ueberschrift fehlt');
    if (helper.isUndefined(request.body.anliegen)) 
        errorMsgs.push('anliegen fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Kontakt: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const kontaktDao = new KontaktDao(request.app.locals.dbConnection);
    try {
        var obj = kontaktDao.update(request.body.id, request.body.email, request.body.ueberschrift, request.body.anliegen);
        console.log('Service Kontakt: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Kontakt: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/kontakt/:id', function(request, response) {
    console.log('Service Kontakt: Client requested deletion of record, id=' + request.params.id);

    const kontaktDao = new KontaktDao(request.app.locals.dbConnection);
    try {
        var obj = kontaktDao.loadById(request.params.id);
        kontaktDao.delete(request.params.id);
        console.log('Service Kontakt: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Kontakt: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
