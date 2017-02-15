
var error = '';
var entity = '';
var router = '';

var method = {
    post: 'post',
    put: 'put',
    delete: 'delete',
    get: 'get'
}

function checkMethod(met) {
    if (met === method.post
        || met === method.get
        || met === method.put
        || met == method.delete) {
        return true;
    }
    return false;
}

function check() {
    var entity = document.getElementById('entity').value;
    var router = '/' + entity;
    var error = '';
    var context = document.getElementById('context').value;
    var contextObj = JSON.parse(context);
    if (!checkSwagger(contextObj)) {
        log();
    }
    if (!checkInfo(contextObj.info)) {
        log();
    }
    if (!checkPaths(contextObj.paths)) {
        log();
    }

    log();
}

function checkSwagger(obj) {
    if (!checkExistProperty(obj, 'swagger')) {
        error = 'Swagger not exist';
        return false;
    }
    if (!checkExistProperty(obj, 'info')) {
        error = 'Info not exist';
        return false;
    }
    if (!checkExistProperty(obj, 'host')) {
        error = 'Host not exist';
        return false;
    }
    if (!checkExistProperty(obj, 'paths')) {
        error = 'Paths not exist';
        return false;
    }
    if (!checkExistProperty(obj, 'definitions')) {
        error = 'definitions not exist';
        return false;
    }
    return true;
}

function checkInfo(obj) {
    if (!checkExistProperty(obj, 'version')) {
        error = 'version in info not exist';
        return false;
    }
    if (!checkExistProperty(obj, 'title')) {
        error = 'title in info not exist';
        return false;
    }
}

function checkPaths(obj) {
    debugger;
    var keys = Object.keys(obj);
    if (keys.length <= 0) {
        error = 'paths null';
        return false;
    }
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] === router) {
            var listMethod = Object.keys(obj[keys[i]]);
            if (listMethod.length === 0) {
                error = 'not exist method in ' + router + 'in paths';
                return false;
            }
            for (var j = 0; j < listMethod.length; j++) {
                if (!checkMethod(listMethod[j])) {
                    error = 'not exist method ' + listMethod[j] + 'in ' + router + 'in paths';
                    return false;
                }
            }
        }
    }
}

//check exist property in object
function checkExistProperty(obj, prop) {
    if (obj.hasOwnProperty(prop)) {
        return true;
    }
    return false;
}

function log() {
    if (error === '') {
        document.getElementById('error').value = 'SUCCESSFUL';
    } else {
        document.getElementById('error').value = error;
    }
}