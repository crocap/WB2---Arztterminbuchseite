const helper = require('../helper.js');
const SchwerpunktDao = require('./schwerpunktDao.js');
const PlzDao = require('./plzDao.js');

class LandDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM Arzt WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);
        
        const schwerpunktDao = new SchwerpunktDao(this._conn);
        result.schwerpunkt = schwerpunktDao.loadById(result.fk_schwerpunkt);
        delete result.fk_schwerpunkt;

        const plzDao = new PlzDao(this._conn);
        result.ort = plzDao.loadById(result.fk_plz);
        delete result.fk_plz;


        console.log(result);
        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Arzt';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    loadByStandortAndSchwerpunkt(standort,schwerpunkt) {
        var sql = 'SELECT * FROM Arzt WHERE fk_plz = (SELECT id FROM Plz WHERE ort = ?) AND fk_schwerpunkt = (SELECT id from Schwerpunkt WHERE beschreibung=?)';
        var statement = this._conn.prepare(sql);
        var result = statement.all(standort, schwerpunkt);

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    loadByStandort(standort) {
        var sql = 'SELECT * FROM Arzt WHERE fk_plz = (SELECT id FROM Plz WHERE ort = ?)';
        var statement = this._conn.prepare(sql);
        var result = statement.all(standort);

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    loadBySchwerpunkt(schwerpunkt) {
        var sql = 'SELECT * FROM Arzt WHERE fk_schwerpunkt = (SELECT id from Schwerpunkt WHERE beschreibung=?)';
        var statement = this._conn.prepare(sql);
        var result = statement.all(schwerpunkt);

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Land WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(kennzeichnung = '', bezeichnung = '') {
        var sql = 'INSERT INTO Land (kennzeichnung,bezeichnung) VALUES (?,?)';
        var statement = this._conn.prepare(sql);
        var params = [kennzeichnung, bezeichnung];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, kennzeichnung = '', bezeichnung = '') {
        var sql = 'UPDATE Land SET kennzeichnung=?,bezeichnung=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [kennzeichnung, bezeichnung, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Land WHERE id=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Could not delete Record by id=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    toString() {
        console.log('LandDao [_conn=' + this._conn + ']');
    }
}

module.exports = LandDao;