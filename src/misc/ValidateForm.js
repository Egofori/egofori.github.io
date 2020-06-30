class ValidateForm {

    validate(config, data) {
        const configEntries = Object.entries(config)
        // const dataEntries = Object.entries(data)
        let [keys, values] = configEntries
        var returnObject = {...(JSON.parse(JSON.stringify(data))),valid:true,msg:""}
        let res
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                returnObject[key] = { valid: false, errorMsg: '' };

            }
        }

        for (const configEntry of configEntries) {
            if (configEntry[1].hasOwnProperty("required")) {
                if (configEntry[1].required) {
                    if (configEntry[1].hasOwnProperty("validators")) {
                        configEntry[1].validators.forEach((value) => {
                            res = value.call(null, data[configEntry[0]])
                            if (res.hasOwnProperty("type")) {
                                switch (res.type) {
                                    case "email":
                                        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data[configEntry[0]]))
                                        {
                                            returnObject[configEntry[0]].valid = true
                                        }
                                        else{
                                            returnObject[configEntry[0]].valid = false
                                            returnObject[configEntry[0]].errorMsg = res.errorMsg
                                        }
                                        break;
                                    case "number":
                                        returnObject[configEntry[0]].valid = isNaN(parseInt(data[configEntry[0]])) ? false : true
                                        returnObject[configEntry[0]].errorMsg = returnObject[configEntry[0]].valid ? "" : res.errorMsg
                                        break;
                                    default:
                                        returnObject[configEntry[0]].valid = data[configEntry[0]] ? true : false
                                        returnObject[configEntry[0]].errorMsg = returnObject[configEntry[0]].valid ? "" : res.errorMsg
                                        break;
                                }

                            } else {
                                returnObject[configEntry[0]].valid = res.exp
                                returnObject[configEntry[0]].errorMsg = res.exp ? "" : res.errorMsg
                            }

                        })
                    }
                    else {
                        if (!data[configEntry[0]]) {
                            returnObject[configEntry[0]].valid = false
                            returnObject[configEntry[0]].errorMsg = ""
                        }

                    }

                }
                else {
                    returnObject[configEntry[0]].valid = true
                    returnObject[configEntry[0]].errorMsg = ""
                }
            }
            else {
                returnObject[configEntry[0]].valid = true
                returnObject[configEntry[0]].errorMsg = ""
            }

            returnObject.valid = returnObject.valid && returnObject[configEntry[0]].valid
            returnObject.msg = returnObject[configEntry[0]].errorMsg + returnObject.msg

        }
        return returnObject
    }

}

export default new ValidateForm()