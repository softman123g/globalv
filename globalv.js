/**
 * global v as is global variable. It provides a way to get or set global variable.
 *
 * how to use:
 *      1.
 */
var globalv = {
    _variable:{
        default: {
            _DEBUG: false
        }
    },
    _group: "default",
    /**
     *  若当前组中存在key,则直接返回其值,否则
     *      若指定了defaultValue,则设定该key=defaultValue,同时返回该defaultValue,
     *      若没指定defaultValue,返回null
     * @param key
     * @param defaultValue
     * @returns {*}
     */
    get: function (key, defaultValue) {
        if(this._variable[this._group][key] != null)
            return this._variable[this._group][key];
        if(defaultValue != null){
            this._variable[this._group][key] = defaultValue;
            return defaultValue;
        }
        return null;
    },
    /**
     * 设定当前组中的key=value
     * @param key
     * @param value
     */
    set: function (key, value) {
        this._variable[this._group][key] = value;
    },
    /**
     * 切换并使用某个组作为当前空间中操作的组
     * @param groupName
     * @returns {globalv}
     */
    use: function (groupName) {
        if(groupName == null) {
            this._group = "default";
        }
        if(this._variable[groupName]==null){
            this._variable[groupName] = {};
        }
        this._group = groupName;
        return this;
    },
    /**
     * 判断某个key值是否存在
     * @param key
     * @param all   false,只判断当前的组是否存在该key;
     *              true,查找所有的组,若查找到对应的key,则返回包含key的所有组名
     *                              若没查到,则返回false
     * @returns {*}
     */
    keyExist: function (key, all) {
        if(all == true){
            var groups = [];
            for(var _group in this._variable){
                for(var _key in this._variable[_group]){
                    if(this._variable[_group][_key] === key){
                        groups.push(_group);
                    }
                }
            }
            if(groups.length <= 0){
                return false;
            } else {
                return groups;
            }
        } else {
            if(this._variable[this._group][key]){
                return true;
            }
        }
        return false;
    }
};
if(typeof module != "undefined"){
    module.exports = globalv;
}
if(typeof define != "undefined"){
    define("globalv", [], function () {
        return globalv;
    });
}
