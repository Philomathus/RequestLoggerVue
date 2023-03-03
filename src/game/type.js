import request from "@/utils/request";
import {url} from "@/utils/url";
export function logList() {
    return request({
        url: url.requestLogger + '/requestLogger/getByPageWithFilter',
        method: 'get'
    })
}