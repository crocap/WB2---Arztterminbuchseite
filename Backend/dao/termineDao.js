const helper = require('../helper.js');

class TermineDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM Termine WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Termine';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    loadBybestaetigungsid(bestaetigungsid) {
        var sql = 'SELECT * FROM Termine WHERE bestaetigungsid =?';
        var statement = this._conn.prepare(sql);
        var result = statement.all(bestaetigungsid);

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Termine WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(bestaetigungsid = '', fk_arzt = '', datum = '', uhrzeit = '') {
        var sql = 'INSERT INTO Termine (bestaetigungsid,fk_arzt,datum,uhrzeit) VALUES (?,?)';
        var statement = this._conn.prepare(sql);
        var params = [bestaetigungsid, fk_arzt, datum, uhrzeit];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, datum = '', uhrzeit = '') {
        var sql = 'UPDATE Termine SET datum=?,uhrzeit=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [datum, uhrzeit, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Termine WHERE id=?';
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
        console.log('TermineDao [_conn=' + this._conn + ']');
    }
}

module.exports = TermineDao;