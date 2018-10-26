
function main(){
    let canvas = document.getElementById('Canvas');
    if(!!!canvas){console.log('error'); return false;}
    let ctx = canvas.getContext('2d'); // 获取 图形上下文
    ctx.fillStyle = 'rgba(0,0,255,1)' ; // 填充色
    ctx.fillRect(0,0,400,400); //  绘制矩形
}