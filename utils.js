const path = require('path');
const fs = require('fs');
class Utils {
    constructor() {
        console.info(__dirname);
    }
    pathIsExit(pathName, all) { //判断文件路径是否存在，all表示绝对路径
        if (all) {
            return fs.existsSync(path.join(pathName));
        }
        return fs.existsSync(path.join(__dirname, pathName));
    }
    appendFile(filePath, data) {
        fs.appendFileSync(filePath, data);
    }
    readFile(filename) {
        console.log('正在读取' + filename);
        try {
            return fs.readFileSync(filename, 'utf-8');
        } catch (err) {
            console.log(err);
        }
    }
    rgbToHex(r, g, b) {
        return ((r << 16) | (g << 8) | b).toString(16);
    }
    writeFile(filePath, data, cb) {
        fs.writeFile(filePath, data, function(err) {
            if (cb) {
                cb(err);
            } else {
                console.log(err ? err : filePath + ' is ok');
            }

        });
    }
    dateFormat(timestamp, format) {
        var date = new Date(parseInt(timestamp, 10)),
            o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds()
            };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
    clone(obj) { //返回一个克隆的对象  
        var newObj = {};
        for (var prop in obj) {
            newObj[prop] = obj[prop];
        }
        return newObj;
    }
}
module.exports = new Utils();
