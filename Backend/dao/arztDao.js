const helper = require('../helper.js');
const SchwerpunktDao = require('./schwerpunktDao.js');
const PlzDao = require('./plzDao.js');
const GeschlechtDao = require('./geschlechtDao.js');

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

        const geschlechtDao = new GeschlechtDao(this._conn);
        result.geschlecht = geschlechtDao.loadById(result.fk_geschlecht);
        delete result.fk_geschlecht;

        return result;
    }

    loadAll() {
        var schwerpunkt=new SchwerpunktDao(this._conn);
        var plz=new PlzDao(this._conn);
        var geschlecht=new GeschlechtDao(this._conn);
        var alleSchwerpunkte=schwerpunkt.loadAll();
        var allePlz=plz.loadAll();
        var alleGeschlecht=geschlecht.loadAll();
        var sql = 'SELECT * FROM Arzt';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        for (var i=0; i<result.length; i++){
            // Schwerpunkt laden
            for (var x=0; x<alleSchwerpunkte.length; x++){ 
                
                if (alleSchwerpunkte[x].id == result[i].fk_schwerpunkt){
                    
                    result[i].schwerpunkt = alleSchwerpunkte[x];
                    delete result[i].fk_schwerpunkt;
                    break;
                }
            }
            // PLZ laden
            for (var x=0; x<allePlz.length; x++){ 
                
                if (allePlz[x].id == result[i].fk_plz){
                    
                    result[i].plz = allePlz[x];
                    delete result[i].fk_plz;
                    break;
                }
            }
            // Geschlecht laden
            for (var x=0; x<alleGeschlecht.length; x++){ 
                
                if (alleGeschlecht[x].id == result[i].fk_geschlecht){
                    
                    result[i].geschlecht = alleGeschlecht[x];
                    delete result[i].fk_geschlecht;
                    break;
                }
            }
        }

        return result;
    }

    loadByStandortAndSchwerpunkt(standort,schwerpunkt) {
        var sql = 'SELECT * FROM Arzt WHERE fk_plz = (SELECT id FROM Plz WHERE ort = ?) AND fk_schwerpunkt = (SELECT id from Schwerpunkt WHERE beschreibung=?)';
        var statement = this._conn.prepare(sql);
        var result = statement.all(standort,schwerpunkt);
        
        if (helper.isArrayEmpty(result)) 
            return [];
        
        var schwerpunkt=new SchwerpunktDao(this._conn);
        var plz=new PlzDao(this._conn);
        var geschlecht=new GeschlechtDao(this._conn);
        var alleSchwerpunkte=schwerpunkt.loadAll();
        var allePlz=plz.loadAll();
        var alleGeschlecht=geschlecht.loadAll();
        for (var i=0; i<result.length; i++){
        
            //const schwerpunktDao = new SchwerpunktDao(this._conn);
            //result.schwerpunkt = schwerpunktDao.loadById(result.fk_schwerpunkt);
            //delete result.fk_schwerpunkt;
            console.log(alleSchwerpunkte);
            // Schwerpunkt laden
            for (var x=0; x<alleSchwerpunkte.length; x++){ 
                
                if (alleSchwerpunkte[x].id == result[i].fk_schwerpunkt){
                    
                    result[i].schwerpunkt = alleSchwerpunkte[x];
                    delete result[i].fk_schwerpunkt;
                    break;
                }
            }
            // PLZ laden
            for (var x=0; x<allePlz.length; x++){ 
                
                if (allePlz[x].id == result[i].fk_plz){
                    
                    result[i].plz = allePlz[x];
                    delete result[i].fk_plz;
                    break;
                }
            }
            // Geschlecht laden
            for (var x=0; x<alleGeschlecht.length; x++){ 
                
                if (alleGeschlecht[x].id == result[i].fk_geschlecht){
                    
                    result[i].geschlecht = alleGeschlecht[x];
                    delete result[i].fk_geschlecht;
                    break;
                }
            }
        }

        return result;
    }

    loadByStandort(standort) {
        var sql = 'SELECT * FROM Arzt WHERE fk_plz = (SELECT id FROM Plz WHERE ort = ?)';
        var statement = this._conn.prepare(sql);
        var result = statement.all(standort);

        if (helper.isArrayEmpty(result)) 
            return [];
        
            var schwerpunkt=new SchwerpunktDao(this._conn);
            var plz=new PlzDao(this._conn);
            var geschlecht=new GeschlechtDao(this._conn);
            var alleSchwerpunkte=schwerpunkt.loadAll();
            var allePlz=plz.loadAll();
            var alleGeschlecht=geschlecht.loadAll();
            for (var i=0; i<result.length; i++){
            
                //const schwerpunktDao = new SchwerpunktDao(this._conn);
                //result.schwerpunkt = schwerpunktDao.loadById(result.fk_schwerpunkt);
                //delete result.fk_schwerpunkt;
                console.log(alleSchwerpunkte);
                // Schwerpunkt laden
                for (var x=0; x<alleSchwerpunkte.length; x++){ 
                    
                    if (alleSchwerpunkte[x].id == result[i].fk_schwerpunkt){
                        
                        result[i].schwerpunkt = alleSchwerpunkte[x];
                        delete result[i].fk_schwerpunkt;
                        break;
                    }
                }
                // PLZ laden
                for (var x=0; x<allePlz.length; x++){ 
                    
                    if (allePlz[x].id == result[i].fk_plz){
                        
                        result[i].plz = allePlz[x];
                        delete result[i].fk_plz;
                        break;
                    }
                }
                // Geschlecht laden
                for (var x=0; x<alleGeschlecht.length; x++){ 
                    
                    if (alleGeschlecht[x].id == result[i].fk_geschlecht){
                        
                        result[i].geschlecht = alleGeschlecht[x];
                        delete result[i].fk_geschlecht;
                        break;
                    }
                }
            }

        return result;
    }

    loadBySchwerpunkt(schwerpunkt) {
        var sql = 'SELECT * FROM Arzt WHERE fk_schwerpunkt = (SELECT id from Schwerpunkt WHERE beschreibung=?)';
        var statement = this._conn.prepare(sql);
        var result = statement.all(schwerpunkt);

        if (helper.isArrayEmpty(result)) 
            return [];
        
            var schwerpunkt=new SchwerpunktDao(this._conn);
            var plz=new PlzDao(this._conn);
            var geschlecht=new GeschlechtDao(this._conn);
            var alleSchwerpunkte=schwerpunkt.loadAll();
            var allePlz=plz.loadAll();
            var alleGeschlecht=geschlecht.loadAll();
            for (var i=0; i<result.length; i++){
            
                //const schwerpunktDao = new SchwerpunktDao(this._conn);
                //result.schwerpunkt = schwerpunktDao.loadById(result.fk_schwerpunkt);
                //delete result.fk_schwerpunkt;
                console.log(alleSchwerpunkte);
                // Schwerpunkt laden
                for (var x=0; x<alleSchwerpunkte.length; x++){ 
                    
                    if (alleSchwerpunkte[x].id == result[i].fk_schwerpunkt){
                        
                        result[i].schwerpunkt = alleSchwerpunkte[x];
                        delete result[i].fk_schwerpunkt;
                        break;
                    }
                }
                // PLZ laden
                for (var x=0; x<allePlz.length; x++){ 
                    
                    if (allePlz[x].id == result[i].fk_plz){
                        
                        result[i].plz = allePlz[x];
                        delete result[i].fk_plz;
                        break;
                    }
                }
                // Geschlecht laden
                for (var x=0; x<alleGeschlecht.length; x++){ 
                    
                    if (alleGeschlecht[x].id == result[i].fk_geschlecht){
                        
                        result[i].geschlecht = alleGeschlecht[x];
                        delete result[i].fk_geschlecht;
                        break;
                    }
                }
            }

        return result;
    }

/*
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
*/
    toString() {
        console.log('LandDao [_conn=' + this._conn + ']');
    }
}

module.exports = LandDao;