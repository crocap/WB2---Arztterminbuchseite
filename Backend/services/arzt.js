const helper = require('../helper.js');
const ArztDao = require('../dao/arztDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Arzt');

serviceRouter.get('/arzt/gib/:id', function(request, response) {
    console.log('Service Arzt: Client requested one record, id=' + request.params.id);

    const arztDao = new ArztDao(request.app.locals.dbConnection);
    try {
        var obj = arztDao.loadById(request.params.id);
        console.log('Service Arzt: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Arzt: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/arzt/alle', function(request, response) {
    console.log('Service Arzt: Client requested all records');

    const arztDao = new ArztDao(request.app.locals.dbConnection);
    try {
        var arr = arztDao.loadAll();
        console.log('Service Arzt: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Arzt: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/arzt/gib/standortundschwerpunkt/:standort/:schwerpunkt', function(request, response) {
    console.log('Service Arzt: Client requested all records with standort=' + request.params.standort + ' and schwerpunkt=' + request.params.schwerpunkt);

    const arztDao = new ArztDao(request.app.locals.dbConnection);
    try {
        var obj = arztDao.loadByStandortAndSchwerpunkt(request.params.standort, request.params.schwerpunkt);
        console.log('Service Arzt: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Arzt: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/arzt/gib/standort/:standort', function(request, response) {
    console.log('Service Arzt: Client requested all records with standword=' + request.params.standort);

    const arztDao = new ArztDao(request.app.locals.dbConnection);
    try {
        var obj = arztDao.loadByStandort(request.params.standort);
        console.log('Service Arzt: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Arzt: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/arzt/gib/schwerpunkt/:schwerpunkt', function(request, response) {
    console.log('Service Arzt: Client requested all records with schwerpunkt=' + request.params.schwerpunkt);

    const arztDao = new ArztDao(request.app.locals.dbConnection);
    try {
        var obj = arztDao.loadBySchwerpunkt(request.params.schwerpunkt);
        console.log('Service Arzt: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Arzt: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

/*serviceRouter.get('/land/existiert/:id', function(request, response) {
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
});*/

module.exports = serviceRouter;