function addZero(i){
    if(i<10){
        i = "0" + i;
    }return i;
}
export function showtime(endtimeStr) {
    var nowtime = new Date();
    var endtime = new Date(endtimeStr);
    var lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
    var d = parseInt(lefttime / (24 * 60 * 60));
    var h = parseInt(lefttime / (60 * 60) % 24);
    var m = parseInt(lefttime / 60 % 60);
    var s = parseInt(lefttime % 60);
    h = addZero(h);
    m = addZero(m);
    s = addZero(s);
    if(lefttime<=0){
        return("活动已结束");
    } 
    return( d + "天" + h + "小时" + m + "分钟" + s + '秒');
    
    // setTimeout(showtime,1000);
}