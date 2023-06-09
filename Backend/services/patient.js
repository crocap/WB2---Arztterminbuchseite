const helper = require('../helper.js');
const PatientDao = require('../dao/patientDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Patient');

serviceRouter.get('/patient/alle', function(request, response) {
    console.log('Service Patient: Client requested all records');

    const patientDao = new PatientDao(request.app.locals.dbConnection);
    try {
        var arr = patientDao.loadAll();
        console.log('Service Patient: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Patient: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/patient/gib/:id', function(request, response) {
    console.log('Service Patient: Client requested one record, id=' + request.params.id);

    const patientDao = new PatientDao(request.app.locals.dbConnection);
    try {
        var obj = patientDao.loadById(request.params.id);
        console.log('Service Patient: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Patient: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/patient', function(request, response) {
    console.log('Service Patient: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.vorname)) 
        errorMsgs.push('vorname fehlt');
    if (helper.isUndefined(request.body.nachname)) 
        errorMsgs.push('nachname fehlt');
    if (helper.isUndefined(request.body.plz)) 
        errorMsgs.push('plz fehlt');
    if (helper.isUndefined(request.body.strasse)) 
        errorMsgs.push('strasse fehlt');
    if (helper.isUndefined(request.body.email)) 
        errorMsgs.push('email fehlt');
    if (helper.isUndefined(request.body.telefonnummer)) 
        errorMsgs.push('telefonnummer fehlt');
    if (helper.isUndefined(request.body.beschwerde)) 
        errorMsgs.push('beschwerde fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Patient: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const patientDao = new PatientDao(request.app.locals.dbConnection);
    try {
        var obj = patientDao.create(request.body.vorname, request.body.nachname, request.body.plz, request.body.strasse, request.body.email, request.body.telefonnummer, request.body.beschwerde);
        console.log('Service Patient: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Patient: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/patient', function(request, response) {
    console.log('Service Patient: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.vorname)) 
        errorMsgs.push('vorname fehlt');
    if (helper.isUndefined(request.body.nachname)) 
        errorMsgs.push('nachname fehlt');
    if (helper.isUndefined(request.body.plz)) 
        errorMsgs.push('plz fehlt');
    if (helper.isUndefined(request.body.strasse)) 
        errorMsgs.push('strasse fehlt');
    if (helper.isUndefined(request.body.email)) 
        errorMsgs.push('email fehlt');
    if (helper.isUndefined(request.body.telefonnummer)) 
        errorMsgs.push('telefonnummer fehlt');
    if (helper.isUndefined(request.body.beschwerde)) 
        errorMsgs.push('beschwerde fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Patient: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const patientDao = new PatientDao(request.app.locals.dbConnection);
    try {
        var obj = patientDao.update(request.body.vorname, request.body.nachname, request.body.plz, request.body.strasse, request.body.email, request.body.telefonnummer, request.body.beschwerde);
        console.log('Service Patient: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Patient: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/patient/:id', function(request, response) {
    console.log('Service Patient: Client requested deletion of record, id=' + request.params.id);

    const patientDao = new PatientDao(request.app.locals.dbConnection);
    try {
        var obj = patienteDao.loadById(request.params.id);
        patientDao.delete(request.params.id);
        console.log('Service Patient: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Patient: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});


/*
serviceRouter.get('/land/existiert/:id', function(request, response) {
    console.log('Service Land: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const landDao = new LandDao(request.app.locals.dbConnection);
    try {
        var exists = landDao.exists(request.params.id);
        console.log('Service Land: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Land: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/land', function(request, response) {
    console.log('Service Land: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Land: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const landDao = new LandDao(request.app.locals.dbConnection);
    try {
        var obj = landDao.create(request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Land: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Land: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/land', function(request, response) {
    console.log('Service Land: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Land: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const landDao = new LandDao(request.app.locals.dbConnection);
    try {
        var obj = landDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Land: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Land: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/land/:id', function(request, response) {
    console.log('Service Land: Client requested deletion of record, id=' + request.params.id);

    const landDao = new LandDao(request.app.locals.dbConnection);
    try {
        var obj = landDao.loadById(request.params.id);
        landDao.delete(request.params.id);
        console.log('Service Land: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Land: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});
*/

module.exports = serviceRouter;