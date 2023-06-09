const helper = require('../helper.js');
const PlzDao = require('../dao/plzDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Plz');

serviceRouter.get('/plz/gib/:id', function(request, response) {
    console.log('Service Plz: Client requested one record, id=' + request.params.id);

    const plzDao = new PlzDao(request.app.locals.dbConnection);
    try {
        var obj = plzDao.loadById(request.params.id);
        console.log('Service Plz: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Plz: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/plz/alle', function(request, response) {
    console.log('Service Plz: Client requested all records');

    const plzDao = new PlzDao(request.app.locals.dbConnection);
    try {
        var arr = plzDao.loadAll();
        console.log('Service Plz: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Plz: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/plz/ort', function(request, response) {
    console.log('Service Plz: Client requested all Ort records');

    const plzDao = new PlzDao(request.app.locals.dbConnection);
    try {
        var arr = plzDao.loadAllOrt();
        console.log('Service Plz: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Plz: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/plz', function(request, response) {
    console.log('Service Plz: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.plz)) 
        errorMsgs.push('plz fehlt');
    if (helper.isUndefined(request.body.ort)) 
        errorMsgs.push('ort fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Plz: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const plzDao = new PlzDao(request.app.locals.dbConnection);
    try {
        var obj = plzDao.create(request.body.plz, request.body.ort);
        console.log('Service Plz: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Plz: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/plz', function(request, response) {
    console.log('Service Plz: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.plz)) 
        errorMsgs.push('plz fehlt');
    if (helper.isUndefined(request.body.ort)) 
        errorMsgs.push('ort fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Plz: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const plzDao = new PlzDao(request.app.locals.dbConnection);
    try {
        var obj = plzDao.update(request.body.id, request.body.plz, request.body.ort);
        console.log('Service Plz: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Plz: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/plz/:id', function(request, response) {
    console.log('Service Plz: Client requested deletion of record, id=' + request.params.id);

    const plzDao = new PlzDao(request.app.locals.dbConnection);
    try {
        var obj = plzeDao.loadById(request.params.id);
        plzDao.delete(request.params.id);
        console.log('Service Plz: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Plz: Error deleting record. Exception occured: ' + ex.message);
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